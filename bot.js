// Configuración de librerías
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Creación de bot y parámetros
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const names = require('./names');
let anterior = -1;
let idx;

// Si alguien dice una palabra que empiece con "presion", el bot envía una imagen como respuesta
bot.onText(/.*\b([pP][rR][eE][sS][iI][oOóÓ][nN]).*/, async (msg, match) => {
    const chatId = msg.chat.id;

    do {
        idx = Math.floor(Math.random() * (names.length - 1));
    } while (idx == anterior);

    let path = './img/' + names[idx];

    let rep = await bot.sendPhoto(
        chatId,
        path,
        {
            reply_to_message_id: msg.message_id
        },
        {
            contentType: 'image/' + path.split('.')[2]
        }
    );

    if (names[idx] == 'corviknight.jfif') {
        bot.sendPhoto(
            chatId,
            './img/corviknight2.jfif',
            {
                reply_to_message_id: rep.message_id
            },
            {
                contentType: 'image/jfif'
            }
        );
    }

    anterior = idx;
});

// Si alguien usa puntos suspensivos, el bot les hace saber que están prohibidos
bot.onText(/.*\.\.\..*/, async (msg, match) => {
    bot.sendMessage(
        msg.chat.id,
        'LOS PUNTOS SUSPENSIVOS ESTÁN PROHIBIDOS',
        {
            reply_to_message_id: msg.message_id
        }
    )
})