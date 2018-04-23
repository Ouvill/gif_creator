var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: process.env.NODE_PATH + '/public/images/uploads',
    filename: function (req, file, cb) {
        cb(null, req.cookies.user_id);
    }
})

var upload = multer({ storage: storage})
var set_id = require('../../utils/set_id');

router.post('/', upload.single('original_image'), function (req, res, next) {

    let user_id = set_id(req, res);
    console.log(req.file);


});

module.exports = router;
