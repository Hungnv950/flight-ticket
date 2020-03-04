let createError = require('http-errors');

let express = require('express');

let app = express();

let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

let session = require('express-session');
let MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://127.0.0.1:27017/thinkflight', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});

const User = require('./models/user.model');

User.find({username: 'admin@thinkflight.com'}, function (err, user) {
    console.log(user);
    if (user === []) {
        let userNew = new User({
            fullName: 'Admin',
            username: 'admin@thinkflight.com',
            password: '123456',
            code: 'ADMIN',
            roleID: 1,
            status: 10
        });

        userNew.save();
    }
});

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/user'); 

// Frontend
let ticketsRouter = require("./routes/tickets");
let searchRouter = require("./routes/search");

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let userRouter = require('./routes/admin/user.route');

let flightRouter = require('./routes/admin/flight.route');

let dashboardRouter = require('./routes/admin/dashboard.route');

let collaboratorRouter = require('./routes/admin/collaborator.route');

app.use('/admin', dashboardRouter);

app.use('/admin/user', userRouter);

app.use('/admin/flight', flightRouter);

app.use('/admin/collaborator', collaboratorRouter);

app.use("/tickets", ticketsRouter);

app.use("/search", searchRouter);

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
