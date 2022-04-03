// ================================================
// 回调函数
// ================================================
var text = "Domo arigato!";
console.log("Before defining functions");

// 函数定义，参数为一个回调函数，其函数体内会立即调用该回调函数
function useless(ninjaCallback) {
    console.log("In useless function");
    return ninjaCallback();
}

// 简单的函数定义，金范慧慧一个全局变量
function getText() {
    console.log("In getText function");
    return text;
}

// 把 getText 作为回调函数传入上面的 useless 函数
console.log("Before making all the calls");
if (useless(getText) == text) {
    console.log("The useless function works! " + text);
}
console.log("After the calls have been made");


// ================================================
// 排序
// ================================================
const values = [0, 3, 2, 5, 7, 4, 8, 1];
values.sort(function (value1, value2) {
    return value2 - value1;
});
console.log(values);

values.sort(function (value1, value2) {
    return value1 - value2;
});
console.log(values);
