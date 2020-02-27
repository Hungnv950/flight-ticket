let createError = require('http-errors');

let express = require('express');

let app = express();

let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

let session = require('express-session');
let MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/thinkflight', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let dashboardRouter = require('./routes/admin/dashboard.route');

let collaboratorRouter = require('./routes/admin/collaborator.route');

app.use('/admin', dashboardRouter);

app.use('/admin/collaborator', collaboratorRouter);

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
