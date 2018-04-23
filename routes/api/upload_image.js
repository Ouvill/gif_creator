var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: process.env.NODE_PATH + '/public/images/uploads',
    filename: function (req, file, cb) {
        cb(null, req.cookies.user_id);
    }
})

var upload = multer({ storage: storage})
var set_id = require('../../utils/set_id');

router.post('/', upload.single('original_image'), function (req, res, next) {

    console.log(req.file);
    let user_id = set_id(req, res);
    res.cookie('original_file', req.file.filename, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });

    if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpeg') {
        try {
            fs.unlinkSync(req.file.path);
            console.log("file delete");
        } catch (err) {
            console.log(err);
        }

        res.json({
            result: false,
            message: " only support png or jpeg "
        });
    } else {
        res.json({
            result: true,
            message: " upload successful "
        });
    }

});

module.exports = router;
