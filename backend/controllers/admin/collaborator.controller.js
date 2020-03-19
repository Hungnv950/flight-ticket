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
                        discount:req.body.discount ? req.body.discount : 0,
                        commission:req.body.commission ? req.body.commission : 0,
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
                    discount:req.body.discount ? req.body.discount : 0,
                    commission:req.body.commission ? req.body.commission : 0
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

                    res.render('admin/collaborator/view', {_ : ejsHelpers, collaborator: collaborator,userLogin: user,changePasswordSuccess: req.flash('changePasswordSuccess')});
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

                    res.render('admin/collaborator/change-password', {collaborator: collaborator,userLogin: user,validateFormError: req.flash('validateFormError')});
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
                if (req.body.password && req.body.rePassword) {

                    if(req.body.password.length < 6){
                        req.flash('validateFormError', 'Vui lòng nhập mật khẩu tối thiểu 6 kí tự!');

                        res.redirect('/admin/collaborator/change-password/'+req.params.id);
                    }

                    if(req.body.password !== req.body.rePassword){
                        req.flash('validateFormError', 'Mật khẩu không giống nhau!');

                        res.redirect('/admin/collaborator/change-password/'+req.params.id);
                    }

                    User.updateOne({_id: req.params.id}, {$set:{ password: req.body.password }},function (err) {
                        if (err) return console.error(err);

                        req.flash('changePasswordSuccess', 'Đổi mật khẩu thành công!');

                        return res.redirect('/admin/collaborator/view/'+req.params.id);
                    });
                }
                else{
                    req.flash('validateFormError', 'Vui lòng nhập đầy đủ thông tin có dấu (*)!');

                    res.redirect('/admin/collaborator/change-password/'+req.params.id);
                }
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