const bcrypt = require('bcrypt');

const moment = require('moment');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    code: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    avatar:{
        type:String
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
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    roleId: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default:10
    },
    address: {
        type: String
    },
    note: {
        type: String
    },
    commission:{
        type:Number,
        default:0
    },
    wallet:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
    permissions: [],
    flights: [{ type: Schema.Types.ObjectId, ref: 'Flight' }],
    banks:[{ type: Schema.Types.ObjectId, ref: 'Bank' }],
    transactions:[{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    createdAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    },
    updatedAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    }
});

UserSchema.statics.role_admin = 1; // quyen quan tri vien
UserSchema.statics.role_ctv   = 2; // quyen cong tac vien
UserSchema.statics.role_user  = 3; // quyen khach hang
UserSchema.statics.role_nv    = 4; // quyen nhan vien

UserSchema.statics.status_active   = 1;  // hoat dong
UserSchema.statics.status_unactive = 0;  // ngung hoat dong
UserSchema.statics.status_deleted = -1; // da xoa

UserSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({token});

    user.email = 'admin@thanktrip.com';

    await user.save();

    return token;
};

UserSchema.statics.authenticate = async function(username, password) {
    const user = await User.findOne({username} );

    if (!user) {
        return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {

    }

    return user;
};

function slugName(text) {
    return text.toString().toLowerCase()
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd');
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

UserSchema.pre('save', function (next) {
    let user = this;

    let string = user.fullName.split(' ');

    let slug = slugName(string[string.length - 1]).toUpperCase();

    let max = 10;

    if (user.roleId !== this.role_user && !user.code) {
        user.code = slug + getRandomIntInclusive(Math.pow(10, (max - slug.length)), Math.pow(10, (max - slug.length + 1)));
    }

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