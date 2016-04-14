/**
 * Created by fangjunfeng on 15-11-18.
 */
var async = require('async');
var extend = require('extend');
var User = require('../../models/user').User;
var config = require('../../config');
var fs=require('fs');

exports.index = function (req, res, next) {
    console.log(config.upload)
    var role = req.query.role ? parseInt(req.query.role) : null;
    var limit = 20;
    var start = parseInt(req.query.start || 0);
    var q = {deleted: false};
    if (role != null) q.role = parseInt(role);
    if (req.query.phone) q.phone = req.query.phone;
    if(req.query.username) q.username = new RegExp(req.query.username, "i");
    async.parallel({
        users: function (callback) {
            User.find(q).skip(start).limit(limit).sort({updatedTime: -1}).exec(callback);
        },
        count: function (callback) {
            User.count(q, callback)
        }
    }, function (err, data) {
        if (err) return next(err);
        res.render('users/index', {
            title: '用户管理',
            users: data.users,
            role: role,
            pagination: {
                start: start,
                limit: limit,
                total: data.count,
                query:req.query
            }
        });
    });
};

exports.add = function (req, res) {
    return res.render('users/edit', {
        title: '新增用户'
    });
};

exports.edit = function (req, res, next) {
    var id = req.query.id;
    User.findById(id).exec(function (err, user) {
        if (err) return next(err);
        return res.render('users/edit', {
            title: '修改用户',
            user: user
        });
    });
};

exports.beforePost = function (req, res, next) {
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;
    var username=req.body.username;
    var user = {
        id: id,
        phone: req.body.phone
    };
    if(username!==null&&username!== undefined &&username.indexOf(' ')==-1&&username!=''){
        user.username=username;
    }
    if(email!==null&&email!== undefined &&email.indexOf(' ')==-1&&email!=''){
        user.email=email;
    }
    req.checkBody('phone', '手机号码是必填项').notEmpty();
    var phoneReg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    req.checkBody('phone', '手机号码格式不正确').matches(phoneReg);
        req.checkBody('email', '管理员必须填写邮箱').notEmpty();
        req.checkBody('email', '邮箱无效').isEmail();
    if (password) {
        req.checkBody('password', '密码至少要6位以上').len(6);
        req.checkBody('confirmPassword', '两次密码必须相同').equals(password);
    }
    if (!id) {
        req.checkBody('password', '密码不能为空').notEmpty();
    }
    async.parallel({
        existPhone:function(callback){
            User.findOne({phone:req.body.phone},{phone:1}).exec(callback);
        },
        existEmail:function(callback){
            User.findOne({email:req.body.email},{email:1}).exec(callback);
        },
        existUsername:function(callback){
            User.findOne({username:req.body.username},{username:1}).exec(callback);
        },
        existNickname:function(callback){
            User.findOne({'profile.nickname':req.body.nickname},{'profile.nickname':1}).exec(callback);
        }
    },function(err,data){
        if(!id&&data.existPhone){
           req.checkBody('phone', '手机号已注册过').len(100);
        }
        if(!id&&data.existEmail){
            req.checkBody('email', '邮箱已被注册').len(100);
        }
        if(!id&&data.existUsername){
           req.checkBody('username', '用户名已被使用').len(100);
        }
    var errors = req.validationErrors();
    if (errors) {
        return res.render('users/edit', {
            title: id ? '修改用户' : '新增用户',
            errors: errors,
            user: user
        });
    } else {
        req.user = user;
        next();
    }
    });
};

exports.post = function (req, res, next) {
    var id = req.body.id;
    var redirect='/admin/users/';
    if (id) {
        // 修改
        User.findById(id, function (err, user) {
            if (err) return next(err);
            extend(true, user, req.user, {
                updatedTime: Date.now()
            });
            if (req.body.password) user.password = req.body.password;
            user.save(function (err) {
                if (err) return next(err);
                return res.redirect(redirect);
            });
        });
    } else {
        // 新增
        var user = new User(req.user);
        user.password = req.body.password;
        user.save(function (err) {
            if (err) return next(err);
            res.redirect(redirect);
        });
    }
};

exports.updateDeleteStu = function (req, res, next) {
    var id = req.body.id;
    User.findById(id, function (err, user) {
        if (err) return next(err);
        user.deleted = req.body.deleted;
        user.updatedTime = Date.now();
        user.save(function (err) {
            if (err) return next(err);
            res.json({
                success: true
            });
        });
    });
};

exports.profile = function (req, res, next) {
    var id = req.params.id;
    var start = parseInt(req.query.start || 0);
    var limit = 10;
    var type = parseInt(req.query.type || 1);
    var q = {
        deleted: false,
        type: type,
        userId:id
    };
    var isFinance=false;
    if(type==4||type==5||type==6){
       isFinance=true;
    }
    User.findById(id).populate('profile.communityId').populate('manageCommunityId').exec(function (err, user) {
        if (err) return next(err);
        async.parallel({
            addresses: function (callback) {
                Address.find({userId: id, deleted: false}, {
                    __v: 0,
                    deleted: 0,
                    enabled: 0
                }).sort({isDefault: -1}).exec(callback);
            },
            dryCleanCount: function (callback) {
                Appointment.count({deleted: false, userId: id, type: 1}).exec(callback);
            },
            houseKeepingCount: function (callback) {
                Appointment.count({deleted: false, userId: id, type: 2}).exec(callback);
            },
            pensionCount: function (callback) {
                Appointment.count({deleted: false, userId: id, type: 3}).exec(callback);
            },
            financeCount: function (callback) {
                Appointment.count({deleted: false, userId: id, type: 4}).exec(callback);
            },
            insuranceCount: function (callback) {
                Appointment.count({deleted: false, userId: id, type: 5}).exec(callback);
            },
            loanCount: function (callback) {
                Appointment.count({deleted: false, userId: id, type: 6}).exec(callback);
            },
            appointments: function (callback) {
                Appointment.find(q, {
                    __v: 0,
                    timeRange: 0,
                    updatedTime: 0,
                    contact: 0
                }).skip(start).limit(limit).sort({createdTime: -1}).exec(callback);
            },
            count: function (callback) {
                Appointment.count(q).exec(callback);
            },
            messages: function (callback) {
                Message.find({receiverId: id, type: 1, deleted: false}).skip(start).limit(limit).exec(callback);
            },
            messageCount: function (callback) {
                Message.count({receiverId: id,deleted:false}).exec(callback);
            },
            shoppingCarts:function (callback) {
                ShoppingCart.find({userId:id,deleted:false}).populate('goodsId').skip(start).limit(limit).exec(callback);
            },
            shoppingCartsCount: function (callback) {
                ShoppingCart.count({userId:id,deleted:false}).exec(callback);
            },
            finances:function(callback){
                Finance.find({type:type,deleted:false}).exec(callback);
            },
            promoCodes:function(callback){
                PromoCode.find({userId:id,deleted:false}).populate('userId').skip(start).limit(limit).exec(callback);
            },
            promoCodesCount:function(callback){
                PromoCode.count({userId:id,deleted:false}).exec(callback);
            }
        }, function (err, data) {
            if (type == 7) {
                return res.render('users/profile-message', {
                    title: '用户资料',
                    user: user,
                    typeTab:type,
                    messages: data.messages,
                    addresses: data.addresses,
                    appointmentCount: {
                        dryCleanCount: data.dryCleanCount,
                        houseKeepingCount: data.houseKeepingCount,
                        pensionCount: data.pensionCount,
                        financeCount: data.financeCount,
                        insuranceCount: data.insuranceCount,
                        loanCount: data.loanCount,
                        appointments: data.appointments
                    },
                    pagination: {
                        start: start,
                        limit: limit,
                        total: data.messageCount,
                        query: req.query
                    }
                });
            } else if (type == 8) {
                initFormOptions(user.profile.communityId, function (err, options) {
                    if (err) next(err);
                    initFormOptions(user.manageCommunityId, function (err, options2) {
                        if (err) next(err);
                        return res.render('users/profile-setting', {
                            title: '用户资料',
                            user: user,
                            typeTab:type,
                            addresses: data.addresses,
                            communityOptions: options.communityOptions,
                            areaOptions: options.areaOptions,
                            communityOptions2: options2.communityOptions,
                            areaOptions2: options2.areaOptions,
                            appointmentCount: {
                                dryCleanCount: data.dryCleanCount,
                                houseKeepingCount: data.houseKeepingCount,
                                pensionCount: data.pensionCount,
                                financeCount: data.financeCount,
                                insuranceCount: data.insuranceCount,
                                loanCount: data.loanCount,
                                appointments: data.appointments
                            },
                            domain: config.qiniu.Domain,
                            uptoken_url: config.qiniu.Uptoken_Url
                        });
                    });
                });
            } else if(type == 9){
                return res.render('users/profile-shoppingcart', {
                    title: '用户资料',
                    user: user,
                    typeTab:type,
                    addresses: data.addresses,
                    shoppingCarts:data.shoppingCarts,
                    appointmentCount: {
                        dryCleanCount: data.dryCleanCount,
                        houseKeepingCount: data.houseKeepingCount,
                        pensionCount: data.pensionCount,
                        financeCount: data.financeCount,
                        insuranceCount: data.insuranceCount,
                        loanCount: data.loanCount,
                        appointments: data.appointments
                    },
                    pagination: {
                        start: start,
                        limit: limit,
                        total: data.shoppingCartsCount,
                        query: req.query
                    }
                });
            }else if(type == 10){
                return res.render('users/profile-promoCode', {
                    title: '用户资料',
                    user: user,
                    typeTab:type,
                    addresses: data.addresses,
                    promoCodes:data.promoCodes,
                    appointmentCount: {
                        dryCleanCount: data.dryCleanCount,
                        houseKeepingCount: data.houseKeepingCount,
                        pensionCount: data.pensionCount,
                        financeCount: data.financeCount,
                        insuranceCount: data.insuranceCount,
                        loanCount: data.loanCount,
                        appointments: data.appointments
                    },
                    pagination: {
                        start: start,
                        limit: limit,
                        total: data.promoCodesCount,
                        query: req.query
                    }
                });
            }else {
                return res.render('users/profile-appointment', {
                    title: '用户资料',
                    user: user,
                    isFinance:isFinance,
                    selectType:type,
                    finances:data.finances,
                    addresses: data.addresses,
                    appointments: data.appointments,
                    appointmentCount: {
                        dryCleanCount: data.dryCleanCount,
                        houseKeepingCount: data.houseKeepingCount,
                        pensionCount: data.pensionCount,
                        financeCount: data.financeCount,
                        insuranceCount: data.insuranceCount,
                        loanCount: data.loanCount,
                        appointments: data.appointments
                    },
                    pagination: {
                        start: start,
                        limit: limit,
                        total: data.count,
                        query: req.query
                    }
                });
            }
        });

    });
};

exports.upload=function(req,res,next){
    console.log(req.files);
    return res.json({
        url:config.filePath+req.file.filename,
        width:640,
        height:640
    });
};