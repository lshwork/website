/**
 * Created by wjc on 2016/4/15.
 */
var ActivityApply = require('../../models/activityApply').ActivityApply;
var extend = require('extend');
var async = require('async');

exports.index=function(req,res,next){
    var start = parseInt(req.query.start || 0);
    var limit = 20;
    var q = {deleted:false};
    async.parallel({
        activityApplies: function(callback) {
            ActivityApply.find(q).skip(start).limit(limit).sort({createdTime: -1}).exec(callback);
        },
        count: function(callback) {
            ActivityApply.count(q, callback)
        }
    }, function(err, data) {
        if (err) return next(err);
        res.render('activityApplies/index', {
            title: '报名管理',
            activityApplies: data.activityApplies,
            pagination: {
                start: start,
                limit: limit,
                total: data.count,
                query: req.query
            }
        });
    });
};


exports.add = function (req, res, next) {
    return res.render('activityApplies/edit', {
        title: '新增报名'
    });
};

exports.edit = function(req, res, next) {
    var id = req.query.id;
    ActivityApply.findById(id, function (err, activityApply) {
        if (err) return next(err);
            res.render('activityApplies/edit', {
                title: '修改报名信息',
                activityApply: activityApply
            });
    });
};

exports.beforePost = function(req, res, next) {
    var id = req.body.id;
    var activityApply = {
        realName: req.body.realName,
        activityName: req.body.activityName,
        identification: req.body.identification,
        age: req.body.age,
        job: req.body.job,
        phone:req.body.phone
    };
    var phoneReg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    req.checkBody('realName', '联系姓名是必填项').notEmpty();
    req.checkBody('phone', '联系电话是必填项').notEmpty();
    req.checkBody('phone', '手机号码格式不正确').matches(phoneReg);
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
                res.redirect('/admin/activityApplies/');
            });
        });
    } else {
        // 新增
        var activityApply = new ActivityApply(req.activityApply);
        activityApply.save(function(err) {
            if (err) return next(err);
            res.redirect('/admin/activityApplies/');
        });
    }
};

exports.updateDeleteStu=function(req,res,next){
    var id=req.body.id;
    ActivityApply.findById(id, function (err, activityApply) {
        if (err) return next(err);
        activityApply.deleted = req.body.deleted;
        activityApply.updatedTime = Date.now();
        activityApply.save(function (err) {
            if (err) return next(err);

        });
    });
};