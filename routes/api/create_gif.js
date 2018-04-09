var express = require('express');
var router = express.Router();
var gif = require('../../utils/create_gif');

/* GET home page. */
router.post('/', function (req, res, next) {

    var root_path = process.env.NODE_PATH

    var text = req.body.text;
    var font_size = req.body.font_size;
    var delay = req.body.delay;
    var repeat = req.body.repeat;
    var width = 506;
    var height = 253;
    var name = "sample.gif"
    var path = root_path + "/public/images/generate/" + name;
    var url = "/images/generate/" + name;

    gif.text_gif(path, text, font_size, delay, width, height, repeat);

    res.json({ "result": "true", "url": url })
});

module.exports = router;
