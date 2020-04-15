const ejs = require('ejs');

const nodemailer = require('nodemailer');

const User = require('../../models/user.model');
const Flight = require('../../models/flight.model');
const Transaction = require('../../models/transaction.model');

exports.index = async function(req, res) {
    try {
        if(req.user.roleId !== User.role_admin && req.user.roleId !== User.role_nv){
            res.status(403).send({});
        }

        let conditions = {};

        let query = req.query;

        if(query.flightSearch){
            conditions.$or = [{
                "flightCode": new RegExp('.*'+query.flightSearch+'.*', "i")
            },{
                "phone": new RegExp('.*'+query.flightSearch+'.*', "i")
            }];
        }

        if(query.collaboratorCode){
            conditions.collaboratorCode = new RegExp('.*'+query.collaboratorCode+'.*', "i");
        }

        if(query.status > 0){
            conditions.status = query.status;
        }

        if(parseInt(query.searchDateAdvanced)){
            conditions.createdAt = {"$gte": new Date(query.startDate), "$lte": new Date(query.endDate)};
        }
        else{
            if(query.dateQuick){
                let gte = null;
                let lte = null;

                switch (query.dateQuick) {
                    case "today":
                        gte = moment().set({'hour': 7, 'minute': 0,'second':0}).toDate();

                        lte = moment().set({'hour': 30, 'minute': 59,'second':59}).toDate();

                        break;
                    case "yesterday":
                        gte = moment().set({'day':moment().day()-1,'hour': 7, 'minute': 0,'second':0}).toDate();

                        lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();

                        break;
                    case "seven-day-ago":
                        gte = moment().set({'day':moment().day()-7,'hour': 7, 'minute': 0,'second':0}).toDate();

                        lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();

                        break;
                    case "month":
                        gte = moment().startOf('month').set({'hour': 7}).toDate();

                        lte = moment().set({'day':moment().day(),'hour': 30, 'minute': 59,'second':59}).toDate();

                        break;
                    case "last-month":
                        gte = moment().subtract(1,'months').startOf('month').set({'hour': 7}).toDate();

                        lte = moment().subtract(1,'months').endOf('month').set({'hour': 30, 'minute': 59,'second':59}).toDate();

                        break;
                    default:
                        break;
                }

                if(query.dateQuick !== "all"){
                    conditions.createdAt = {"$gte": new Date(gte), "$lte": new Date(lte)};
                }
            }
        }

        const resPerPage = 15;
        const page = req.query.page || 1;

        const collaborators = await User.find({roleId: User.role_ctv});

        res.status(200).send(collaborators).skip((resPerPage * page) - resPerPage).limit(resPerPage);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.create = async function(req, res) {
    try {
        if(req.user.roleId !== User.role_admin && req.user.roleId !== User.role_nv){
            res.status(403).send({});
        }

        req.body.roleId = User.role_ctv;

        req.body.password = req.body.username;

        const collaborator = new User(req.body);

        await collaborator.save();

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'levanviet_t58@hus.edu.vn',
                pass: 'Thangngo0'
            }
        });

        let mailOptions = {
            to: collaborator.email,
            subject: '[ThankTrip] Thông tin đăng nhập',
            html: ejs.render('<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse">\n' +
                '    <tbody>\n' +
                '    <tr>\n' +
                '        <td\n' +
                '            style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">\n' +
                '            <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">\n' +
                '                <tbody>\n' +
                '                <tr>\n' +
                '                    <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                    <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>\n' +
                '                    <td>\n' +
                '                        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">\n' +
                '                            <tbody>\n' +
                '                            <tr>\n' +
                '                                <td height="15" style="line-height:15px" colspan="3">&nbsp;</td>\n' +
                '                            </tr>\n' +
                '                            <tr>\n' +
                '                                <td width="32" align="left" valign="middle" style="height:32px;line-height:0">\n' +
                '                                    <img src="https://duybnd-1659.github.io/images/logo.png" height="45" style="border:0" class="CToWUd">\n' +
                '                                </td>\n' +
                '                                <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>\n' +
                '                                <td width="100%">\n' +
                '                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:#3b5998">ThankTrip</span>\n' +
                '                                </td>\n' +
                '                            </tr>\n' +
                '                            <tr style="border-bottom:solid 1px #e5e5e5">\n' +
                '                                <td height="15" style="line-height:15px" colspan="3">&nbsp;</td>\n' +
                '                            </tr>\n' +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </td>\n' +
                '                    <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                    <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>\n' +
                '                    <td>\n' +
                '                        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">\n' +
                '                            <tbody>\n' +
                '                            <tr>\n' +
                '                                <td height="28" style="line-height:28px">&nbsp;</td>\n' +
                '                            </tr>\n' +
                '                            <tr>\n' +
                '                                <td>\n' +
                '                                    <div style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">\n' +
                '                                        <p>Xin chào ' + collaborator.fullName + ',</p>\n' +
                '                                        <p></p>\n' +
                '                                        <div>\n' +
                '                                            Chúng tôi đã nhận được yêu cầu làm CTV cùng ThankTrip của bạn.\n' +
                '                                        </div>\n' +
                '                                        <br>\n' +
                '                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image: linear-gradient(140deg, #ffa311 0%, #ff4500 100%);color: #fff;box-shadow: 0 3px 6px rgba(255, 167, 0, 0.4);">\n' +
                '                                            <tbody>\n' +
                '                                            <tr>\n' +
                '                                                <td style="text-transform:uppercase;padding:12px 10px">Thông tin đăng nhập vào trang quản trị của bạn là:</td>\n' +
                '                                            </tr>\n' +
                '                                            </tbody>\n' +
                '                                        </table>\n' +
                '                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">\n' +
                '                                            <tbody>\n' +
                '                                            <tr>\n' +
                '                                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">\n' +
                '                                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">\n' +
                '                                                        Link đăng nhập\n' +
                '                                                    </span>\n' +
                '                                                </td>\n' +
                '                                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">\n' +
                '                                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">\n' +
                '                                                        <a href="http://150.95.108.243:9000/admin/login">\n' +
                '                                                            http://150.95.108.243:9000\n' +
                '                                                        </a>\n' +
                '                                                    </span>\n' +
                '                                                </td>\n' +
                '                                            </tr>\n' +
                '                                            <tr>\n' +
                '                                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">\n' +
                '                                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">\n' +
                '                                                        Tài khoản\n' +
                '                                                    </span>\n' +
                '                                                </td>\n' +
                '                                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">\n' +
                '                                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">\n' +
                '                                                        ' + collaborator.phone + '\n' +
                '                                                    </span>\n' +
                '                                                </td>\n' +
                '                                            </tr>\n' +
                '                                            <tr>\n' +
                '                                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">\n' +
                '                                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">\n' +
                '                                                        Mật khẩu\n' +
                '                                                    </span>\n' +
                '                                                </td>\n' +
                '                                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">\n' +
                '                                                    <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">\n' +
                '                                                        ' + collaborator.phone + '\n' +
                '                                                    </span>\n' +
                '                                                </td>\n' +
                '                                            </tr>\n' +
                '                                            </tbody>\n' +
                '                                        </table>\n' +
                '                                        <p></p>\n' +
                '                                        Ngoài ra, bạn có thể đăng nhập trực tiếp tại đây.\n' +
                '                                        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody>\n' +
                '                                            <tr>\n' +
                '                                                <td height="9" style="line-height:9px" colspan="3">&nbsp;</td>\n' +
                '                                            </tr>\n' +
                '                                            <tr>\n' +
                '                                                <td>\n' +
                '                                                    <a href="" style="color:#3b5998;text-decoration:none" target="_blank">\n' +
                '                                                        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">\n' +
                '                                                            <tbody>\n' +
                '                                                            <tr>\n' +
                '                                                                <td style="border-collapse:collapse;border-radius:2px;text-align:center;display:block;padding:12px 16px 12px 16px;background-image: linear-gradient(140deg, #ffa311 0%, #ff4500 100%);color: #fff;box-shadow: 0 3px 6px rgba(255, 167, 0, 0.4);">\n' +
                '                                                                    <a href="http://150.95.108.243:9000/admin/login" style="color:#3b5998;text-decoration:none;display:block" target="_blank">\n' +
                '                                                                        <center>\n' +
                '                                                                            <font size="3">\n' +
                '                                                                                <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;white-space:nowrap;font-weight:bold;vertical-align:middle;color:#ffffff;font-size:14px;line-height:14px">\n' +
                '                                                                                    Đăng nhập ngay\n' +
                '                                                                                </span>\n' +
                '                                                                            </font>\n' +
                '                                                                        </center>\n' +
                '                                                                    </a>\n' +
                '                                                                </td>\n' +
                '                                                            </tr>\n' +
                '                                                            </tbody>\n' +
                '                                                        </table>\n' +
                '                                                    </a>\n' +
                '                                                </td>\n' +
                '                                                <td width="100%"></td>\n' +
                '                                            </tr>\n' +
                '                                            <tr>\n' +
                '                                                <td height="32" style="line-height:32px" colspan="3">&nbsp;</td>\n' +
                '                                            </tr>\n' +
                '                                            </tbody>\n' +
                '                                        </table>\n' +
                '                                        <br>\n' +
                '                                        <div>\n' +
                '                                            <span style="color:#333333;font-weight:bold">\n' +
                '                                                Bạn đã không yêu cầu thông tin này?\n' +
                '                                            </span>\n' +
                '                                        </div>\n' +
                '                                        Nếu bạn không yêu cầu làm CTV, hay bỏ qua email này.\n' +
                '                                    </div>\n' +
                '                                </td>\n' +
                '                            </tr>\n' +
                '                            <tr>\n' +
                '                                <td height="28" style="line-height:28px">&nbsp;</td>\n' +
                '                            </tr>\n' +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </td>\n' +
                '                    <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                    <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>\n' +
                '                    <td>\n' +
                '                        <table border="0" width="100%" cellspacing="0" cellpadding="0" align="left"\n' +
                '                               style="border-collapse:collapse">\n' +
                '                            <tbody>\n' +
                '                            <tr style="border-top:solid 1px #e5e5e5">\n' +
                '                                <td height="19" style="line-height:19px">&nbsp;</td>\n' +
                '                            </tr>\n' +
                '                            <tr>\n' +
                '                                <td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">\n' +
                '                                    Tin nhắn này được gửi tới\n' +
                '                                    <a href="mailto:l' + collaborator.email+ '" style="color:#3b5998;text-decoration:none" target="_blank">\n' +
                '                                        ' + collaborator.email + '\n' +
                '                                    </a>\n' +
                '                                    theo yêu chính sách của ThinkTrip.\n' +
                '                                    <br>\n' +
                '                                    <div>\n' +
                '                                        <a href="#">ThankTrip</a>\n' +
                '                                        <span>© 2020 creativeLabs.</span>\n' +
                '                                    </div>\n' +
                '                                </td>\n' +
                '                            </tr>\n' +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </td>\n' +
                '                    <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                    <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>\n' +
                '                </tr>\n' +
                '                </tbody>\n' +
                '            </table>\n' +
                '        </td>\n' +
                '    </tr>\n' +
                '    </tbody>\n' +
                '</table>'
            )
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) return console.error(err);
        });

        res.status(201).send(collaborator);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.update = async function(req, res) {
    try {
        await User.updateOne({_id: req.params.id}, {$set: req.body});

        const collaborator = await User.findById(req.params.id);

        res.status(200).send(collaborator);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    // try {
        if(req.user.roleId !== User.role_admin && req.user.roleId !== User.role_nv){
            res.status(403).send({});
        }

        const collaborator = await User.findById(req.params.id);

        let gte = null;
        let lte = null;

        switch (req.params.filterDate) {
            case "today":
                gte = moment().set({'hour': 7, 'minute': 0,'second':0}).toDate();

                lte = moment().set({'hour': 30, 'minute': 59,'second':59}).toDate();

                break;
            case "yesterday":
                gte = moment().set({'day':moment().day()-1,'hour': 7, 'minute': 0,'second':0}).toDate();

                lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();

                break;
            case "seven-day-ago":
                gte = moment().set({'day':moment().day()-7,'hour': 7, 'minute': 0,'second':0}).toDate();

                lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();

                break;
            case "month":
                gte = moment().startOf('month').set({'hour': 7}).toDate();

                lte = moment().set({'day':moment().day(),'hour': 30, 'minute': 59,'second':59}).toDate();

                break;
            case "last-month":
                gte = moment().subtract(1,'months').startOf('month').set({'hour': 7}).toDate();

                lte = moment().subtract(1,'months').endOf('month').set({'hour': 30, 'minute': 59,'second':59}).toDate();

                break;
            default:
                break;
        }

        const flights = await Flight.find({"createdAt": {"$gte": new Date(gte), "$lte": new Date(lte)},"collaboratorCode":collaborator.code});

        let data = {
            hits: Math.floor(Math.random() * 100),
            profit: 0,
            revenue: 0,
            guestsBooked: 0,
            flights: flights,
            collaborator: collaborator
        };

        flights.forEach(function (flight) {
            data.revenue += flight.totalMoney;
            data.profit += 30000;
            data.guestsBooked++;
        });

        data.transactions = await Transaction.find({
            "createdAt": {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }
        }).populate('bank');

        res.status(200).send(data);
    // } catch (error) {
    //     res.status(400).send(error)
    // }
};