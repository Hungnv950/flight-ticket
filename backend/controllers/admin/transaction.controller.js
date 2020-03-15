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

                let query = user.roleId === 1 ? {}:{user:user.id};

                Transaction.find(query).populate('user').populate('bank').exec(function (err, transactions) {
                    res.render('admin/transaction/index', {transactions: transactions,userLogin:user});
                });
            }
        }
    });
};

exports.create = function (req, res, next) {
    User.findById(req.session.userid).populate('banks').exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                if(user.roleId === 1){
                    return res.redirect('/admin/dashboard');
                }

                res.render('admin/transaction/create', {userLogin: user});
            }
        }
    });
};

exports.createPost = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                if(user.roleId === 1){
                    return res.redirect('/admin/dashboard');
                }

                if (req.body.bankId && req.body.amount) {

                    let transaction = new Transaction({
                        user:user._id,
                        bank:req.body.bankId,
                        amount:req.body.amount
                    });

                    transaction.save(function (err) {
                        if (err) return console.error(err);

                        user.transactions.push(transaction);
                        user.save();

                        return res.redirect('/admin/transaction/index');
                    });
                }
            }
        }
    });
};