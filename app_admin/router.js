/**
 * Created by fangjunfeng on 15-10-29.
 */
var express = require('express');
var multer = require('multer');
var moment = require('moment');

var config = require('../config');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload)
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, moment(Date.now()).format('YYYYMMDDHHmmssSSSS') + file.originalname);
    }
});
var upload = multer({
    /*fileFilter: function (req, file, cb) {
        var reg = /(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$/;
        return cb(null, reg.test(file.originalname));
    },*/
    storage: storage
});
var router = express.Router();
var utils = require('../utils');
var home = require('./controllers/home');
var users = require('./controllers/users');
var news = require('./controllers/news');
var advertisements = require('./controllers/advertisements');
var activityApplies=require('./controllers/activityApplies');
var cpUpload = upload.fields([{ name: 'file', maxCount: 5 }, { name: 'attachment', maxCount: 8 }]);
router.get('/login', home.login);
router.post('/postLogin', home.postLogin);
/*router.use(utils.isAdmin);*/


/*router.post('/pic/upload/:imageType', upload.single('image'), home.upload);
router.post('/pic/uploadKindEditor/:imageType', upload.single('image'), home.uploadKindEditor);*/
router.post('/pic/upload', upload.single('file'), home.upload);
router.use(utils.isAdmin);


//router.get('/appointment',Appointment.get);
router.get('/', home.index);
router.get('/logout', home.logout);
router.get('/users/', users.index);
router.get('/users/add', users.add);
router.get('/users/edit', users.edit);
router.post('/users/post', users.beforePost, users.post);
router.post('/users/delete', users.updateDeleteStu);
router.get('/users/profile/:id', users.profile);
/*router.post('/users/pic/upload/:fileKey', upload.single('avatar'), users.upload);*/
router.post('/image/delete', home.imageDelete);
router.get('/advertisements', advertisements.index);
router.get('/advertisements/add', advertisements.add);
router.post('/advertisements/post', advertisements.beforePost, advertisements.post);
router.get('/advertisements/edit', advertisements.edit);
router.post('/advertisements/delete', advertisements.updateDeleteStu);

router.get('/news', news.index);
router.get('/news/add', news.add);
router.get('/news/edit', news.edit);
router.post('/news/post', news.beforePost, news.post);
router.post('/news/delete', news.updateDeleteStu);

router.get('/activityApplies',activityApplies.index);
router.get('/activityApplies/add', activityApplies.add);
router.post('/activityApplies/post', activityApplies.beforePost, activityApplies.post);
router.get('/activityApplies/edit', activityApplies.edit);
router.post('/activityApplies/delete',activityApplies.updateDeleteStu);
module.exports = router;