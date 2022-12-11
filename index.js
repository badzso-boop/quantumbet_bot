const TelegramBot = require('node-telegram-bot-api')

const token = '5893733364:AAHBW-v7V-rEuFgOvJz_IooNOigGDFMEyIE'

const bot = new TelegramBot(token, {polling:true})

bot.on('message', (msg) => {
    console.log(msg)

    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id,"Hello dear user");
    }

    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }

    var robot = "I'm robot";
    if (msg.text.indexOf(robot) === 0) {
        bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
    }

    var Hi = "csao";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.from.id, "Hello  " + msg.from.last_name);
    }

    /*
    var what = "fasz";
    if (msg.text.includes(what)) {
        bot.kickChatMember(msg.chat.id,  msg.from.id);
    }
    */
    var what = "fasz";
    if (msg.text.includes(what)) {
        bot.sendMessage(msg.chat.id,  "Ejnye Bejnye");
    }

    var matrica = "matrica"
    if (msg.text.includes(matrica)) {
        bot.sendSticker(msg.chat.id, "img/animations.webp", {is_anumated: true})
    }

    var Hi = "html";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
    }

    var location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id,44.97108, -104.27719);
        bot.sendMessage(msg.chat.id, "Here is the point");

    }
});


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome"); 
});

bot.onText(/\/sendpic/, (msg) => {
    bot.sendPhoto(msg.chat.id,"img/image.jpg",{caption: "Szia Kedves\nSzeretem ezeket az aesthetic képeket"} );
});

bot.onText(/\/reply/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
        "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
        }
    }); 
});