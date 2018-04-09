var fs = require('fs');
var GIFEncoder = require('gifencoder');
var Canvas = require('canvas')
    , Image = Canvas.Image
var create = {
    text_gif: function (path, text, font_size, delay, width, height, not_repeat) {
        var encoder = new GIFEncoder(width, height);
        // stream the results as they are available into myanimated.gif
        encoder.createReadStream().pipe(fs.createWriteStream(path));
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

        for (var i = 0; i < lines.length; i++) {

            var tmp_ctx = create_onepage(lines[i], font_size, width, height, -1);
            var text_height = get_drow_height(tmp_ctx, width, height);
            var one_ctx = create_onepage(lines[i], font_size, width, height, text_height);

            encoder.addFrame(one_ctx);
        }

        encoder.finish;
    }
}

module.exports = create;

function create_onepage(text, font_size, width, height, text_height) {
    // use node-canvas
    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');

    if (text_height != -1) {
        // 背景
        ctx.fillStyle = 'rgba(255,255,255,1.0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    var margin = 2 * font_size
    var cw = canvas.width - margin; // 引いているのはマージン

    ctx.fillStyle = 'rgba(78,78,78,1.0)';
    ctx.textAlign = "center"
    ctx.font = (font_size + 'px IPAexMincho');

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

    // var text_height = font_size * lines.length;
    var start_height = (height - text_height + 2 * font_size) / 2;
    // var start_height = canvas.height;
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], canvas.width / 2, start_height);
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
