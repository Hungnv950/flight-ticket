const moment = require('moment');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const STATUS_BOOKING = 1;
const STATUS_PAYMENT = 2;

let FlightSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaboratorCode:{
        type: String
    },
    flightCode: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    exportInvoice: {
        type: Boolean,
        default: false
    },
    companyName: {
        type: String
    },
    taxCode: {
        type: String
    },
    companyAddress: {
        type: String
    },
    invoiceRecipient: {
        type: String,
        trim: true
    },
    passengers: Object,
    totalMoney: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    },
    updatedAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    }
});

let Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;