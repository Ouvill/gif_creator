document.addEventListener("DOMContentLoaded", function () {
    dst_canvas = document.getElementById("DstCanvas");
    dst_ctx = dst_canvas.getContext("2d");

});

function save() {
    var textarea = document.getElementById("shi_textarea");
    var text = textarea.value;

    var post_url = "/api/create_gif";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', post_url);
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    var json = JSON.stringify({
        "text": text,
        "font_size": 42,
        "delay": 300,
        "repeat": 0
    });
    xhr.send(json);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            console.log("res");
            console.dir(res);
        }
    }
}
