const User = require('../../models/user.model');

const Transaction = require('../../models/transaction.model');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                Transaction.find({}).exec(function (err, transactions) {
                    res.render('admin/transaction/index', {transactions: transactions,userLogin:user});
                });
            }
        }
    });
};

exports.view = function (req, res, next) {
    User.findById(req.session.userid).exec(function (err, user) {
        if (err) {
            return next(err);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id).populate('customers').exec( function (err, collaborator) {
                    if (err) return next(err);

                    res.render('admin/transaction/view', {collaborator: collaborator,userLogin:user});
                })
            }
        }
    });
};