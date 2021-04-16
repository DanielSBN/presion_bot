require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const names = require('./names');

let anterior = -1;
let idx;

// Si alguien dice una palabra que empiece con "presión", el bot envía una imagen como respuesta
bot.onText(/.*\b([pP][rR][eE][sS][iI][oOóÓ][nN]).*/, (msg, match) => {
    const chatId = msg.chat.id;

    do {
        idx = Math.floor(Math.random() * (names.length - 1));
    } while (idx == anterior);

    const path = './img/' + names[idx];
    const options = {
        reply_to_message_id: msg.message_id
    }
    const fileOptions = {
        contentType: 'image/' + path.split('.')[1]
    }
    bot.sendPhoto(chatId, path, options, fileOptions);

    if (names[idx] == 'corviknight.jfif') {
        bot.sendPhoto(chatId, './img/corviknight2.jfif');
    }

    anterior = idx;
});