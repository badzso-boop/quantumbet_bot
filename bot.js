const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')

const token = '5893733364:AAHBW-v7V-rEuFgOvJz_IooNOigGDFMEyIE'
const bot = new TelegramBot(token, {polling:true})

//valtozok
let uzenet = "";
let maiTippek = []

//segitseg a parancsokban
bot.onText(/\/help/, (msg) => {
    console.log(msg.chat)
    bot.sendMessage(msg.chat.id, 'A parancsok listája:\n/help\n/tippek\n/stat\nHasználat:\n/stat -éééé.hh.nn -5% -2,6 -tipp szöveg -tipp fogadasa -felhasználónév -Nyer/Vesztett -f/e')
});


bot.onText(/\/napi/, (msg) => {
    fs.readFile('message.txt', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return
        }

        let hossz = data.split('\n')
        for (let i = 0; i < hossz.length-1; i++) {
            let seged = hossz[i].split(';')
            if (seged[0] == maiDatum()) {
                maiTippek.push({datum: seged[1], tet: seged[1], odds: seged[2], tipp: seged[3], tipp_vege: seged[4], tippelo: seged[5], eredmeny: seged[6], tipusa: seged[7].substring(0,1)})
                uzenet += `Dátum: ${seged[0]}\nTét: ${seged[1]}\nOdds: ${seged[2]}\nTipp: ${seged[3]}\nTipp eredménye: ${seged[4]}\nTippelő: ${seged[5]}\nEredmény: ${seged[6]}\nTípus: ${seged[7]}\n--------------------------------\n`
            }
        }

        let nyertErtek = 0
        let vesztettErtek = 0
        
        for (let i = 0; i < maiTippek.length; i++) {
            if (maiTippek[i].eredmeny.toLowerCase() == "nyert") {
                let osszeg = parseInt(maiTippek[i].tet.substring(0,1)) * 1000
                nyertErtek += (osszeg * parseFloat(maiTippek[i].odds)) - osszeg
            }
            else if (maiTippek[i].eredmeny.toLowerCase() == "vesztett") {
                let osszeg = parseInt(maiTippek[i].tet.substring(0,1)) * 1000
                vesztettErtek += osszeg
            }
        }

        uzenet += "Napi eredmény tétben: " + ((nyertErtek - vesztettErtek) / 1000)

        bot.sendMessage(msg.chat.id, uzenet)
        uzenet = ""
        console.log(maiTippek)
    });
})

// /stat -2022.12.08 -5% -2,6 -anglia vs usa -anglia nyer -norbi -nyert -f
bot.onText(/\/stat/, (msg) => {
    let tomb = msg.text.split('-')

    let tet = tomb[1].trim()
    let odds = tomb[2].trim()
    let tipp = tomb[3].trim()
    let tipp_vege = tomb[4].trim()
    let tippelo = tomb[5].trim()
    let eredmeny = tomb[6].trim()
    let tipus = tomb[7].trim()

    Insert(maiDatum(), tet, odds, tipp, tipp_vege, tippelo, eredmeny, tipus)

    //console.log(`Dátum: ${datum}\nTét:${tet}\nOdds:${odds}\nTipp:${tipp}\nTipp eredménye:${tipp_vege}\nTippelő:${tippelo}\nEredmény:${eredmeny}\nTípus:${tipus}`)
});

//tippek kilistazasa
bot.onText(/\/tippek/, (msg) => {
    uzenet = ""
    fs.readFile('message.txt', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return
        }

        let hossz = data.split('\n')
        for (let i = 0; i < hossz.length-1; i++) {
            let seged = hossz[i].split(';')
            uzenet += `Dátum: ${seged[0]}\nTét:${seged[1]}\nOdds:${seged[2]}\nTipp:${seged[3]}\nTipp eredménye:${seged[4]}\nTippelő:${seged[5]}\nEredmény:${seged[6]}\nTípus:${seged[7]}\n--------------------------------\n`
        }
        bot.sendMessage(msg.chat.id, uzenet)
        uzenet = ""
    });
    
})

function Insert(datum, tet, odds, tipp, tipp_vege, tippelo, eredmeny, tipus) {
    fs.appendFile('message.txt', `${datum};${tet};${odds};${tipp};${tipp_vege};${tippelo};${eredmeny};${tipus}\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function maiDatum() {
    let date = new Date();
    let ev = date.getFullYear()
    let honap = date.getMonth()
    let nap = date.getDate()

    return (ev + "." + honap + "." + nap)
}


