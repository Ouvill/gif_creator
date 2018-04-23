var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer ({ dest: process.env.NODE_PATH  + '/public/images/uploads' })
var set_id = require('../../utils/set_id');

router.post('/', upload.single('original_image') ,function (req, res, next) {

    let user_id = set_id(req, res);

});

module.exports = router;
