/**
 * Created by fangjunfeng on 15-10-27.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var utils = require('../utils');
/* GET home page. */


router.get('/address', function(req, res) {
    res.render('address', {title: 'test1 title',layout: false});
});

module.exports = router;
