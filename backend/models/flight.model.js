const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    exportInvoice: {
        type: Boolean
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

    status: {
        type: Number,
        required: true,
    },
    note: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
