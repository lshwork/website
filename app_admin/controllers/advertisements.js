/**
 * Created by lsh on 2015/12/11 0011.
 */
var Advertisement = require('../../models/advertisement').Advertisement;
var async = require('async');
var extend = require('extend');
var config = require('../../config');
var fs = require('fs');


exports.index = function (req, res, next) {
    var start = parseInt(req.query.start || 0);
    var limit = 20;
    var q = {deleted: false};
    async.parallel({
        advertisements: function (callback) {
            Advertisement.find(q).skip(start).limit(limit).sort({createdTime: -1}).exec(callback);
        },
        count: function (callback) {
            Advertisement.count(q).exec(callback);
        }
    }, function (err, data) {
        if (err) return next(err);
        res.render('advertisements/index', {
            title: '广告图片管理',
            advertisements: data.advertisements,
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
    res.render('advertisements/edit', {
        title: '新增广告图',
    });
};
exports.edit = function (req, res, next) {
    var id=req.query.id;
    Advertisement.findById(id,function(err,advertisement){
        if(err) next(err);
        res.render('advertisements/edit', {
            title: '修改广告图',
            advertisement:advertisement,
        });
    });

};

exports.beforePost = function (req, res, next) {
    var id = req.body.id;
    var image=req.body.images;
    var images=new Array();
    var newImages=[];
    if(typeof image=='string'){
        images[0]=image;
    }else{
        images=image;
    }
    if(images){
        for(var i= 0;i<images.length;i++){
            newImages.push({
                img:'<img id=\"images'+i+'\" name=\"images\" src=\"'+images[i]+'\" width=\"50\"  height=\"50\" />',
                url:images[i]
            });
        }
    }
    var advertisement = {
        ADLocation: req.body.ADLocation,
        images: newImages
    };
    req.checkBody('ADLocation', '请选择广告图区域').notEmpty();
    req.checkBody('images', '请插入广告图').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.render('advertisements/edit', {
            title: id ? '修改广告图' : '新增广告图',
            errors: errors,
            advertisement: advertisement
        });
    } else {
        req.advertisement = advertisement;
        next();
    }
};

exports.post = function (req, res, next) {
    var id = req.body.id;
    if (id) {
        // 修改
        Advertisement.findById(id, function (err, advertisement) {
            if (err) return next(err);
            advertisement.images='';
            extend(true, advertisement, req.advertisement, {
                updatedTime: Date.now()
            });
            advertisement.save(function (err) {
                if (err) return next(err);
                res.redirect('/admin/advertisements/');
            });
        });
    } else {
        var ADLocation=req.advertisement.ADLocation;
        Advertisement.findOne({ADLocation:ADLocation,deleted:false}).exec(function(err,advertisement){
            if(err) return next(err);
            if(advertisement){
                advertisement.deleted=true;
                console.log(advertisement)
                advertisement.save(function(err){
                    if(err) return next(err);
                    var advertisement = new Advertisement(req.advertisement);
                    advertisement.save(function (err) {
                        if (err) return next(err);
                        res.redirect('/admin/advertisements/');
                    });
                });
            }else{
                var advertisement = new Advertisement(req.advertisement);
                advertisement.save(function (err) {
                    if (err) return next(err);
                    res.redirect('/admin/advertisements/');
                });
            }
        });

    }
};

exports.updateDeleteStu = function (req, res, next) {
    var id = req.body.id;
    Advertisement.findById(id, function (err, advertisement) {
        if (err) return next(err);
        advertisement.deleted = req.body.deleted;
        advertisement.updatedTime = Date.now();
        advertisement.save(function (err) {
            if (err) return next(err);
            res.json({
                success: true
            });
        });
    });
};
