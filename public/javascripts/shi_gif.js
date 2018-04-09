document.addEventListener("DOMContentLoaded", function () {

});

function save() {
    var textarea = document.getElementById("shi_textarea");
    var text = textarea.value;

    var font_size = document.getElementById("font_size").value;
    var delay = document.getElementById("delay").value;
    var repeat = document.getElementById("repeat").checked;

    repeat ? repeat = 0 : repeat = -1;

    var post_url = "/api/create_gif";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', post_url);
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    var json = JSON.stringify({
        "text": text,
        "font_size": font_size,
        "delay": delay,
        "repeat": repeat
    });
    xhr.send(json);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            console.log("res");
            console.dir(res);

            var gif_div = document.getElementById("gif_div");
            var gif_frame = document.createElement("div");
            gif_frame.setAttribute("class", "text-center center-block");
            while (gif_div.firstChild) gif_div.removeChild(gif_div.firstChild);
            var iframe = document.createElement("embed");
            iframe.setAttribute("src", res.url + '?' + new Date().getTime());
            iframe.setAttribute("class", "col-12 col-md-8")
            gif_frame.appendChild(iframe);
            gif_div.appendChild(gif_frame);

            var download_div = document.createElement("div");
            download_div.setAttribute("class", "text-center center-block");
            var download_link = document.createElement("a")
            download_link.setAttribute("href", res.url);
            download_link.setAttribute("download", "");
            download_link.setAttribute("class", "btn btn-primary my-2");
            var link_text = document.createTextNode("Gif をダウンロードする");
            download_link.appendChild(link_text);
            download_div.appendChild(download_link);
            gif_div.appendChild(download_div);

        }
    }
}
