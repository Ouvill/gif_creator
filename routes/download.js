var express = require('express');
var router = express.Router();
var optimize = require('../utils/optimize_gif');


/* GET home page. */
router.get('/:file_id', function (req, res, next) {

    var filename = req.params.file_id + ".gif"

    var image_dir = process.env.NODE_PATH + "/public/images/generate/"
    var dist_path = image_dir + "optimized/" + filename;
    var input_path = image_dir + "row/" + filename;

    optimize.sync(input_path, dist_path);
    var time = new Date().getTime();
    res.render('download', { "filename": filename, "time": time });
});

module.exports = router;
