

function insertParagraph(text) {
    var str = "<p>";
    str += text;
    str += "</p>";
    document.write(str);
}


// window.onload = function() {
//     var para = document.createElement("p");
//     var info = "nodeName: ";
//     info += para.nodeName;
//     info += " nodeType: ";
//     info += para.nodeType;
//     alert(info);
// }


window.onload = function() {
    // 创建元素节点
    var para = document.createElement("p");
    // 创建文本节点
    var txt1 = document.createTextNode("This is ");
    // 插入文本节点
    para.appendChild(txt1);
    var emphasis = document.createElement("em");
    var txt2 = document.createTextNode("my");
    emphasis.appendChild(txt2);
    para.appendChild(emphasis);
    var txt3 = document.createTextNode(" content.")
    para.appendChild(txt3);
    // 获取 div 元素节点
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
}
