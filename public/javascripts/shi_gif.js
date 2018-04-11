document.addEventListener("DOMContentLoaded", function () {

    var textarea = document.getElementById("shi_textarea");
    textarea.addEventListener("keydown", function (event) {
        if (event.ctrlKey) {
            if (event.key == "Enter") {
                save();
            }
        }
    });
});

function save() {
    var textarea = document.getElementById("shi_textarea");
    var text = textarea.value;
    if (text == "") {
        text = "フラッシュGifメーカーとは\nテキストボックスに\n文字を入力するだけで\n文字がパッパッと切り替わる\nGifアニメーションを\n作成できる\nサービスです"
    }

    var font_size = document.getElementById("font_size").value;
    var delay = document.getElementById("delay").value;
    var repeat = document.getElementById("repeat").checked;
    repeat ? repeat = 0 : repeat = -1;
    var font_family = document.getElementById("font_family").value;
    var font_color = document.getElementById("font_color").value;
    var background_color = document.getElementById("background_color").value;


    var font_align = document.getElementById("font_align").font_align.value;
    // var font_align_radios = document.getElementsByName("font_align");
    // var font_align;
    // for (var i = 0; i < font_align_radios; i++) {
    //     console.log("font_align_radios" + font_align_radios[i].value);
    //     if (font_align_radios[i].checked) {
    //         font_align = font_align_radios[i].value;
    //         break;
    //     }
    // }
    console.log("font_align" +font_align)

    var post_url = "/api/create_gif";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', post_url);
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    var json = JSON.stringify({
        "text": text,
        "font_size": font_size,
        "delay": delay,
        "repeat": repeat,
        "font_family": font_family,
        "font_color": font_color,
        "background_color": background_color,
        "font_align": font_align
    });

    var generate_btn = document.getElementsByClassName("generate_btn");
    for (var i = 0; i < generate_btn.length; i++) {
        generate_btn[i].setAttribute("class", "btn btn-primary row my-2 generate_btn disabled");
    }
    xhr.send(json);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            console.log("res");
            console.dir(res);

            var gif_image = document.getElementById("gif_image");
            gif_image.setAttribute("src", res.url + '?' + new Date().getTime());

            var download_link = document.getElementById("download_btn");
            download_link.setAttribute("href", res.download_url);
            download_link.setAttribute("class", "btn btn-primary my-2");

            for (var i = 0; i < generate_btn.length; i++) {
                generate_btn[i].setAttribute("class", "btn btn-primary row my-2 generate_btn");
            }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            alert("なんかエラーっぽい。しばらくしたら回復するかもしれないし……回復しないかもしれない");
        }
    }
}
