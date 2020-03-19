const User = require('../../models/user.model');

const ejsHelpers = require('../../helpers/ejs-helpers');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.find({roleId: 2}).exec(function (err, collaborators) {
                    res.render('admin/collaborator/index', {collaborators: collaborators,userLogin: user});
                });
            }
        }
    });
};

exports.create = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                res.render('admin/collaborator/create', {userLogin: user});
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
                if (req.body.username && req.body.fullName) {

                    let collaborator = new User({
                        fullName: req.body.fullName,
                        username: req.body.username,
                        phone: req.body.username,
                        password: req.body.username,
                        address: req.body.address,
                        note: req.body.note,
                        commission:req.body.commission,
                        discount:req.body.discount,
                        roleId: 2,
                        status: 10
                    });

                    collaborator.save(function (err) {
                        if (err) return console.error(err);

                        let random = Math.floor(Math.random() * 10);

                        let user = new User({
                            fullName: req.body.fullName+' KH',
                            username: req.body.username+random,
                            phone: req.body.username+random,
                            password: req.body.username+random,
                            address: req.body.address,
                            note: req.body.note,
                            roleId: 3,
                            status: 10
                        });

                        user.save(function (err) {
                            if (err) return console.error(err);
                        });

                        return res.redirect('/admin/collaborator/index');
                    });
                }
            }
        }
    });
};

exports.update = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id, function (err, collaborator) {
                    if (err) return next(err);

                    res.render('admin/collaborator/update', {collaborator: collaborator,userLogin: user});
                })
            }
        }
    });
};

exports.updatePost = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                let queries = {
                    note:req.body.note,
                    address:req.body.address,
                    fullName:req.body.fullName,
                    discount:req.body.discount,
                    commission:req.body.commission
                };

                User.updateOne({_id: req.params.id}, {$set: queries},function (err) {
                    if (err) return console.error(err);

                    return res.redirect('/admin/collaborator/view/'+req.params.id);
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
                User.findById(req.params.id).populate('customers').populate('banks').populate('transactions').exec( function (err, collaborator) {
                    if (err) return next(err);

                    res.render('admin/collaborator/view', {_ : ejsHelpers, collaborator: collaborator,userLogin: user});
                })
            }
        }
    });
};

exports.changePassword = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id, function (err, collaborator) {
                    if (err) return next(err);

                    res.render('admin/collaborator/change-password', {collaborator: collaborator,userLogin: user});
                })
            }
        }
    });
};

exports.changePasswordPost = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id, function (err, collaborator) {
                    if (err) return next(err);

                    collaborator.note = req.body.note;
                    collaborator.address = req.body.address;
                    collaborator.fullName = req.body.fullName;

                    collaborator.update(function (err) {
                        if (err) return console.error(err);

                        return res.redirect('/admin/collaborator/view/'+req.params.id);
                    });
                });
            }
        }
    });
};

exports.deActive = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                if(user.roleId !== 1){
                    return res.redirect('/admin/dashboard');
                }

                User.findById(req.params.id, function (err, user) {
                    if (err) return next(err);

                    User.updateOne({_id:user._id}, {$set:{ status: (user.status === 10 ? 0 : 10) }},function (err) {
                        if (err) return console.error(err);

                        return res.redirect('/admin/collaborator/view/'+req.params.id);
                    });
                });
            }
        }
    });
};