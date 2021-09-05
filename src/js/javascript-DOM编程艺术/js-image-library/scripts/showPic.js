

function prepareGallery() {
    // 检查当前浏览器是否理解 getElementsByTagName
    if (!document.getElementsByTagName) {
        return false;
    }
    // 检查当前浏览器是否理解 getElementById
    if (!document.getElementById) {
        return false;
    }
    // 检查当前网页是否存在一个 id 为 imagegallery 的元素
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    // 图片库
    var gallery = document.getElementById("imagegallery");
    // 遍历 imagegallery 元素中的所有链接
    var links = gallery.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        links[i].onclick = function () {
            return showPic(this) ? false : true;
        }
        // links[i].onkeypress = links[i].onclick;
    }
}
addLoadEvent(prepareGallery);


function showPic(whichpic) {
    // 检查 placeholder 是否存在
    if (!document.getElementById("placeholder")) return false;
    // 把占位符图片替换为想要查看的图片
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    // 在图片连接被点击时，动态地用图片的 title 替换掉图片说明
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
