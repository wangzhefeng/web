/************************ 对象 ****************************/
// 对象可以通过字面量来创建
var ninja = {};

// 对象可以赋值给变量、数组项、或其他对象的属性
var ninja = {};

// 向数组对象中增加一个新对象
var ninjaArray = [];
ninjaArray.push({});
console.log(ninjaArray);

// 给某个对象的属性赋值为一个新对象
var ninja = {};
ninja.data = {};
console.log(ninja);

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
console.log(ninja);


/************************ 函数 ****************************/
// 函数可通过字面量来创建
function ninjaFunction () {};

// 函数可以赋值给变量、数组项、或其他对象的属性
var ninjaFunction = function () {};

// 向数组中增加一个新函数
var ninjaArray = [];
ninjaArray.push(function () {});
console.log(ninjaArray);

// 给某个对象的属性赋值为一个新函数
var ninja = {};
ninja.data = function () {};
console.log(ninja);

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
console.log(ninjaFunction);
