var express = require('express');
var router = express.Router();
var img_list = require("../../utils/img_list");
router.get('/', function (req, res, next) {
    res.json({ "images": img_list });
});

module.exports = router;
