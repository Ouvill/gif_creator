document.addEventListener("DOMContentLoaded", function () {
    dst_canvas = document.getElementById("DstCanvas");
    dst_ctx = dst_canvas.getContext("2d");

});

function save() {
    var textarea = document.getElementById("shi_textarea");
    var text = textarea.value;

    var font_size = document.getElementById("font_size").value;
    console.log(text);

    var post_url = "/api/create_gif";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', post_url);
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    var json = JSON.stringify({
        "text": text,
        "font_size": font_size,
        "delay": 300,
        "repeat": 0
    });
    xhr.send(json);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            console.log("res");
            console.dir(res);

            var gif_diff = document.getElementById("gif_div");
            while (gif_diff.firstChild) gif_diff.removeChild(gif_diff.firstChild);
            var img = document.createElement("img");
            img.setAttribute("src", res.url + '?' + new Date().getTime());
            gif_diff.appendChild(img);
        }
    }
}
