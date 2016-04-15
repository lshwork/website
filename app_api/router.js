/**
 * Created by wjc on 2016/4/15.
 */
var express = require('express');
var router = express.Router();
var utils = require('./../utils');
var fs=require('fs');
/* GET home page. */
router.get('/', function(req, res) {
    res.json({message: 'api home'});
});

/*router.get('/sellers/demo',function(req,res,next){
    var data = fs.readFileSync('a.json',"utf8");
    var a=JSON.parse(data);
    a.count=11;
    fs.writeFileSync('a.json',JSON.stringify(a));
});*/
module.exports = router;