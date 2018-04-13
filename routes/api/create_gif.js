var express = require('express');
var router = express.Router();
var gif = require('../../utils/create_gif');
var escape = require('../../utils/string_escape');
var connection = require('../../utils/mysqlConnection');

/* GET home page. */
router.post('/', function (req, res, next) {
    var user_id;
    if (typeof req.cookies.user_id === 'undefined') {
        user_id = getUniqueStr()
        console.log("set id");
        res.cookie('user_id', user_id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });
    } else {
        user_id = req.cookies.user_id;
    }

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
    var high_resolution = req.body.high_resolution;
    var width = 512;
    var height = 256;

    if (high_resolution) {
        font_size = 2 * font_size;
        width = 1024;
        height = 512;
    }

    var name = user_id + ".gif";
    var path = root_path + "/public/images/generate/row/" + name;

    var url = "/images/generate/row/" + name;
    var download_url = "/download/" + user_id;

    console.dir(req.body);

    // Log
    console.log("data regist");
    connection.query('SELECT * FROM posts', function (err, rows) {
        console.dir(rows);
    });

    connection.query('INSERT INTO flash_gif_maker_db.posts ( text , font_size , delay ,repeat,font_family ) VALUES ( ? , ? , ? , ? , ? )', [text, font_size, delay, repeat, font_family], function (err, results) {
        if (!err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });

    // gif generate
    const gif_create = async () => {
        await gif.text_gif(path, text, font_size, delay, width, height, repeat, font_family, font_align, font_color, background_color, background_img_id);
        // await optimize.async(path, optimize_path);
    }

    gif_create();

    // res
    res.json({ "result": "true", "url": url, "download_url": download_url });
});

module.exports = router;

function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}
