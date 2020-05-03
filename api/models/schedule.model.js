const moment = require('moment');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ScheduleSchema = new Schema({
    departureDay: {
        type: Date
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    createdAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    },
    updatedAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    }
});

let Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;