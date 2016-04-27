/**
 * Created by wjc on 2016/4/15.
 */
var New = require('../../models/new').New;
var async = require('async');
var extend = require('extend');
var config = require('../../config');
var fs = require('fs');

exports.index = function (req, res, next) {
    var start = parseInt(req.query.start || 0);
    var limit = 1;
    var q = {deleted: false,enabled:true,type:{$in:[1,2]}};
    if(req.query.type) q.type=req.query.type;
    async.parallel({
        news: function (callback) {
            New.find(q).skip(start).limit(limit).sort({createdTime: -1}).exec(callback);
        },
        count: function (callback) {
            New.count(q).exec(callback);
        }
    }, function (err, data) {
        if (err) return next(err);
        res.render('news', {
            title: '新闻管理',
            news: data.news,
            pagination: {
                start: start,
                limit: limit,
                total: data.count,
                query: req.query
            }
        });
    });
};


exports.detail = function (req, res, next) {
    var id = req.query.id;
    New.findById(id).exec(function (err, singleNew) {
        if (err) return next(err);
        return res.render('newsDetail', {
            title: '新闻详情',
            singleNew: singleNew
        });
    });
};


