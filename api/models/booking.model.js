const moment = require('moment');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let BookingSchema = new Schema({
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    fullName: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    otherRequirements: {
        type: String
    },
    exportiInvoice: {
        type: Boolean,
        default: false
    },
    company:{
        name: {
            type: String
        },
        mst: {
            type: String
        },
        address: {
            type: String
        },
        invoiceRecipient:{
            type: String
        }
    },
    luggageGo:{
        title:{
            type: String,
            default: 'Không, cảm ơn'
        },
        cost:{
            type: Number,
            default: 0
        }
    },
    luggageBack:{
        title:{
            type: String,
            default: 'Không, cảm ơn'
        },
        cost:{
            type: Number,
            default: 0
        }
    },
    passengers:[{
        gender:{
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    }],
    status: {
        type: Number,
        default: 10
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

let Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;