/**
 * Created by wjc on 2016/4/15.
 */
var ActivityApply = require('../../models/activityApply').ActivityApply;
var extend = require('extend');
var async = require('async');

exports.beforePost = function(req, res, next) {
    var id = req.body.id;
    var activityApply = {
        realName: req.body.realName,
        sex: req.body.sex,
        birthday: req.body.birthday,
        nationality: req.body.nationality,
        blood: req.body.blood,
        phone: req.body.phone,
        location: req.body.location,
        email: req.body.email,
        contactAddress: req.body.contactAddress,
        postCode: req.body.postCode,
        contactName: req.body.contactName,
        contactPhone: req.body.contactPhone,
        activityName: req.body.activityName,
        guardianPhone: req.body.guardianPhone
        /* realName: {type: String}, //真实姓名
         sex:{type:String},  //性别
         birthday:{type:String},  //出生年月
         nationality:{type:String},  //国籍
         blood:{type:String},  //血型
         phone: {type: String}, //电话、手机号码
         location:{type:String},  //居住地
         email:{type:String},  //邮箱
         contactAddress:{type:String},  //邮箱
         postCode:{type:String},  //邮编
         contactName:{type:String},  //紧急联系人
         contactPhone:{type:String},  //紧急联系人电话
         activityName: {type: String},//活动名称
         guardianPhone: {type: String},//监护人电话
        age: req.body.age,
        job: req.body.job,
        phone:req.body.phone*/
    };
    var phoneReg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
  /*  req.checkBody('realName', '联系姓名是必填项').notEmpty();
    req.checkBody('phone', '联系电话是必填项').notEmpty();
    req.checkBody('phone', '手机号码格式不正确').matches(phoneReg);*/
    var errors = req.validationErrors();
    if (errors) {
        return res.render('activityApplies/edit', {
            errors: errors,
            title: id ? '修改报名信息' : '新增地址',
            activityApply: activityApply
        });
    } else {
        req.activityApply = activityApply;
        next();
    }
};

exports.post = function(req, res, next) {
    var id = req.body.id;
    if (id) {
        // 修改
        ActivityApply.findById(id, function(err, activityApply) {
            if (err) return next(err);
            extend(true, activityApply, req.activityApply, {
                updatedTime: Date.now()
            });
            activityApply.save(function(err) {
                if (err) return next(err);
                return res.json({
                    success:true
                });
            });
        });
    } else {
        // 新增
        var activityApply = new ActivityApply(req.activityApply);
        activityApply.save(function(err) {
            if (err) return next(err);
            return res.json({
                success:true
            });
        });
    }
};