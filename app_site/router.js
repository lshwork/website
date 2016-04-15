var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var utils = require('../utils');
var news=require('./controllers/news')
/* GET home page. */


router.get('/news',news.index);
router.get('/about',function(req,res){
    return res.render('about')
});
module.exports = router;
