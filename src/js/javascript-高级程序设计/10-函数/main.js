"use strict";


// -------------------------------
// length
// -------------------------------
function sayName(name) {
    console.log(name);
}

function sum(num1, num2) {
    return num1 + num2;
}

function sayHi() {
    console.log("hi");
}

console.log(sayName.length);
console.log(sum.length);
console.log(sayHi.length);

console.log(sayName.toLocaleString());
console.log(sayName.toString());
console.log(sayName.valueOf());


// -------------------------------
// apply
// -------------------------------
function sum(num1, num2) {
    return num1 + num2;
}

function callSum1(num1, num2) {
    return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
}

console.log(callSum1(10, 10));
console.log(callSum2(10, 10));


// -------------------------------
// call
// -------------------------------
function sum(num1, num2) {
    return num1 + num2;
}

function callSum(num1, num2) {
    return sum.call(this, num1, num2);
}

console.log(callSum(10, 10));

// -------------------------------
// apply, call
// -------------------------------
// window.color = 'red';

// let o = {
//   color: 'blue'
// };

// function sayColor() {
//     console.log(this.color);
// }

// sayColor();
// sayColor.call(this);
// sayColor.call(window);
// sayColor.call(o);

// -------------------------------
// bind
// -------------------------------
// window.color = "red";

// var o = {
//     color: 'blue'
// };

// function sayColor() {
//     console.log(this.color);
// }

// let objectSayColor = sayColor.bind(o);
// objectSayColor();


