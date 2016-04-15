/**
 * Created by wjc on 2016/4/15.
 */
var redis = require('redis');
var User = require('./models/user').User;
var redisClient = redis.createClient();

exports.redisClient = redisClient;

exports.checkToken = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    redisClient.get('token:'+token, function(err, user_id) {
        if (!user_id) {
            return res.json({
                code: 89,
                message: '无效的或过期的token'
            });
        }
        console.log('reply: ' + user_id);
        User.findById(user_id, function(err, user) {
            if (!user ) {
                return res.json({
                    code:34,
                    message:'用户不存在'
                });
            }
            req.currentUserId = user_id;
            req.currentUser = user;
            res.locals.currentUser = user;
            next();
        });
    });
};


exports.checkWxBrowser = function(req, res, next) {
    var userAgent = req.headers['user-agent'].toLowerCase();
    if (!/micromessenger/.test(userAgent)) {
        return res.sendStatus(403);
    }
    next();
};

exports.isAdmin = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.redirect('/admin/login');
    }
    redisClient.get('token:'+token, function(err, user_id) {
        if (!user_id) {
            return res.redirect('/admin/login');
        }
        User.findById(user_id, function(err, user) {
            if (!user) {
                return res.redirect('/admin/login');
            }
            req.currentUserId = user_id;
            req.currentUser = user;
            res.locals.currentUser = user;
            next();
        });
    });
};


exports.checkCookie = function(req, res, next) {
    var token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];
    var url=req.url;
    if (!token) {
        /*  return res.status(403).send({
         success: false,
         message: 'No token provided.'
         });*/
        return res.redirect('/login?from='+url);
    }

    redisClient.get('token:'+token, function(err, user_id) {
        if (!user_id) {
            return res.redirect('/login?from='+url);
        }
        console.log('reply: ' + user_id);
        User.findById(user_id, function(err, user) {
            if (!user ) {
                return res.redirect('/login?from='+url);
            }
            if(req.query.token&&!req.cookies.token){
                var seconds = 60 * 60 * 24 * 30;
                res.cookie('token', token, {
                    maxAge: seconds * 1000,
                    httpOnly: true,
                    path: '/'
                });
            }
            req.currentUserId = user_id;
            req.currentUser = user;
            req.currentUserCommunityId=user.profile.communityId;
            res.locals.currentUser = user;
            next();
        });
    });
};

