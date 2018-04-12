var fs = require('fs');
var path = require('path');
var GIFEncoder = require('gifencoder');
var Canvas = require('canvas')
    , Image = Canvas.Image
var create = {
    text_gif: function (dst_path, text, font_size, delay, width, height, not_repeat, font_family, font_align, font_color, background_color) {
        var encoder = new GIFEncoder(width, height);

        var gifWriteStream = fs.createWriteStream(dst_path);
        // stream the results as they are available into myanimated.gif
        encoder.createReadStream().pipe(fs.createWriteStream(dst_path));
        encoder.start();
        if (not_repeat == -1) {
            encoder.setRepeat(-1);
        } else {
            encoder.setRepeat(0);
        }   // 0 for repeat, -1 for no-repeat
        encoder.setDelay(delay);  // frame delay in ms
        encoder.setQuality(10); // image quality. 10 is default.

        var del_last_space = text.replace(/[\r\n ]+$/g, "");
        var lines = del_last_space.split(/\r\n|\n|\r/g);

        // 背景
        var background_canvas = new Canvas(width, height);
        var background_ctx = background_canvas.getContext('2d');
        background_ctx.fillStyle = '#' + background_color;
        background_ctx.fillRect(0, 0, width, height);

        var text_canvas = new Canvas(width, height);
        var text_ctx = text_canvas.getContext('2d');

        var output_canvas = new Canvas(width, height);
        var output_ctx = output_canvas.getContext('2d');

        for (var i = 0; i < lines.length; i++) {

            create_onepage(text_ctx, lines[i], font_size, width, height, font_family, font_align, font_color, background_color);

            output_ctx.drawImage(background_canvas, 0, 0);
            output_ctx.drawImage(text_canvas, 0, 0);

            encoder.addFrame(output_ctx);
        }

        encoder.finish;

    }
}

module.exports = create;

function create_onepage(ctx, text, font_size, width, height, font_family, font_align, font_color, background_color) {
    // use node-canvas

    ctx.clearRect(0, 0, width, height);

    var margin = 2 * font_size
    var cw = width - margin; // 引いているのはマージン

    // ctx.fillStyle = 'rgba(78,78,78,1.0)';
    ctx.fillStyle = '#' + font_color;

    // footer
    ctx.font = (12 + 'px "' + font_family + '"');
    ctx.textAlign = "center";
    ctx.fillText("フラッシュGifメーカー", width / 2, height - 10);
    ctx.font = (font_size + 'px "' + font_family + '"');

    // font align
    ctx.textAlign = font_align;
    var start_x;
    if (font_align == "center") {
        start_x = width / 2;
    } else if (font_align == "left") {
        start_x = font_size;
    } else if (font_align == "right") {
        start_x = width - font_size;
    }


    // 行数を測る
    var lines = [];
    var linenum = 0;
    var line = ""
    var char_array = text.split("");
    for (var i = 0; i < char_array.length; i++) {
        line += char_array[i];
        var text_width = ctx.measureText(line).width;
        if (cw < text_width) {
            lines[linenum] = line;
            line = "";
            linenum++;
        }
    }
    lines.push(line);

    //描写
    var start_height = (height + (2 - lines.length) * font_size) / 2;
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], start_x, start_height);
        start_height += font_size;
    }
    return ctx;
}

function get_drow_height(context, width, height) {
    var pixels = context.getImageData(0, 0, width, height);
    var data = pixels.data;
    var height = 0;
    var currentRow = -1;
    for (var i = 0, len = data.length; i < len; i += 4) {
        var r = data[i], g = data[i + 1], b = data[i + 2], alpha = data[i + 3];
        if (alpha > 0) {
            var row = Math.floor((i / 4) / width);
            if (row > currentRow) {
                currentRow = row;
                height++;
            }
        }
    }
    return height;
}

function draw_background(ctx, width, height) {
    var img = new Image();
    img.src = process.env.NODE_PATH + '/utils/texture.jpg';
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
}

var fonts = {
    IPAexGothic: "IPAexGothic",
    IPAexMincho: "IPAexMincho",
    HannariMincho: "HannariMincho",
    KokoroMinchoutai: "KokoroMinchoutai",
    HarenosoraMincho: "HarenosoraMincho",
    timemachine_wa: "timemachine wa"
}
