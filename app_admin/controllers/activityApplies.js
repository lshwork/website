/**
 * Created by wjc on 2016/4/15.
 */
var ActivityApply = require('../../models/activityApply').ActivityApply;
var extend = require('extend');
var async = require('async');

exports.index=function(req,res,next){
    var start = parseInt(req.query.start || 0);
    var limit = 1;
    var q = {deleted:false};
    if(req.query.activityName) q.activityName =req.query.activityName;
    if(req.query.phone) q.phone =req.query.phone;
    if(req.query.realName) q.realName = new RegExp(req.query.realName, "i");
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