/************************ 对象 ****************************/
// 对象可以通过字面量来创建
var ninja = {};
// 对象可以赋值给变量、数组项、或其他对象的属性
var ninja = {};

var ninjaArray = [];
ninjaArray.push({});

ninja.data = {};

// 对象可以作为参数传递给函数
function hide (ninja) {
    ninja.visibility = false;
}
hide({});

// 对象可以作为函数的返回值
function returnNewNinja() {
    return {};
}

// 对象能够具有动态创建和分配的属性
var ninja = {};
ninja.name = "Hanzo";



/************************ 函数 ****************************/
// 函数可通过字面量来创建
function ninjaFunction () {};

// 函数可以赋值给变量、数组项、或其他对象的属性
var ninjaFunction = function () {};

var ninjaArray = [];
ninjaArray.push(function () {});

ninja.data = function () {};

// 函数可以作为函数的参数来传递
function call (ninjaFunction) {
    ninjaFunction();
}
call(function () {});

// 函数可以作为函数的返回值
function returnNewNinjaFunction () {
    return function () {};
}

// 函数具有动态创建和分配的属性
var ninjaFunction = function () {};
ninjaFunction.ninja = "Hanzo";
