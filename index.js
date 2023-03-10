const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const token = process.env.TOKEN

// Токен вашего бота

// Создание экземпляра бота
const bot = new TelegramBot(token, { polling: true });


const getCurrentWeek = () => {
    const today = new Date();
    const academicYearStart = new Date(today.getFullYear(), 8, 1); // 1 сентября текущего года
    let semesterStart;
    if (today.getMonth() >= 8 && today.getMonth() < 2) { // если текущий месяц сентябрь, октябрь, ..., январь
        semesterStart = academicYearStart; // то начало текущего семестра - начало учебного года
    } else { // иначе
        semesterStart = new Date(today.getFullYear(), 1, 13); // начало весеннего семестра - 1 февраля текущего года
        if (today.getMonth() < 1) { // если текущий месяц январь
            semesterStart.setFullYear(today.getFullYear() - 1); // то начало весеннего семестра - 1 февраля прошлого года
        }
    }
    const diff = today - semesterStart;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const currentWeek = Math.floor(diff / oneWeek) + 1;
    return currentWeek;
};

// функция, которая определяет, идет ли пара в данный момент
function isCurrentPair(pair) {
    const now = new Date();
    const startTime = getTimeFromString(pair.time.split("-")[0]);
    const endTime = getTimeFromString(pair.time.split("-")[1]);
    return now >= startTime && now <= endTime;
}

// функция, которая преобразует строку времени в объект Date
function getTimeFromString(timeStr) {
    const now = new Date();
    const [hours, minutes] = timeStr.split(":");
    const time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return time;
}

function isCurrentBreak(breaks) {
    const now = new Date();
    for (let i = 0; i < breaks.length; i++) {
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), breaks[i].start[0], breaks[i].start[1]);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), breaks[i].end[0], breaks[i].end[1]);
        if (now >= start && now < end) {
            return true;
        }
    }
    return false;
}

const schedule = {
    even: {
        0: [

        ],
        1: [
            {
                time: '9:30 - 10:30',
                subject: 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management) 7с',
                type: 'ЛК',
                teacher: 'доц. Сафонова С.О.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/85428314493?pwd=eUVQWXVjRGhCa3ZpR3hqRTVOdDEyUT09',
            },
            {
                time: '10:40 - 11:40',
                subject: 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management) 7с',
                type: 'ПЗ',
                teacher: 'доц. Сафонова С.О.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/85428314493?pwd=eUVQWXVjRGhCa3ZpR3hqRTVOdDEyUT09',
            },
            {
                time: '12:00 - 12:30',
                subject: 'Кураторська година',
                type: 'КГ',
                teacher: 'Шумова Л.О.',
                group: 'Всі підгрупи',
                link: 'Телеграм',
            },
        ],
        2: [
            {
                time: '10:40 - 11:40',
                subject: 'Фізичне виховання',
                type: 'ПЗ',
                teacher: 'ст. викл. Кривобогова Н.П.',
                group: 'Всі підгрупи',
                link: 'https://teams.microsoft.com/l/team/19%3afq7AW-bgb9a4QfCQkzKLZN3JtOCVMh6c8fHcU3H6bJk1%40thread.tacv2/conversations?groupId=e32e8d3d-b097-47aa-bd55-2bb7342f3ab5&tenantId=463af24c-2ae7-46df-a9c9-d275e378f252',
            },
        ],
        3: [
            {
                time: '09:30 - 10:30',
                subject: 'Організація баз даних',
                type: 'ЛК',
                teacher: 'доц. Сафонова С.О.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/85428314493?pwd=eUVQWXVjRGhCa3ZpR3hqRTVOdDEyUT09',
            },
            {
                time: '10:40 - 11:40',
                subject: 'Організація баз даних',
                type: 'ПЗ',
                teacher: 'доц. Сафонова С.О.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/85428314493?pwd=eUVQWXVjRGhCa3ZpR3hqRTVOdDEyUT09',
            },
            {
                time: '12:00 - 13:00',
                subject: 'Цифрова схемотехніка',
                type: 'ЛК',
                teacher: 'доц. Кардашук В.С.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/81411202895?pwd=NUVBZkk3NXo3RUp5QzN5c3k0T3paUT09',
            },
            {
                time: '13:10 - 14:10',
                subject: 'Організація баз даних',
                type: 'ЛБ',
                teacher: 'ст. викл. Лифар О.К.',
                group: 'II підгрупа',
                link: 'https://us04web.zoom.us/j/8437426584?pwd=VmExT0JwM1loaU9iN0Q5eHhiNzdnUT09',
            },
            {
                time: '14:20 - 15:20',
                subject: 'Організація баз даних',
                type: 'ЛБ',
                teacher: 'ст. викл. Лифар О.К.',
                group: 'II підгрупа',
                link: 'https://us04web.zoom.us/j/8437426584?pwd=VmExT0JwM1loaU9iN0Q5eHhiNzdnUT09',
            },
        ],
        4: [
            {
                time: '09:30 - 10:30',
                subject: 'Системне програмне забезпечення',
                type: 'ЛК',
                teacher: 'доц. Деркач М. В.',
                group: 'Всі підгрупи',
                link: 'https://us02web.zoom.us/j/3883348295?pwd=RDNHeVpiWEdmaDJCRTBuR3A4bkNvUT09',
            },
            {
                time: '10:40 - 11:40',
                subject: 'Системне програмне забезпечення',
                type: 'ПЗ',
                teacher: 'доц. Деркач М. В.',
                group: 'Всі підгрупи',
                link: 'https://us02web.zoom.us/j/3883348295?pwd=RDNHeVpiWEdmaDJCRTBuR3A4bkNvUT09',
            },
            {
                time: '12:00 - 13:00',
                subject: 'Цифрова схемотехніка',
                type: 'ЛБ',
                teacher: 'доц. Кардашук В.С.',
                group: 'I підгрупа',
                link: 'https://us05web.zoom.us/j/81411202895?pwd=NUVBZkk3NXo3RUp5QzN5c3k0T3paUT09',
            },
            {
                time: '13:10 - 14:10',
                subject: 'Цифрова схемотехніка',
                type: 'ЛБ',
                teacher: 'доц. Кардашук В.С.',
                group: 'I підгрупа',
                link: 'https://us04web.zoom.us/j/8437426584?pwd=VmExT0JwM1loaU9iN0Q5eHhiNzdnUT09',
            },
        ],
    },
    odd: {
        0: [

        ],
        1: [
            {
                time: '9:30 - 10:30',
                subject: 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management) 7с',
                type: 'ЛК',
                teacher: 'доц. Сафонова С.О.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/85428314493?pwd=eUVQWXVjRGhCa3ZpR3hqRTVOdDEyUT09',
            },
            {
                time: '10:40 - 11:40',
                subject: 'Організація баз даних',
                type: 'ЛБ',
                teacher: 'ст. викл. Лифар О.К.',
                group: 'І підгрупа',
                link: 'https://us04web.zoom.us/j/8437426584?pwd=VmExT0JwM1loaU9iN0Q5eHhiNzdnUT09',
            },
            {
                time: '12:00 - 12:30',
                subject: 'Кураторська година',
                type: 'КГ',
                teacher: 'Шумова Л.О.',
                group: 'Всі підгрупи',
                link: 'Телеграм',
            },
            {
                time: '12:40 - 13:40',
                subject: 'Організація баз даних',
                type: 'ЛБ',
                teacher: 'ст. викл. Лифар О.К.',
                group: 'І підгрупа',
                link: 'https://us04web.zoom.us/j/8437426584?pwd=VmExT0JwM1loaU9iN0Q5eHhiNzdnUT09',
            },
        ],
        2: [
            {
                time: '10:40 - 11:40',
                subject: 'Фізичне виховання',
                type: 'ПЗ',
                teacher: 'ст. викл. Кривобогова Н.П.',
                group: 'Всі підгрупи',
                link: 'https://teams.microsoft.com/l/team/19%3afq7AW-bgb9a4QfCQkzKLZN3JtOCVMh6c8fHcU3H6bJk1%40thread.tacv2/conversations?groupId=e32e8d3d-b097-47aa-bd55-2bb7342f3ab5&tenantId=463af24c-2ae7-46df-a9c9-d275e378f252',
            },
            {
                time: '13:10 - 14:10',
                subject: 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management)',
                type: 'ЛБ',
                teacher: 'доц. Критська Я.О.',
                group: 'І підгрупа',
                link: 'https://us02web.zoom.us/j/2391296928?pwd=azdCUkV1dzd5TXdmMWlWSGNkQUdCUT09',
            },
            {
                time: '14:20 - 15:20',
                subject: 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management)',
                type: 'ЛБ',
                teacher: 'доц. Критська Я.О.',
                group: 'І підгрупа',
                link: 'https://us02web.zoom.us/j/2391296928?pwd=azdCUkV1dzd5TXdmMWlWSGNkQUdCUT09',
            },
        ],
        3: [
            {
                time: '09:30 - 10:30',
                subject: 'Організація баз даних',
                type: 'ЛК',
                teacher: 'доц. Сафонова С.О.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/85428314493?pwd=eUVQWXVjRGhCa3ZpR3hqRTVOdDEyUT09',
            },
            {
                time: '10:40 - 11:40',
                subject: 'Цифрова схемотехніка',
                type: 'ЛК',
                teacher: 'доц. Кардашук В.С.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/81411202895?pwd=NUVBZkk3NXo3RUp5QzN5c3k0T3paUT09',
            }
        ],
        4: [
            {
                time: '09:30 - 10:30',
                subject: 'Системне програмне забезпечення',
                type: 'ЛБ',
                teacher: 'доц. Деркач М. В.',
                group: '',
                link: 'https://us02web.zoom.us/j/3883348295?pwd=RDNHeVpiWEdmaDJCRTBuR3A4bkNvUT09',
            },
            {
                time: '10:40 - 11:40',
                subject: 'Системне програмне забезпечення',
                type: 'ЛБ',
                teacher: 'доц. Деркач М. В.',
                group: '',
                link: 'https://us02web.zoom.us/j/3883348295?pwd=RDNHeVpiWEdmaDJCRTBuR3A4bkNvUT09',
            },
            {
                time: '12:00 - 13:00',
                subject: 'Цифрова схемотехніка',
                type: 'ПЗ',
                teacher: 'доц. Кардашук В.С.',
                group: 'Всі підгрупи',
                link: 'https://us05web.zoom.us/j/81411202895?pwd=NUVBZkk3NXo3RUp5QzN5c3k0T3paUT09',
            }
        ],
    }
};

function sendSchedule(chatId, dayOfWeek) {
    const weekdays = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця'];
    if (!weekdays.includes(dayOfWeek)) {
        bot.sendMessage(chatId, 'Некоректно введений день тижня!');
        return;
    }
    const currentWeek = getCurrentWeek();
    const isEvenWeek = currentWeek % 2 === 0;
    const currentSchedule = isEvenWeek ? schedule.even : schedule.odd;
    let response = `Розклад на ${dayOfWeek}:\n\n`;
    response += `${currentWeek} тиждень\n\n`;
    const dayIndex = weekdays.indexOf(dayOfWeek);
    if (currentSchedule[dayIndex]) {
        for (let i = 0; i < currentSchedule[dayIndex].length; i++) {
            response += `${currentSchedule[dayIndex][i].time} - [${currentSchedule[dayIndex][i].subject}](${currentSchedule[dayIndex][i].link}) (${currentSchedule[dayIndex][i].type})\n`;
            response += `Викладач: ${currentSchedule[dayIndex][i].teacher}\n`;
            if ((currentSchedule[dayIndex][i].subject === 'Системне програмне забезпечення' || currentSchedule[dayIndex][i].subject === 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management)')) {
                if (currentWeek === 5 || currentWeek === 9 || currentWeek === 13 || currentWeek === 17) {
                    response += `Група: I підгрупа\n\n`;
                } else if (currentWeek === 7 || currentWeek === 11 || currentWeek === 15 || currentWeek === 19) {
                    response += `Група: II підгрупа\n\n`;
                } else {
                    response += `Група: Всі підгрупи\n\n`;
                }
            } else {
                response += `Група: ${currentSchedule[dayIndex][i].group}\n\n`;
            }
        }
    } else {
        response += `На ${dayOfWeek} немає розкладу.\n`;
    }
    bot.sendMessage(chatId, response, {
        parse_mode: 'Markdown'
    });
}

function sendToday(chatId) {
    const today = new Date();
    let response = `Розклад на ${today.toLocaleDateString()}:\n\n`;
    const currentWeek = getCurrentWeek();
    const isEvenWeek = currentWeek % 2 === 0;
    const currentSchedule = isEvenWeek ? schedule.even : schedule.odd;
    response += `Сьогодні ${currentWeek} тиждень\n\n`;
    // получаем день недели и обрабатываем исключение для вторника
    let dayOfWeek = today.getDay() - 1;
    if (dayOfWeek === -1) {
        dayOfWeek = 6;
    }
    // обходим расписание и добавляем информацию для текущего дня
    if (currentSchedule[dayOfWeek]) {
        for (let i = 0; i < currentSchedule[dayOfWeek].length; i++) {
            response += `${currentSchedule[dayOfWeek][i].time} - [${currentSchedule[dayOfWeek][i].subject}](${currentSchedule[dayOfWeek][i].link}) (${currentSchedule[dayOfWeek][i].type})\n`;
            response += `Викладач: ${currentSchedule[dayOfWeek][i].teacher}\n`;
            if ((currentSchedule[dayOfWeek][i].subject === 'Системне програмне забезпечення' || currentSchedule[dayOfWeek][i].subject === 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management)')) {
                if (currentWeek === 5 || currentWeek === 9 || currentWeek === 13 || currentWeek === 17) {
                    response += `Група: I підгрупа\n\n`;
                } else if (currentWeek === 7 || currentWeek === 11 || currentWeek === 15 || currentWeek === 19) {
                    response += `Група: II підгрупа\n\n`;
                } else {
                    response += `Група: Всі підгрупи\n\n`;
                }
            } else {
                response += `Група: ${currentSchedule[dayOfWeek][i].group}\n\n`;
            }
        }
    } else {
        response += `На сьогодні нема розкладу.\n`;
    }
    bot.sendMessage(chatId, response, { parse_mode: "Markdown" });
};

function sendNow(chatId) {
    const today = new Date();
    const currentWeek = getCurrentWeek();
    const isEvenWeek = currentWeek % 2 === 0;
    const currentSchedule = isEvenWeek ? schedule.even : schedule.odd;
    let response = `Сьогодні ${today.toLocaleDateString()}, ${currentWeek} тиждень\n\n`;
    // получаем день недели и обрабатываем исключение для вторника
    let dayOfWeek = today.getDay() - 1;
    if (dayOfWeek === -1) {
        dayOfWeek = 6;
    }
    let currentPair = null;
    let nextPair = null;
    let currentBreak = null; // добавляем переменную для текущей перемены
    // ищем текущую и следующую пары
    if (currentSchedule[dayOfWeek]) {
        for (let i = 0; i < currentSchedule[dayOfWeek].length; i++) {
            if (isCurrentPair(currentSchedule[dayOfWeek][i])) {
                currentPair = currentSchedule[dayOfWeek][i];
                if (i < currentSchedule[dayOfWeek].length - 1) {
                    nextPair = currentSchedule[dayOfWeek][i + 1];
                }
                break;
            } else if (isCurrentBreak(currentSchedule[dayOfWeek][i])) { // проверяем, является ли текущей переменой
                currentBreak = currentSchedule[dayOfWeek][i];
                if (i < currentSchedule[dayOfWeek].length - 1) {
                    nextPair = currentSchedule[dayOfWeek][i + 1];
                }
                break;
            }
        }
    }
    if (currentPair) {
        response += `Зараз: ${currentPair.time} - [${currentPair.subject}](${currentPair.link}) (${currentPair.type})\n`;
        response += `Викладач: ${currentPair.teacher}\n`;
        response += `Група: ${currentPair.group}\n\n`;
        if (nextPair) {
            response += `Наступна: ${nextPair.time} - [${nextPair.subject}](${nextPair.link}) (${nextPair.type})\n`;
            response += `Викладач: ${nextPair.teacher}\n`;
            if ((nextPair.subject === 'Системне програмне забезпечення' || nextPair.subject === 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management)')) {
                if (currentWeek === 5 || currentWeek === 9 || currentWeek === 13 || currentWeek === 17) {
                    response += `Група: I підгрупа\n\n`;
                } else if (currentWeek === 7 || currentWeek === 11 || currentWeek === 15 || currentWeek === 19) {
                    response += `Група: II підгрупа\n\n`;
                } else {
                    response += `Група: Всі підгрупи\n\n`;
                }
            } else {
                response += `Група: ${nextPair.group}\n\n`;
            }
        } else {
            response += `На сьогодні більше пар немає.\n`;
        }
    } else if (currentBreak) { // проверяем, является ли текущая перемена
        response += `Зараз перерва. Наступна пара: ${nextPair.time} - [${nextPair.subject}](${nextPair.link}) (${nextPair.type})\n`;
        response += `Викладач: ${nextPair.teacher}\n`;
        if ((nextPair.subject === 'Системне програмне забезпечення' || nextPair.subject === 'Програмна інженерія та управління ІТ-проектами (Softwave Engineering and IT-project management)')) {
            if (currentWeek === 5 || currentWeek === 9 || currentWeek === 13 || currentWeek === 17) {
                response += `Група: I підгрупа\n\n`;
            } else if (currentWeek === 7 || currentWeek === 11 || currentWeek === 15 || currentWeek === 19) {
                response += `Група: II підгрупа\n\n`;
            } else {
                response += `Група: Всі підгрупи\n\n`;
            }
        } else {
            response += `Група: ${nextPair.group}\n\n`;
        }
    } else {
        response += `На сьогодні немає пар.\n`;
    }
    bot.sendMessage(chatId, response, { parse_mode: "Markdown" });
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const keyboard = {
        reply_markup: {
            keyboard: [
                ['Розклад на понеділок', 'Розклад на вівторок', 'Розклад на середу'],
                ['Розклад на четвер', 'Розклад на п\'ятницю', 'Розклад на сьогодні'],
                ['Яка пара зараз?']
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };
    bot.sendMessage(chatId, `Вітаю, я бот для отримання розкладу занять!\nСкористайтесь клавіатурою нижче щоб подивитись розклад`, keyboard);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    switch (messageText) {
        case 'Розклад на понеділок':
            sendSchedule(chatId, 'Понеділок');
            break;
        case 'Розклад на вівторок':
            sendSchedule(chatId, 'Вівторок');
            break;
        case 'Розклад на середу':
            sendSchedule(chatId, 'Середа');
            break;
        case 'Розклад на четвер':
            sendSchedule(chatId, 'Четвер');
            break;
        case 'Розклад на п\'ятницю':
            sendSchedule(chatId, 'П’ятниця');
            break;
        case 'Розклад на сьогодні':
            sendToday(chatId);
            break;
        case 'Яка пара зараз?':
            sendNow(chatId);
            break;
    }
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    switch (data) {
        case 'scheduleMonday':
            sendSchedule(chatId, 'Понеділок');
            break;
        case 'scheduleTuesday':
            sendSchedule(chatId, 'Вівторок');
            break;
        case 'scheduleWednesday':
            sendSchedule(chatId, 'Середа');
            break;
        case 'scheduleThursday':
            sendSchedule(chatId, 'Четвер');
            break;
        case 'scheduleFriday':
            sendSchedule(chatId, 'П’ятниця');
            break;
        case 'scheduleToday':
            sendToday(chatId);
            break;
        case 'currentLesson':
            sendNow(chatId);
            break;
        default:
            bot.sendMessage(chatId, 'Я не розумію цю команду. Спробуйте ще раз.');
    }
});