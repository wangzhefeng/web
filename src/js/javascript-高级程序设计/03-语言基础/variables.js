"use strict";


// function foo() {
//     console.log("age:", age);
//     var age = 26;
// }

// function foo() {
//     var age;
//     age = 26;
//     console.log("age:", age);
// }

// foo();




let name = "Nicholas";
let age = 26;


// 假设脚本不确定页面中是否已经声明了同名变量, 那么可以假设还没有声明过
if (typeof name === "undefined") {
    let name = "Matt"; // name 被限制在 if {} 块作用域内
}
name = "Matt";         // 因此这个赋值形同全局赋值，等价于 var name = "Matt"; 会报错
console.log(name);

try {
    console.log(age);  // 如果 age 没有声明过, 则会报错
}
catch(error) {
    let age;           // age 被限制在 catch {} 作用域内
}
age = 25;              // 因此这个赋值形同全局赋值，等价于 var name = 26; 会报错
console.log(age);
