// =====================================================================
// Utils--addLoadEvent
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


// Utils--insertAfter
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
// =====================================================================
// 创建一个 img 元素和一个 p 元素
function preparePlaceholder () {
    // 检查浏览器
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    // img 元素节点
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    // p 元素节点
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image.");
    description.appendChild(desctext);
    // 追加到 body 元素节点最后--[V1]
    // document.getElementsByTagName("body")[0].appendChild(placeholder);
    // document.getElementsByTagName("body")[0].appendChild(description);
    // document.body.appendChild(placeholder);
    // document.body.appendChild(description);
    // 插入到 ul 元素节点之前--[V2]
    // var gallery = document.getElementById("imagegallery");
    // gallery.parentNode.insertBefore(placeholder, gallery);
    // gallery.parentNode.insertBefore(description, gallery);
    // 插入到 ul 元素节点之后--[V3]
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}


// 处理事件
function prepareGallery() {
    // 检查当前浏览器
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
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


// 把占位符图片切换为目标图片
function showPic(whichpic) {
    // 检查 placeholder 是否存在
    if (!document.getElementById("placeholder")) return false;
    // 把占位符图片替换为想要查看的图片
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    
    // 检查 description 是否存在
    if (!document.getElementById("description")) return false;
    // 在图片连接被点击时，动态地用图片的 title 替换掉图片说明
    var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return true;
}


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
