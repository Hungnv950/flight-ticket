const User = require('../../models/user.model');

exports.dashboard = function (req, res, next) {
    User.findById(req.session.userid).populate('customers').exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                res.render('admin/dashboard/'+ (user.roleId === 1 ? 'index-admin':'index-collaborator'), {userLogin: user});
            }
        }
    });
};

exports.login = function (req, res) {
    res.render('admin/dashboard/login');
};

exports.loginPost = function (req, res, next) {
    if (req.body.username && req.body.username) {
        User.authenticate(req.body.username, req.body.password, function (error, user) {
            if (error || !user) {
                let err = new error('wrong email or password.');
                err.status = 401;

                return next(err);
            } else {
                req.session.userid = user._id;

                return res.redirect('/admin/dashboard');
            }
        });
    }
};

exports.logout = function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
};
