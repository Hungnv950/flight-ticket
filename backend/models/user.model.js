const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ROLE_CTV = 2;
const ROLE_ADMIN = 1;

const STATUS_ACTIVE = 10;
const STATUS_INACTIVE = 0;

let UserSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    roleID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    address: {
        type: String
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

UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({username: username}).exec(function (err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            let err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    });
};

UserSchema.pre('save', function (next) {
    let user = this;

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
