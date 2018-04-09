document.addEventListener("DOMContentLoaded", function () {
    dst_canvas = document.getElementById("DstCanvas");
    dst_ctx = dst_canvas.getContext("2d");

});

function save() {
    var textarea = document.getElementById("shi_textarea");
    var text = textarea.value;
    var del_last_space = text.replace(/[\r\n ]+$/g, "");
    var lines = del_last_space.split(/\r\n|\n|\r/g);

    var font_size = 12;
    var margin = 2 * font_size
    var text_max_width = canvas.width - margin; // 引いているのはマージン
    ctx.font = (font_size + 'px IPAexMincho');
    ctx.textAlign = "left"

    var gif = new GIF({
        workers: 2,
        quality: 10
    });

    for (var i = 0; i < line.length; i++) {
        // 背景 白で塗りつぶす
        ctx.fillStyle = 'rgba(255,255,255,1.0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //文字
        ctx.fillText(line, 0, 0, text_max_width);
        // or a canvas element
        gif.addFrame(canvas, { delay: 200 });
    }

    gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob));
    });

    gif.render();

}
