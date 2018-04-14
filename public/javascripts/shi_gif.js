document.addEventListener("DOMContentLoaded", function () {

    let textarea = document.getElementById("shi_textarea");
    textarea.addEventListener("keydown", function (event) {
        if (event.ctrlKey) {
            if (event.key == "Enter") {
                save();
            }
        }
    });

    let font_color = document.getElementById("font_color");
    let complementary_color_div = document.getElementById("complementary_color");
    let triad_color_1_div = document.getElementById("triad_color_1");
    let triad_color_2_div = document.getElementById("triad_color_2");

    font_color.addEventListener("change", function () {
        let complementary_color = get_complementary_color(this.value);
        console.log("rgb(" + complementary_color.join(',') + ")");
        complementary_color_div.style.backgroundColor = "rgb(" + complementary_color.join(',') + ")";
        complementary_color_div.rgb = complementary_color;

        //トライアド
        let triad_color= get_triad(this.value);
        console.log("triad_color_1");
        console.dir(triad_color);
        triad_color_1_div.style.backgroundColor = "rgb(" + triad_color[0].join(',') + ")";
        triad_color_1_div.rgb = triad_color[0];

        triad_color_2_div.style.backgroundColor = "rgb(" + triad_color[1].join(',') + ")";
        triad_color_2_div.rgb = triad_color[1];
    });

    triad_color_1_div.addEventListener("click", () => {
        let background_color = document.getElementById("background_color");
        background_color.style.backgroundColor = "rgb(" + triad_color_1_div.rgb.join(',') + ")";
        background_color.value = rgb2color(triad_color_1_div.rgb[0], triad_color_1_div.rgb[1], triad_color_1_div.rgb[2]);
    });

    triad_color_2_div.addEventListener("click", () => {
        let background_color = document.getElementById("background_color");
        background_color.style.backgroundColor = "rgb(" + triad_color_2_div.rgb.join(',') + ")";
        background_color.value = rgb2color(triad_color_2_div.rgb[0], triad_color_2_div.rgb[1], triad_color_2_div.rgb[2]);
    });

    //補色
    complementary_color_div.addEventListener("click", () => {
        let background_color = document.getElementById("background_color");
        background_color.style.backgroundColor = "rgb(" + complementary_color_div.rgb.join(',') + ")";
        background_color.value = rgb2color(complementary_color_div.rgb[0], complementary_color_div.rgb[1], complementary_color_div.rgb[2]);

    })
});

let rgb2color = (r, g, b) => {
    let toHex = (value) => {
        let hex = value.toString(16);
        if (hex.length == 1) {
            hex = "0" + hex;
        }
        return hex;
    }

    let R = toHex(r);
    let G = toHex(g);
    let B = toHex(b);

    return (R + G + B).toUpperCase();
}


let get_triad = (rgb) => {
    hsv = rgb2hsv(rgb);

    console.log("hsv");
    console.dir(hsv);
    let triad_1 = [];
    let triad_2 = [];

    triad_1[0] = hsv[0] + 120;
    if (triad_1[0] > 360) {
        triad_1[0] = triad_1[0] - Math.floor(triad_1[0] / 360) * 360;
    }
    triad_1[1] = hsv[1];
    triad_1[2] = hsv[2];

    triad_2[0] = hsv[0] + 240;
    if (triad_2[0] > 360) {
        triad_2[0] = triad_2[0] - Math.floor(triad_2[0] / 360) * 360;
    }
    triad_2[1] = hsv[1];
    triad_2[2] = hsv[2];

    let rgb_triad_1 = hsv2rgb(triad_1[0], triad_1[1], triad_1[2]);
    let rgb_triad_2 = hsv2rgb(triad_2[0], triad_2[1], triad_2[2]);

    console.log(triad_1);
    console.dir(triad_1);

    return [rgb_triad_1, rgb_triad_2];
}

let rgb2hsv = (rgb) => {
    let color = [];
    if (rgb.length == 6) {
        let hex = [
            rgb.substr(0, 2),
            rgb.substr(2, 2),
            rgb.substr(4, 2)
        ]

        color = {
            r: parseInt(hex[0], 16) / 255,
            g: parseInt(hex[1], 16) / 255,
            b: parseInt(hex[2], 16) / 255
        }
    } else if (rgb.length == 3) {
        color = {
            r: rgb[0] / 255,
            g:rgb[1] / 255,
            b:rgb[2] / 255
        }
    }

    let array = [ color.r, color.g ,color.b ]
    let max = Math.max.apply(null, array);
    let min = Math.min.apply(null, array);
    let diff = max - min

    let hsv = {
        h: 0,
        s: 0,
        v: 0
    }
    switch (min) {
        case max:
            hsv.h = 0;
            break;
        case color.r:
            hsv.h = 60 * (color.b - color.g) / diff + 180;
            break;
        case color.g:
            hsv.h = 60 * (color.r - color.b) / diff + 300;
            break;
        case color.b:
            hsv.h = 60 * (color.g - color.r) / diff + 60;
            break;
    }

    hsv.v = max;
    hsv.s = diff / max;

    return [hsv.h, hsv.s, hsv.v];
}

let hsv2rgb = (H, S, V) => {
    //https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

    var C = V * S;
    var Hp = H / 60;
    var X = C * (1 - Math.abs(Hp % 2 - 1));

    var R, G, B;
    if (0 <= Hp && Hp < 1) { [R, G, B] = [C, X, 0] };
    if (1 <= Hp && Hp < 2) { [R, G, B] = [X, C, 0] };
    if (2 <= Hp && Hp < 3) { [R, G, B] = [0, C, X] };
    if (3 <= Hp && Hp < 4) { [R, G, B] = [0, X, C] };
    if (4 <= Hp && Hp < 5) { [R, G, B] = [X, 0, C] };
    if (5 <= Hp && Hp < 6) { [R, G, B] = [C, 0, X] };

    var m = V - C;
    [R, G, B] = [R + m, G + m, B + m];

    R = Math.floor(R * 255);
    G = Math.floor(G * 255);
    B = Math.floor(B * 255);

    console.log("R:" + R);
    console.log("G:" + G);
    console.log("B:" + B);

    return [R, G, B];
}

let get_complementary_color = (font_color) => {
    let origin_color = document.getElementById("font_color").value;
    let hex = [
        origin_color.substr(0, 2),
        origin_color.substr(2, 2),
        origin_color.substr(4, 2)
    ]

    let color = [
        parseInt(hex[0], 16),
        parseInt(hex[1], 16),
        parseInt(hex[2], 16)
    ]

    let max = Math.max.apply(null, color);
    let min = Math.min.apply(null, color);

    let maxmin = max + min

    complementary = [
        maxmin - color[0],
        maxmin - color[1],
        maxmin - color[2]
    ]
    return complementary;
}



function save() {
    let textarea = document.getElementById("shi_textarea");
    let text = textarea.value;
    if (text == "") {
        text = "フラッシュGifメーカーは\nテキストボックスに\n文字を入力するだけで\n文字がパッパッと映る\nGifアニメーションを\n作成できる\nサービスです"
    }

    let font_size = document.getElementById("font_size").value;
    let delay = document.getElementById("delay").value;
    let repeat = document.getElementById("repeat").checked;
    repeat ? repeat = 0 : repeat = -1;
    let high_resolution = document.getElementById("high_resolution").checked;
    let multiline = document.getElementById("multiline").checked;
    let del_last_space = document.getElementById("del_last_space").checked;
    let transparent = document.getElementById("transparent").checked;
    let font_family = document.getElementById("font_family").value;
    let font_color = document.getElementById("font_color").value;
    let background_color = document.getElementById("background_color").value;
    let font_align = document.getElementById("font_align").font_align.value;
    let background_img_id = document.getElementById("background_form").background_img.value

    console.log("font_align" + font_align)

    let post_url = "/api/create_gif";

    let xhr = new XMLHttpRequest();
    xhr.open('POST', post_url);
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    let json = JSON.stringify({
        "text": text,
        "font_size": font_size,
        "delay": delay,
        "repeat": repeat,
        "font_family": font_family,
        "font_color": font_color,
        "background_color": background_color,
        "font_align": font_align,
        "background_img_id": background_img_id,
        "high_resolution": high_resolution,
        "multiline": multiline,
        "del_last_space": del_last_space,
        "transparent": transparent
    });

    let generate_btn = document.getElementsByClassName("generate_btn");
    for (let i = 0; i < generate_btn.length; i++) {
        generate_btn[i].setAttribute("class", "btn btn-primary row my-2 generate_btn disabled");
    }
    xhr.send(json);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            console.log("res");
            console.dir(res);

            let gif_image = document.getElementById("gif_image");
            gif_image.setAttribute("src", res.url + '?' + new Date().getTime());

            let download_link = document.getElementById("download_btn");
            download_link.setAttribute("href", res.download_url);
            download_link.setAttribute("class", "btn btn-primary my-2");

            for (let i = 0; i < generate_btn.length; i++) {
                generate_btn[i].setAttribute("class", "btn btn-primary row my-2 generate_btn");
            }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            alert("なんかエラーっぽい。しばらくしたら回復するかもしれないし……回復しないかもしれない");
        }
    }
}
