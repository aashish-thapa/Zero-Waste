const scheduleNotification = (userId, message, date) =>{
    const schedule = require('node-schedule');
    schedule.scheduleJob(date, ()=>{
        console.log(`Notification for user ${userId} : ${message}`);

    })

    module.exports = {
        scheduleNotification,
    }
}