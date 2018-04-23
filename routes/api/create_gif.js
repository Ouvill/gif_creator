var express = require('express');
var router = express.Router();
var gif = require('../../utils/create_gif');
var escape = require('../../utils/string_escape');
var connection = require('../../utils/mysqlConnection');
var set_id = require('../../utils/set_id');
var img_list = require('../../utils/img_list');

/* GET home page. */
router.post('/', function (req, res, next) {
    var user_id = set_id(req, res);
    var root_path = process.env.NODE_PATH

    var text = req.body.text;
    var font_size = Number(req.body.font_size);
    var delay = Number(req.body.delay);
    var repeat = Number(req.body.repeat);
    var font_family = escape.escape(req.body.font_family);
    var font_align = escape.escape(req.body.font_align);
    var font_color = req.body.font_color;
    var background_color = req.body.background_color;
    var background_img_id = req.body.background_img_id;
    var transparent = req.body.transparent;
    var high_resolution = req.body.high_resolution;
    var multiline = req.body.multiline;
    var del_last_space = req.body.del_last_space;
    var credit = req.body.credit;

    var width = 512;
    var height = 256;

    if (high_resolution) {
        font_size = 2 * font_size;
        width = 1024;
        height = 512;
    }

    if (del_last_space) {
        text = text.replace(/[\r\n ]+$/g, "");
    }

    var name = user_id + ".gif";
    var path = root_path + "/public/images/generate/row/" + name;

    var url = "/images/generate/row/" + name;
    var download_url = "/download/" + user_id;

    console.dir(req.body);

    console.log("userid" + user_id);
    //background
    let background_img_path = "";
    console.log("background_id:" + background_img_id);
    if (background_img_id == -1) {
        background_img_path = process.env.NODE_PATH + "/public/images/uploads/" + user_id;
    } else if (background_img_id == 0) {

    } else {
        background_img_path = process.env.NODE_PATH + "/public/images/backgrounds/" + img_list[background_img_id].filename;

    }
    // gif generate
    gif.multiline_gif(path, text, font_size, delay, width, height, repeat, font_family, font_align, font_color, background_color, background_img_path, transparent, multiline, credit);
        // await optimize.async(path, optimize_path);

    // res
    res.json({ "result": "true", "url": url, "download_url": download_url });
});

module.exports = router;
