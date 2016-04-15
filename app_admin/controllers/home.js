/**
 * Created by wjc on 2016/4/15.
 */

var async = require('async');
var uuid = require('node-uuid');
var utils = require('../../utils');
var User = require('../../models/user').User;
var config = require('../../config');
var fs = require('fs');
/*__dirname//当前路径
__filename//当前在执行的js文件路径*/
exports.index = function (req, res, next) {
    async.parallel({
        userCount: function (callback) {
            User.count({deleted: false}, callback);
        }
    }, function (err, data) {
        if (err) return next(err);
        res.render('index', {
            title: '主页',
            userCount: data.userCount
        });
    });
};

exports.login = function (req, res) {
    res.render('login', {layout: false});
};





/*exports.uploadKindEditor = function (req, res, next) {
    console.log(req.file);
    var file = req.file;
    if (file) {
        if (file.size > 2048000) {
            fs.unlink(file.destination + file.filename, function () {
                console.log('success')
                return res.json({
                    error: 1,
                    message: '文件超出2M限制'
                });
            });
        } else {
            var url = config.imageBaseUrl + file.filename;
            return res.json({
                error: 0,
                url: url
            })
        }
    } else {
        return res.json({
            error: 1,
            message: '只支持图片格式的文件',
            key: 123
        });
    }

};
exports.upload = function (req, res, next) {
    console.log(req.file);
    var file = req.file;
    if (file) {
        if (file.size > 2048000) {
            fs.unlink(file.destination + file.filename, function () {
                console.log('success')
                return res.json({
                    error: 1,
                    message: '文件超出2M限制'
                });
            });
        } else {
            var url = config.imageBaseUrl + file.filename;
            var path = "." + url.substr(url.indexOf('/public'), url.length);
            return res.json({
                initialPreview: [
                    "<img style='height:160px' src='" + url + "' class='file-preview-image'>"
                ],
                initialPreviewConfig: [
                    {caption: file.originalname, width: '120px', url: '/admin/pic/deleteImage', key: path}
                ],
                append: true,
                url: url
            })
        }

    } else {
        return res.json({
            error: 1,
            message: '只支持图片格式的文件',
            key: 123
        });
    }

};*/

exports.postLogin = function (req, res, next) {
    req.checkBody('email', '邮箱无效').isEmail();
    req.checkBody('password', '密码不能为空').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.render('login', {
            layout: false,
            errors: errors,
            email: req.body.email,
            rememberMe: req.body.rememberMe
        });
    }
    var email = req.body.email;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    User.findOne({
        email: email
    }, function (err, user) {
        if (err) return next(err);

        if ((!user)) {
            var errors = [{msg: '登录信息不正确或没有管理权限'}];
            return res.render('login', {
                layout: false,
                errors: errors,
                email: req.body.email,
                rememberMe: req.body.rememberMe
            });
        }

        user.comparePassword(password, function (err, matched) {
            var errors = [{msg: '邮箱或密码不正确'}];
            if (!matched) {
                return res.render('login', {
                    layout: false,
                    errors: errors,
                    email: req.body.email,
                    rememberMe: req.body.rememberMe
                });
            }
            // if user is found and password is right
            // create a token
            var token = (new Buffer(uuid.v4())).toString('base64');
            var seconds = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
            utils.redisClient.setex('token:' + token, seconds, user.id);
            res.cookie('token', token, {
                maxAge: seconds * 1000,
                httpOnly: true,
                path: '/'
            });
            res.redirect('/admin/');
        });
    });
};

exports.logout = function (req, res, next) {
    var token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.redirect('/admin/login');
    }

    utils.redisClient.del('token:' + token, function (err, reply) {
        if (err) return next(err);
        res.clearCookie('token', {
            httpOnly: true,
            path: '/'
        });
        return res.redirect('/admin/login');
    });
};

exports.carSystem=function(req,res,next){
    var a = fs.readFileSync('carSystemSetting.json',"utf8");
    var setting=JSON.parse(a);
    return res.render('cars/setting',{
        setting:setting,
        title:"车辆电销系统设置"
    })
};


exports.upload=function(req,res,next){
    console.log(req.file);
    var url = "/public/upload/"+req.file.filename;
    var json={
        initialPreview: [
            "<img style='height:160px' src='" + url + "' class='file-preview-image'>"
        ],
        initialPreviewConfig: [
            {caption: req.file.originalname, width: '120px', url: '/admin/image/delete', key: url}
        ],
        append: true,
        url: url,
        key:url
    };
    if(req.body.kingEditor=="kingEditor") json.error=0;
    return res.json(json);
};

exports.imageDelete=function(req,res,next){
    var key=req.body.key;
    key=key?key.replace(/\//g,'\\'):"";
    var filePath=config.basePath+key;
    console.log(filePath);
    fs.exists(filePath, function( exists ){
        if(exists){
            fs.unlink(filePath,function(){
            });
        }
    });
    return res.json({
       success:true
    });
};