require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

names = require('./names');

let anterior = -1;

// Matches "/echo [whatever]"
bot.onText(/.*\b([pP][rR][eE][sS][iI][oOóÓ][nN]).*/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    let idx;
    do {
        idx = Math.floor(Math.random() * (names.length - 1));
    } while (idx == anterior);

    // send back the matched "whatever" to the chat
    //bot.sendMessage(chatId, resp);
    const path = './img/' + names[idx];
    const options = {
        reply_to_message_id: msg.message_id
    }
    bot.sendPhoto(chatId, path, options);
    if (names[idx] == 'corviknight.jfif') {
        bot.sendPhoto(chatId, './img/corviknight2.jfif');
    }
});