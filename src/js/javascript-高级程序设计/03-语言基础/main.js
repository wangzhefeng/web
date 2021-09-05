
let o1 = new Object();
let o2 = new Object();
o2.name = "wangzf";
console.log(o2.constructor);
console.log(o2.hasOwnProperty("name"));
console.log(o2.isPrototypeOf(o1));
console.log(o2.propertyIsEnumerable("name"));
console.log(o2.toLocaleString());
console.log(o2.toString());
console.log(o2.valueOf("name"));
