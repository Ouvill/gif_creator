var express = require('express');
var router = express.Router();
var gif = require('../../utils/create_gif');

/* GET home page. */
router.post('/', function (req, res, next) {
    if (typeof req.session.user_id === 'undefined') {
        console.log("set id");
        req.session.user_id = getUniqueStr();
    }

    var root_path = process.env.NODE_PATH

    var text = req.body.text;
    var font_size = req.body.font_size;
    var delay = req.body.delay;
    var repeat = req.body.repeat;
    var width = 506;
    var height = 253;
    var name = req.session.user_id + ".png";
    var path = root_path + "/public/images/generate/" + name;
    var url = "/images/generate/" + name;


    gif.text_gif(path, text, font_size, delay, width, height, repeat);

    res.json({ "result": "true", "url": url })
});

module.exports = router;

function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}
