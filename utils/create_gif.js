var fs = require('fs');
var path = require('path');
var GIFEncoder = require('gifencoder');
var Canvas = require('canvas')
    , Image = Canvas.Image
var img_list = require('./img_list');

const create = {
    multiline_gif: function (dst_path, text, font_size, delay, width, height, not_repeat, font_family, font_align, font_color, background_color, background_img_id, transparent, multiline, credit) {
        let encoder = new GIFEncoder(width, height);

        let gifWriteStream = fs.createWriteStream(dst_path);
        // stream the results as they are available into myanimated.gif
        encoder.createReadStream().pipe(gifWriteStream);
        encoder.start();
        if (not_repeat == -1) {
            encoder.setRepeat(-1);
        } else {
            encoder.setRepeat(0);
        }   // 0 for repeat, -1 for no-repeat
        encoder.setDelay(delay);  // frame delay in ms
        encoder.setQuality(10); // image quality. 10 is default.


        // 背景
        let background_canvas = new Canvas(width, height);
        let background_ctx = background_canvas.getContext('2d');
        background_ctx.fillStyle = '#' + background_color;
        background_ctx.fillRect(0, 0, width, height);
        console.log("background_img_id:" + background_img_id);
        if (transparent) {
            background_ctx.globalAlpha = 0.5;
        }
        draw_background(background_ctx, background_img_id, width, height);


        // credit
        let credit_canvas = new Canvas(width, height);
        let credit_ctx = credit_canvas.getContext('2d');
        credit_ctx.font = ((font_size * 0.7) + 'px "' + font_family + '"');
        credit_ctx.fillStyle = '#' + font_color;
        if (credit.position == "left_top") {
            credit_ctx.fillText(credit.text[0], 2 * font_size, font_size * 1.5);
            credit_ctx.fillText(credit.text[1], 2 * font_size, font_size * 2.2);
        } else if (credit.position == "center_top") {
            credit_ctx.textAlign = "center";
            credit_ctx.fillText(credit.text[0], width / 2, font_size * 1.5);
            credit_ctx.fillText(credit.text[1], width / 2, font_size * 2.2);
        } else if (credit.position == "right_top") {
            credit_ctx.textAlign = "right";
            credit_ctx.fillText(credit.text[0], width - 2 * font_size, font_size * 1.5);
            credit_ctx.fillText(credit.text[1], width - 2 * font_size, font_size * 2.2);
        }


        // 本編
        let text_canvas = new Canvas(width, height);
        let text_ctx = text_canvas.getContext('2d');

        let output_canvas = new Canvas(width, height);
        let output_ctx = output_canvas.getContext('2d');

        let paragraph_list = [];
        if (multiline) {
            let reg = new RegExp("\n?[=＝]{3,}\n?", "g")
            paragraph_list = text.split(reg);
        } else {
            paragraph_list = text.split(/\r\n|\n|\r/g);
        }
        console.dir(paragraph_list);
        for (let i = 0; i < paragraph_list.length; i++) {

            create_onepage(text_ctx, paragraph_list[i], font_size, width, height, font_family, font_align, font_color, background_color);

            output_ctx.drawImage(background_canvas, 0, 0);
            output_ctx.drawImage(credit_canvas, 0, 0);
            output_ctx.drawImage(text_canvas, 0, 0);

            encoder.addFrame(output_ctx);
        }

        encoder.finish;

        background_canvas = null;
        text_canvas = null;
        output_canvas = null;
        encoder = null;


    }

}

module.exports = create;

function create_onepage(ctx, text, font_size, width, height, font_family, font_align, font_color, background_color) {
    // use node-canvas

    ctx.clearRect(0, 0, width, height);

    let margin = 4 * font_size
    let cw = width - margin; // 引いているのはマージン

    // ctx.fillStyle = 'rgba(78,78,78,1.0)';
    ctx.fillStyle = '#' + font_color;

    // footer
    ctx.font = (12 + 'px "' + font_family + '"');
    ctx.textAlign = "center";
    ctx.fillText("フラッシュGifメーカー", width / 2, height - 10);
    ctx.font = (font_size + 'px "' + font_family + '"');

    // font align
    ctx.textAlign = font_align;
    let start_x;
    if (font_align == "center") {
        start_x = width / 2;
    } else if (font_align == "left") {
        start_x = font_size;
    } else if (font_align == "right") {
        start_x = width - font_size;
    }


    // 行数を測る
    let line_list = [];
    let linenum = 0;
    let line = ""
    let char_array = text.split("");
    for (let i = 0; i < char_array.length; i++) {
        if (char_array[i] == "\n") {
            line_list[linenum] = line;
            line = ""
            linenum++;
        } else {
            line += char_array[i];
            if (i < char_array.length - 1) {
                let text_width = ctx.measureText(line).width;
                if (cw < text_width) {
                    line_list[linenum] = line;
                    line = "";
                    linenum++;
                }
            }
        }
    }

    line_list.push(line);

    //描写
    let start_height = (height + (2 - line_list.length) * font_size) / 2;
    for (let i = 0; i < line_list.length; i++) {
        ctx.fillText(line_list[i], start_x, start_height);
        start_height += font_size;
    }
    return ctx;
}

function get_drow_height(context, width, height) {
    let pixels = context.getImageData(0, 0, width, height);
    let data = pixels.data;
    let height = 0;
    let currentRow = -1;
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

function draw_background(ctx, img_id, width, height) {
    let img = new Image();
    let sh;
    let sw;


    img.onload = function () {
        if (img.width > 2 * img.height) {
            sh = img.height;
            sw = 2 * img.height;
        } else {
            sh = img.width / 2;
            sw = img.width;
        }

        ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, width, height);

        img = null;
    }
    if (img_id != 0) {
        img.src = process.env.NODE_PATH + "/public/images/backgrounds/" + img_list[img_id].filename;
    }
}

let fonts = {
    IPAexGothic: "IPAexGothic",
    IPAexMincho: "IPAexMincho",
    HannariMincho: "HannariMincho",
    KokoroMinchoutai: "KokoroMinchoutai",
    HarenosoraMincho: "HarenosoraMincho",
    timemachine_wa: "timemachine wa"
}
