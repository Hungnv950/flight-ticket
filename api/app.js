const dotenv = require('dotenv');

dotenv.config();

let createError = require('http-errors');

let express = require('express');

let app = express();

let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});

const User = require('./models/user.model');

User.find({username: 'admin@thinkflight.com'}, function (err, results) {
    if (!results.length) {
        let userNew = new User({
            fullName: 'Admin',
            username: 'admin@thinkflight.com',
            password: '123456',
            roleId: 1,
            status: 10
        });

        userNew.save(function (err) {
            if (err) return console.error(err);
        });
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let apiV1Router = require('./routes/api/v1.route');
let adminRouter = require('./routes/admin.route');

app.use('/api/v1', apiV1Router);
app.use('/api/admin', adminRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;