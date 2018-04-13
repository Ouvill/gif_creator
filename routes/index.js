var express = require('express');
var router = express.Router();
var img_list = require('../utils/img_list');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    img_list: img_list
  });
});

module.exports = router;
