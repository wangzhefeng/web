---
title: JS 变量、作用域、内存
author: 王哲峰
date: '2020-02-01'
slug: js-variable-scope-memory
categories: [js]
tags: [js]
---

# 四、变量、作用域与内存

- JavaScript 变量是松散类型的，而且变量不过就是特定时间点一个特定值的名称而已。
- 由于没有规则定义变量必须包含什么数据类型，变量的值和数据类型在脚本声明周期内可以改变。这样的变量很有意思，很强大，当然也有不少问题。

## 1.原始值与引用值

- ECMAScript 变量可以包含两种不同类型的数据
	- 原始值(primitive value)
		- 最简单的数据
			- Undefined
			- Null
			- Boolean
			- Number
			- String
			- Symbol
		- 保存原始值的变量是**按值(by value)**访问的，因为操作的就是存储在变量中的实际值
	- 引用值(reference value)
		- 由多个值构成的对象
		- 引用值是保存在内存中的对象，JavaScript 不允许直接访问内存位置，因此也就不能直接操作对象所在的内存空间
		- 在操作对象时，实际上操作的是对该对象的**引用(reference)**而非实际的对象本身，为此，保存引用值的变量是**按引用(by reference)**访问的

- 在把一个值赋给变量时，JavaScript 引擎必须确定这个值是原始值还是引用值

### 1.1 动态属性

- 原始值和引用值的定义方式很类似，都是创建一个变量，然后给它赋一个值，但是，在变量保存了这个值之后，可以对这个值做什么，则大有不同
	- 对于引用值而言，可以随时添加、修改和删除其属性和方法
	- 对于原始值，不能有属性，尽管尝试给原始值添加属性不会报错

```js
let person = new Object();
person.name = "Nicholas";
console.log(person.name); // "Nicholas"

let name = "Nicholas";
name.age = 27;
console.log(name.age); // undefined
```

- 原始类型的初始化可以只使用原始字面量形式。如果使用的是 new 关键字，则 JavaScript 会创建一个 Object 类型的实例，但其行为类似原始值

```js
let name1 = "Nicholas";
let name2 = new String("Matt");
name1.age = 27;
name2.age = 26;
console.log(name1.age); // undefined
console.log(name2.age); // 26
console.log(typeof name1); // string
console.log(typeof name2); // object
```

### 1.2 复制值

- 除了存储方式不同，原始值和引用值在通过变量复制时也有所不同。在通过变量把一个原始值复制到另一个变量时，原始值会被复制到新变量的位置

<img src="/Users/zfwang/Library/Application Support/typora-user-images/image-20210412012800208.png" alt="image-20210412012800208" style="zoom:33%;" />

```js
// num1 和 num2 可以独立使用，互不干扰
let num1 = 5;
let num2 = num2;  // num2 = 5, 这个值跟存储在 num1 中的 5 是完全独立的，因为它是那个值的副本
```

- 在把引用值从一个变量赋给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置。区别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象。操作完成后，两个变量实际上指向同一个对象，因此一个对象上面的变化会在另一个对象上反映出来。

<img src="/Users/zfwang/Library/Application Support/typora-user-images/image-20210412012741789.png" alt="image-20210412012741789" style="zoom: 33%;" />

```js
let obj1 = new Object();
let obj2 = obj1;
obj1.name = "Nicholas";
console.log(obj2.name); // "Nicholas"
```

### 1.3 传递参数

- ECMAScript 中所有函数的参数都是按值传递的。这意味着函数外的值会被复制到函数内部的参数中，就像从一个变量复制到另一个变量一样
	- 如果是原始值，那么就跟原始值变量的复制一样
	- 如果是引用值，那么久跟引用值变量的复制一样
- 在按值传递参数时，值会被复制到一个局部变量(即一个命名参数，或者用 ECMAScript 的话说，就是arguments 对象中的一个槽位)
- 在按引用传递参数时，值在内存中的位置会被保存在一个局部变量，这意味着对本地变量的修改会反映到函数外部(这在ECMAScript 中是不可能的)

```js
function addTen(num) {
    num += 10;
    return num;
}

let count = 20;
let result = addTen(count);
console.log(count); // 20
console.log(result); // 30
```

```js
function setName(obj) {
    obj.name = "Nicholas";
}

let person = new Object();
setName(person);
console.log(person.name); // "Nicholas"
```

```js
function setName(obj) {
    obj.name = "Nicholas";
    obj = new Object(); // obj 在函数内部被重写，它变成了一个指向本地对象的指针，这个本地对象在函数执行结束时就被销毁了
    obj.name = "Greg";
}
let person = new Object();
setName(person);
console.log(person.name); // "Nicholas"
```

### 1.4 确定类型

- typeof 操作符最适合用来判断一个变量是否为原始类型。更确切地说，它是判断一个变量是否为字符串、数值、布尔值或 undefined 的最好方式。
	- 如果值是对象或 null，那么 typeof 返回 "object"
	- typeof 虽然对原始值很有用，但他对引用值的用处不大。我们通常不关心一个值是不是对象，而是想知道它是什么类型的对象，为了解决这个问题，ECMAScript 提供了 instanceof 操作符

```js
let s = "Nicholas";   // string
let b = true; 		  // boolean
let i = 22; 	 	  // number
let u; 				  // undefined
let n = null; 	      // object
let o = new Object(); // object

console.log(typeof s); // string
console.log(typeof b); //boolean
console.log(typeof i); // number
console.log(typeof u); // undefined
console.log(typeof n); // object
console.log(typeof o); // object
```

- instanceof 操作符语法如下:
	- 如果变量是给定引用类型(由其原型链决定)的实例，则 instanceof 操作符返回 true
	- 按照定义，所有引用值都是 Object 的实例，因此通过 instanceof 操作符检测任何引用类型值和 Object 构造函数都会返回 true。类似地，如果用 instanceof 检测原始值，则会返回 false，因为原始值不是对象

```js
result = variable instanceof constructor
```

```js
console.log(person instanceof Object);
console.log(colors instanceof Array);
console.log(pattern instanceof RegExp);
```



## 2.执行上下文与作用域

- 执行上下文的概念在 JavaScript 中是颇为重要的。变量或函数的上下文决定了它们可以访问哪些数据，以及它们的行为
- 每个上下文都有一个关联的**变量对象(variable object)**，而这个上下文中定义的所有变量和函数都存在与这个对象上。虽然无法通过代码访问变量对象，但后台处理数据会用到它
	- 全局上下文
		- 根据 ECMAScript 实现的宿主环境，表示全局上下文的对象可能不一样。
		- 在流量器中，全局上下文就是我们常说的 window 对象
			- 通过 var 定义的全局变量和函数都会成为 window 对象的属性和方法
			- 使用 let 和 const 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的
	- 每个函数都有自己的上下文

### 2.1 作用域链增强

### 2.2 变量声明



## 3.垃圾回收

- JavaScript 是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存。在 C 和 C++ 等语言中，跟踪内存使用对开发者来说是个很大的负担，也是很多问题的来源
- JavaScript 为开发者卸下了这个负担，通过自动内存管理内存分配和闲置资源回收。基本思路很简单：
	- (1) 首先，确定哪个变量不会再使用
	- (2) 然后释放它占用的内存。
	- (3) 这个过程是周期性的，即垃圾回收程序每隔一定时间(或者说在代码执行过程中某个预定的收集时间)就会自动运行
-  垃圾回收过程是一个近似且不完美的方案，因为某块内存是否还有用，属于“不可判定的”问题，意味着靠算法是解决不了的
- 垃圾回收程序必须跟踪记录哪个变量还会使用，以及哪个变量不会再使用，以便回收内存。如何标记未使用的变量也许有不同的实现方式。不过，在浏览器的发展史上，用到过两种主要的标记策略：
	- 标记清理
	- 引用计数

### 3.1 标记清理

- JavaScript 最常用的垃圾回收策略是**标记清理(mark-and-sweep)**
	- 当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记
	- 给变量加标记的方式有很多种。比如，当变量进入上下文时，反转某一位；或者可以维护“在上下文中”和“不在上下文中”两个变量列表，可以把变量从一个列表转移到另一个列表。标记过程的实现并不重要，关键是策略
	- 垃圾回收程序运行的时候，会标记内存中存储的所有变量(记住，标记方法有很多种)。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存

### 3.2 引用计数

### 3.3 性能

### 3.4 内存管理

# 五、基本引用类型

- 引用值(或者对象)是某个特定引用类型的实例
	- 在 ECMAScript 中，引用类型是把数据和功能组织到一起的结构，经常被人错误地称作“类”
	- 引用类型有时候也被称为**对象定义**，因为它们描述了自己的对象应有的属性和方法
- 新对象通过使用 new 操作后跟一个**构造函数(constructor)**来构建。构造函数就是用来创建新对象的函数
- ECMAScript 提供了很多的原生引用类型，帮助开发者实现常见的任务
	- Date
	- Regexp
	- Function

## 1.Date

- ECMAScript 的 Date 类型参考了 Java 早期版本中的 java.util.Date。为此，Date 类型将日期 保存为自协调世界时(UTC，Universal Time Coordinated)时间 1970 年 1 月 1 日午夜(零时)至今所 经过的毫秒数。使用这种存储格式，Date 类型可以精确表示 1970 年 1 月 1 日之前及之后 285 616 年的 日期。
- 创建日期对象

```js
// 当前日期和时间
let now = new Date();

let someDate = new Date(Date.parse("May 23, 2019"));
let someDate = new Date("May 23, 2019");
```

### 1.1 继承的方法



### 1.2 日期格式化方法

- Date 类型有几个专门用于格式化日期的方法，它们都返回字符串

<img src="/Users/zfwang/Library/Application Support/typora-user-images/image-20210413001515385.png" alt="image-20210413001515385" style="zoom:50%;" />

### 1.3 日期/时间组件方法

- Date 类型还有直接涉及取得或设置日期值的特定部分

<img src="/Users/zfwang/Library/Application Support/typora-user-images/image-20210413001131754.png" alt="image-20210413001131754" style="zoom: 33%;" />

<img src="/Users/zfwang/Library/Application Support/typora-user-images/image-20210413001221806.png" alt="image-20210413001221806" style="zoom: 33%;" />

## 2.RegExp

### 2.1

### 2.2

### 2.3

### 2.4 模式局限

- \A 和 \Z 锚（分别匹配字符串的开始和末尾）
- 联合及交叉类
- 原子组
- x （忽略空格）匹配模式
- 条件匹配
- 正则表达式注释

## 3.原始值包装类型

- 为了方便操作原始值，ECMAScript 提供了 3 种特殊的引用类型：
	- Boolean
	- Number
	- String
- 这些类型具有引用类型一样的特点，但也具有与各自原始类型对应的特殊行为，每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，从而暴露出操作原始值的各种方法。当在原始值上调用方法时，实际上是以读模式访问的，也就是要从内存中读取变量保存的值。在以读模式访问原始值的任何时候，后台都会执行以下 3 步，这种行为可以让原始值拥有对象的行为：
	- （1）创建一个 Boolean/Number/String 类型的实例；
	- （2）调用实例上的特定方法
	- （3）销毁实例

```js
// JavaScript 代码
let s1 = "some text";
let s2 = s1.substring(2);

// ECMAScript 代码
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;
```

### 3.1 Boolean

- Boolean 是对应布尔值的引用类型。要创建一个 Boolean 对象，就使用 Boolean 构造函数并传入 true 或 false

```js
let booleanObject = new Boolean(true);
```

- Boolean 的实例会重写 valueOf() 方法，返回一个原始值 true 或 false

```js

```

- toString() 方法被调用时也会被覆盖，返回字符串 "true" 或 "false"

```js

```

- Boolean 对象在 ECMAScript 中用得很少，不仅如此，它们还容易引起误会，尤其在布尔表达式中使用 Boolean 对象时

```js
let falseObject = new Boolean(false); // Boolean 对象
let falseValue = false;

let result1 = falseObject && true; // 布尔运算中应该等于 false，可是这个表达式是对 falseObject 对象而不是对它表示的值(false)求值。所有对象在布尔表达式中都会自动转换为 true
let result2 = falseValue && true;

console.log(result1); // true
console.log(result2); // false
```

- Boolean 原始值与引用值有几个区别：

	- 1.typeof 操作符对原始值返回 "boolean"，对引用值返回 "object"
	- 2.Boolean 对象是 Boolean 类型的实例，在使用 instanceof 操作符时返回 true，但对原始值则返回 false

	```js
	console.log(typeof flaseObject); // object
	console.log(typeof falseValue); // boolean
	console.log(falseObject instanceof Boolean); // true
	console.log(falseValue instanceof Boolean); // false
	```

### 3.2 Number

- Number 是对应数值的引用类型。要创建一个 Number 对象，就使用 Number 构造函数并传入一个数值

```js
let numberObject = new Number(10);
```

- Number 类型重写了 valueOf()、toLocaleString()、toString() 方法
	- valueOf 方法返回 Number 对象表示的原始值
	- toLocaleString() 方法返回数值字符串
	- toString() 方法返回数值字符串，并且可以选择地接收一个表示基数的参数，并返回相应基数形式的数值字符串

```js
let num = 10;
console.log(num.toString()); // "10"
console.log(num.toString(2)); // "1010"
console.log(num.toString(8)); // "12"
console.log(num.toString(10)); // "10"
console.log(num.toString(16)); // "a"
```

- Number 类型提供了几个用于将数值格式化为字符串的方法

	- toFixed()：返回包含指定小数点位数的数值字符串，如果数值超过了参数指定的位数，则四舍五入到最近的小数位

	```js
	let num = 10;
	console.log(num.toFixed(2)); // "10.00"
	
	let num = 10.005;
	console.log(num.toFixed(2)); // "10.01"
	```

	- toExponential()：返回以科学计数法（也称指数计数法）表示的数值字符串

	```js
	let num = 10;
	console.log(num.toExponential(1)); // "1.0e+1"
	```

	- toPrecision()：会根据情况返回最合理的输出结果，可能是固定精度，也可能是科学计数法形式

	```js
	let num = 99;
	console.log(num.toPrecision(1)); // "1e+2"
	console.log(num.toPrecision(2)); // "99"
	console.log(num.toPrecision(3)); // "99.0"
	```

- 与 Boolean 对象类似，Number 对象也为数值提供了重要能力。但是，考虑到两者存在同样的潜在 问题，因此并不建议直接实例化 Number 对象

```js
let numberObject = new Number(10);
let numberValue = 10;
console.log(typeof numberObject);	// "object"
console.log(typeof numberValue);	// "number"
console.log(numberObject instanceof Number); // ture
console.log(numberObject instanceof Number); // false
```

- Number.isInteger() 方法
	- ES6 新增了 Number.isInteger() 方法，用于辨别一个数值是否保存整数。有时候，小数位的 0 可能会让人误以为数值是一个浮点数

```js
console.log(Number.isInteger(1)); 	 // true
console.log(Number.isInteger(1.00)); // true
console.log(Number.isInteger(1.01)); // false
```

- Number.isSafeInteger() 方法
	- IEEE 754 数值格式有一个特殊的数值范围，在这个范围内二进制数值可以表示一个整数值。
	- 数值范围从 Number.MIN_SAFE_INTEGER($-2^{53}+1$) 到 Number.MAX_SAFE_INTEGER($2^{52}-1$)
	- 对超出这个范围的数值，即使尝试保存为整数，IEEE 754 编码格式也意味着二进制值会表示一个完全不同的数值
	- 为了鉴别一个整数是否在这个范围内，可以使用 Number.isSafeInteger() 方法

```js
console.log(Number.isSafeInteger(-1 * (2 ** 53)));     // false
console.log(Number.isSafeInteger(-1 * (2 ** 53) + 1)); // ture
console.log(Number.isSafeInteger(2 ** 53)); 	       // false
console.log(Number.isSafeInteger((2 ** 53) - 1));      // true
```

### 3.3 String

- String 是对应字符串的引用类型。要创建一个 String 对象，就使用 String 构造函数并传入一个数值

```js
let stringObject = new String("hello world");
```

- String 对象的方法可以在所有字符串原始值上调用。下面三个继承的方法都返回对象的原始字符串值：
	- valueOf()
	- toLocaleString()
	- toString()

```js
let stringValue = "hello world";
console.log(stringObject.valueOf()); // "hello world"
console.log(stringObject.toLocaleString()); // "hello world"
console.log(stringObject.toString()); // "hello world"
```

- String 对象都有一个 length 属性，表示字符串中字符的数量

```js
let stringValue = "hello world";
console.log(stringValue.length); // "11"
```

- String 类型提供了很多方法来解析和操作字符串

	- （1）JavaScript 字符

		- JavaScript 字符串由 16 位码元(code unit)组成。对多数字符来说，每 16 位码元对应一个字符。换句话说，字符串的 length 属性表示字符串包含多少 16 位码元

		```js
		let message = "abcde";
		console.log(message.length); // 5
		```

		

	- （2）normalize() 方法

	- （3）字符串操作方法

		- 字符串拼接

			- `concat()`：将一个或多个字符串拼接成一个新字符串

			```js
			let stringValue = "hello";
			let result = stringValue.concat(" world");
			console.log(result); // "hello world"
			console.log(stringValue); // "hello"
			```

			```js
			let stringValue = "hello";
			let result = stringValue.concat(" ", "world", "!");
			console.log(result); // "hello world!"
			console.log(stringValue); // "hello"
			```

			- `+`：更常用

			```js
			let result = stringValue + " " + "world" + "!";
			console.log(result);
			```

		- 字符串提取
			- `slice(start[, end])`
			- `substr(start[, end])`
			- `substring(start[, num])`

			```js
			let stringValue = "hello world";
			
			console.log(stringValue.slice(3)); 			// "lo world"
			console.log(stringValue.substring(3)); 		// "lo world"
			console.log(stringValue.substr(3)); 		// "lo world"
			console.log(stringValue.slice(3, 7)); 		// "lo w"
			console.log(stringValue.substring(3, 7)); 	// "low w"
			console.log(stringValue.substr(3, 7)); 		// "lo worl"
			
			// slice 方法将所有负值参数都当成字符串长度加上负参数
			console.log(stringValue.slice(-3));        // "rld"
			console.log(stringValue.slice(stringValue.length + (-3)));
			// substring 方法将所有福参数值都转换为0
			console.log(stringValue.substring(-3));    // "hello world"
			// substr 方法将第一个负参数值当成字符串长度加上改值
			console.log(stringValue.substr(-3)); 	   // "rld"
			
			console.log(stringValue.slice(3, -4)); 	   // "lo w"
			console.log(stringValue.substring(3, -4)); // "hel"
			console.log(stringValue.substr(3, -4));    // "" (empty string)
			```

	- （4）字符串位置方法

		- `indexOf()`
		- `lastIndexOf()`

		```js
		let stringValue = "hello world";
		console.log(stringValue.indexOf("o"));	   // 4
		console.log(stringValue.lastIndexOf("o")); // 7
		
		console.log(stringValue.indexOf("o", 6));     // 7
		console.log(stringValue.lastIndexOf("o", 6)); // 4
		
		let stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
		let positions = new Array();
		let pos = stringValue.indexOf("e");
		
		while(pos > -1) {
		    positions.push(pos);
		    pos = stringValue.indexOf("e", pos + 1);
		} // [3, 24, 32, 35, 52]
		```

	- （5）字符串包含方法

	- （6）trim() 方法

	- （7）repeat() 方法

	- （）

	- （）

	- （）

	- （12）

	- （13）HTML 方法
		
		- 早期的浏览器开发商认为使用 JavaScript 动态生成 HTML 标签是一个需求。因此，早期浏览器扩展了规范，增加了生成 HTML 标签的方法。不过，这些方法基本上已经没有人使用了，因为结果通常不是语义化的标记。

## 4.单例内置对象

- ECMA-262 对内置对象的定义是：**任何由 ECMAScript 实现提供、与宿主环境无关，并在 ECMAScript 程序开始执行时就存在的对象**
	- 这意味着，开发者不用显示地实例化内置对象，因为它们已经实例化好了
	- 常见的内置对象：
		- Object
		- Array
		- String
		- Global
		- Math

### 4.1 Global

- Global 对象是 ECMAScript 中最特别的对象，因为代码不会显式地访问它
- ECMA-262 规定 Global 对象是一种兜底对象，它针对的是不属于任何对象的属性和方法。
- 事实上，不存在全局变量或全局函数这种东西，在全局作用域中定义的变量和函数都会变成 Global 对象的属性
	- isNaN()
	- isFinite()
	- parseInt()
	- parseFloat()
	- encodeURI()
	- encodeURIComponent()
	- decodeURI()
	- decodeURIComponent()
	- eval()

#### 4.1.1 URL 编码方法

#### 4.1.2 eval() 方法

#### 4.1.3 Global 对象属性

#### 4.1.4 window 对象

### 4.2 Math

- ECMAScript 提供了 Math 对象作为保存数学公式、信息和计算的地方。Math 对象提供了一些辅助计算的属性和方法

#### 4.2.1 Math 对象属性

- Math 对象有一些属性，主要用于保存数学中的一些特殊值

<img src="/Users/zfwang/Library/Application Support/typora-user-images/image-20210413213822194.png" alt="image-20210413213822194" style="zoom: 33%;" />

#### 4.2.2 Math.min() 和 Math.max() 方法

- 多个参数取值

```js
let max = Math.max(3, 54, 32, 16);
console.log(max); // 54

let min = Math.min(3, 54, 32, 16);
console.log(min); // 3
```

- 数组取值

```js
let values = [1, 2, 3, 4, 5, 6, 7, 8];
let max = Math.max(...values);
console.log(max); // 8
```

#### 4.2.3 舍入方法

- Math.ceil()
	- 始终向上舍入为最近接的整数
- Math.floor()
	- 始终向下舍入为最接近的整数
- Math.round()
	- 执行四舍五入
- Math.fround()
	- 返回数值最接近的单精度(32)位浮点值表示

#### 4.2.4 Math.random() 方法

- Math.random() 方法返回一个 0~1 范围内的随机数，其中包含 0 但不包含 1。
	- 对于希望显示随机名言或随机新闻的网页，这个方法非常方便

```js
// 从一组整数中随机选择一个数
let num = Math.floor(Math.random() * total_number_of_choices + first_possible_value);
// 从 1~10 范围内随机选择一个数
let num = Math.floor(Math.random() * 10 + 1);
// 从 2~10 范围内随机选择一个数
let num = Math.floor(Math.random() * 9 + 2);
```

#### 4.1.5 其他方法

<img src="/Users/zfwang/Library/Application Support/typora-user-images/image-20210413214548023.png" alt="image-20210413214548023" style="zoom:33%;" />

# 六、集合引用类型

## 1.Object

- Object 是 ECMAScript 中最长用的类型之一，虽然 Object 的实例没有多少功能，但很适合存储在应用程序间交互数据

### 1.1 创建 Object 实例

- （1）使用 new 操作符合 Object 构造函数

```js
le person = new Object();
person.name = "Nicholas";
person.age = 29;
```

- （2）使用**对象字面量**

```js
let person = {
    name: "Nicholas",
    age: 29 // 在最后一个属性后面加上逗号在非常老的浏览器中会导致报错，但所有现代浏览器都支持这种写法
};
```

```js
let person = {
    "name": "Nicholas",
    "age": 29,
    5: true // 数值属性会自动转换为字符串 "5"
}
```

```js
let person = {}; // 与 new Object() 相同, 只有默认属性和方法的对象
person.name = "Nicholas";
person.age = 29;
```

```js
function displayInfo(args) {
    let output = "";

    if (typeof args.name == "string") {
        output += "Name: " + args.name + "\n";
    }
    
    if (typeof args.age == "number") {
        output += "Age: " + args.age + "\n";
    }
    
    alert(output);
}

displayInfo({
    name: "Nicholas",
    age: 29
});

displayInfo({
    name: "Greg"
});
```

### 1.2 访问属性

- （1）点语法

```js
console.log(person.name); // "Nicholas"
```

- （2）中括号：优势在于可以通过变量访问属性

```js
console.log(person["name"]); // "Nicholas"
```

```js
let propertyName = "name";
console.log(person[propertyName]); // "Nicholas"
```

```js
person["first name"] = "Nicholas";
```

## 2.Array

- ECMAScript 数组是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以存储任意类型的数据
- ECMAScript 数组是动态大小的，会随着数据添加而自动增长

### 2.1 创建数组

- （1）new Array()

```js
let colors = new Array();
let colors = Array(); 		// new 可以省略
let colors = new Array(20); // 创建已知元素个数的数组
let colors = new Array("red", "blue", "green"); // 创建数组时传入要保存的元素
```

- （2）数组字面量(array literal)

```js
let colors = ["red", "blue", "green"];
let name = []; // 空数组
let values = [1, 2,]; // 创建一个包含2个元素的数组
```

- （3）ES6 新增 静态方法：

	- Array.from() 

		- 用于将类数组结构转换为数组实例
		- 第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个 length 属性和可索引元素的结构

		```js
		// 字符串会被拆分为单字符数组
		console.log(Array.from("Matt")); // ["M", "a", "t", "t"]
		
		// 可以使用 from() 将集合和映射转换为一个新数组
		const m = new Map().set(1, 2)
						   .set(3, 4);
		const s = new Set().add(1)
						   .add(2)
						   .add(3)
						   .add(4);
		console.log(Array.from(m)); // [[1, 2], [3, 4]]
		console.log(Array.from(s)); // [1, 2, 3, 4]
		
		// Array.from() 对现有数组执行浅复制
		const a1 = [1, 2, 3, 4];
		const a2 = Array.from(a1);
		console.log(a1);  // [1, 2, 3, 4]
		alert(a1 === a2); // false
		
		// 可以使用任何可迭代对象
		const iter = {
		    *[Symbol.iterator] () {
		        yield 1;
		        yield 2;
		        yield 3;
		        yield 4;
		    }
		};
		console.log(Array.from(iter));  // [1, 2, 3, 4]
		
		// arguments 对象可以被轻松地转换为数组
		function getArgsArray() {
		    return Array.from(arguments);
		}
		console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]
		
		// from() 也能转换带有必要属性的自定义对象
		const arrayLikeObject = {
		    0: 1,
		    1: 2,
		    2: 3,
		    3: 4,
		    length: 4
		};
		console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]
		
		// Array.from() 还接收第二个可选的映射函数参数，这个函数可以直接增强新数组的值，而无须像调用 Array.from().map() 那样先创建一个中间数组
		// 第三个可选参数： 用于指定映射函数中 this 值，但这个重写的 this 值在箭头函数中不适用
		const a1 = [1, 2, 3, 4];
		const a2 = Array.from(a1, x => x ** 2);
		const a3 = Array.from(a1, function(x) {return x ** this.exponent}, {exponent: 2});
		console.log(a2); // [1, 4, 9, 16]
		console.log(a3); // [1, 4, 9, 16]
		```

	- Array.of()

		- 用于将一组参数转换为数组实例，用来替代 ES6 之前常用的 Array.protytype.slice.call(arguments)

		```js
		console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
		console.log(Array.of(undefined));  // [undefined]
		```

### 2.2 数组空位

- 使用数组字面量初始化数组时，可以使用一串逗号来创建空位(hole)，ECMAScript 会将逗号之间相应索引位置的值当成空位，ES6 规范重新定义了该如何处理这些空位
	- ES6 之前的方法会忽略这些空位，但具体的行为也会因方法而异
	- ES6 新增的方法将普遍将这些空位当成存在的元素，只不过值是 undefined
- 由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位，如果确实需要空位，则可以显示地用 undefined 值代替

```js
const options = [,,,,,]; // 创建包含 5 个元素的数组
console.log(options.length); // 5
console.log(options); // [,,,,,]
```

```js
const options = [1,,,,5];
const options = Array.from([1,,,,5]);
for (const option of options) {
    console.log(option === undefined);
}
// false
// ture
// ture
// ture
// false
```

```js
// ES6 之前的方法
const options = [1,,,,5];
// map() 会跳过空位置
console.log(options.map(() => 6)); // [6, undefined, undefined, undefined, 6]
// join()视空位置为空字符串
console.log(options.join("-")); // "1----5"
```

### 2.3 数组索引

- 要获得或设置数组的值，需要使用中括号 `[]` 并提供相应值的数字索引

	- 如果索引小于数组包含的元素数，则返回存储在相应位置的元素

	```js
	let colors = ["red", "blue", "green"];
	// 访问数组值
	console.log(colors[0]);
	
	// 设置数组值
	colors[2] = "black";
	colors[3] = "brown";
	console.log(colors);
	```

	- 如果把一个值设置给超过数组最大索引的索引，则数组长度会自动扩展到该索引值加 1

	```js
	// 数组长度扩展
	color[4] = "yellow";
	console.log(colors);
	```

	- 数组 length 属性的独特之处在于，它不是只读的。通过修改 length 属性，可以从数组末尾删除或添加元素
		- 数组最多可以包含  4 294 967 295 个元素，这对于大多数编程任务应该足够了。如果 尝试添加更多项，则会导致抛出错误。以这个最大值作为初始值创建数组，可能导致脚本 运行时间过长的错误

	```js
	let colors = ["red", "blue", "green"];
	colors.length = 2;
	console.log(colors[2]); // undefined
	console.log(colors);    // ["red", "blue"]
	```

	```js
	let colors = ["red", "blue", "green"];
	colors.length = 4;
	console.log(colors[3]); // ["red", "blue", "green", undefined]
	```

	```js
	let colors = ["red", "blue", "green"];
	colors[colors.length] = "black";
	colors[colors.length] = "brown";
	console.log(colors); // ["red", "blue", "green", "black", "brown"]
	```

	```js
	let colors = ["red", "blue", "green"];
	colors[99] = "black";
	console.log(colors.length); // 100
	```

### 2.4 检测数组

- 一个经典的 ECMAScript 问题是判断一个对象是不是数组

	- 在只有一个网页(因而只有一个全局作用域)的情况下，使用 instanceof 操作就足矣

	```js
	if (value instanceof Array) {
	    // 操作数组
	}
	```

	- 使用 instanceof 的问题是：假定只有一个全局执行上下文，如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因而就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数就有别于在第二个框架内本地创建的数组。
		- 为了解决这个问题，ECMAScript 提供了 Array.isArray() 方法，这个方法的目的就是确定一个值是否为数组，而不管它是在哪个全局执行上下文中创建的

	```js
	if (Array.isArray(value)) {
	    // 操作数组
	}
	```

### 2.5 迭代器方法

- 在 ES6 中，Array 的原型上暴露了3个用于检索数组内容的方法
	- keys()
		- 返回数组索引的迭代器
	- values()
		- 返回数组元素的迭代器
	- entries()
		- 返回索引/值的迭代器

```js
const a = ["foo", "bar", "baz", "qux"];
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());

console.log(aKeys);	   // [0, 1, 2, 3]
console.log(aValues);  // ["foo", "bar", "baz", "qux"]
console.log(aEntries); // [[0, "foo"], [1, "var"], [2, "baz"], [3, "qux"]]
```

- 使用 ES5 的解构可以非常容易地在循环中拆分键/值对

```js
const a = ["foo", "bar", "baz", "qux"];
for (const [idx, element] of a.entries()) {
    console.log(idx);
    console.log(element);
}
```

### 2.6 复制和填充方法

- copyWithin() 
	- 批量复制
	- 需要指定既有数组实例上的一个范围，包含开始索引，不包含结束索引
	- 不会改变数组的大小
	- 按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置，开始索引和结束索引则与 fill() 使用同样的计算方法

```js
let ints;
let reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置，在源索引或目标索引到达数组边界时停止
ints.copyWithin(5);
console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset();

// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5);
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
```

- fill()
	- 填充数组
	- 需要指定既有数组实例上的一个范围，包含开始索引，不包含结束索引
	- 不会改变数组的大小
	- 可以向一个已有的数组插入全部或部分相同的值
		- 开始索引用于指定开始填充的位置，可选
		- 如果不提供结束索引，则一直填充到数组末尾
		- 负值索引从数组末尾开始计算，也可以将负索引想象成数组长度加上它得到一个正索引

### 2.7 转换方法

### 2.8 栈方法

### 2.9 队列方法

### 2.10 排序方法

### 2.11 操作方法

### 2.12 搜索和位置方法

### 2.13 迭代方法

### 2.14 归并方法

## 3.定型数组

## 4.Map

- 在 ECMAScript 6 之前，在 JavaScript 中实现 "键/值" 式存储可以使用 Object 来方便高效的完成，也就是使用对象属性作为的键，再使用属性来引用值
- ECMAScript 6 新增了 Map 这种新的集合类型，为这门语言带来了真正的键/值存储机制
	- Map 的大多数特性都可以通过 Object 类型实现，但二者之间还是存在一些细微的差异

### 4.1 Map 基本 API

- 使用 new 关键字和 Map 构造函数创建 Map

```js
const m = new Map();
```

- 创建的同时初始化实例，可以给 Map 构造函数传入一个可迭代对象，需要包含键/值对数组，可迭代对象中的每个键/值对都会按照迭代顺序插入到新映射实例中

```js
// 创建并初始化 Map，使用嵌套数组初始化映射
const m1 = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
console.log(m1.size);
console.log(m1);
// 3
// Map(3) { 'key1' => 'val1', 'key2' => 'val2', 'key3' => 'val3' }
```

```js
// 使用自定义迭代器初始化映射
const m2 = new Map({
    [Symbol.iterator]: function*() {
        yield ["key1", "val1"];
        yield ["key1", "val1"];
        yield ["key1", "val1"];
    }
});
console.log(m2.size);
console.log(m2);
// 3
// Map(3) { 'key1' => 'val1', 'key2' => 'val2', 'key3' => 'val3' }
```

```js
// 映射期待的键/值对，无论是否提供
const m3 = new Map([[]]);
console.log(m3.has(undefined)); // true
console.log(m3.get(undefined)); // undefined
```

- 初始化之后:
	- 可以使用 `set()` 方法再添加键/值对
	- 可以使用 `get()` 和 `has()` 进行查询
	- 可以通过 `size` 属性获取映射中的键/值对的数量
	- 可以使用 delete() 和 clear() 删除值

```js
const m = new Map();
```

```js
console.log(m.has("firstName")); // false
console.log(m.get("firstName")); // undefined
console.log(m.size);			 // 0
```

```js
m.set("firstName", "Matt")
 .set("lastName", "Frisbie");
```

```js
console.log(m.has("firstName")); // true
console.log(m.get("firstName")); // Matt
console.log(m.size);			 // 2
```

```js
m.delete("firstName");		     // 只删除一个键/值对
```

```js
console.log(m.has("firstName")); // false
console.log(m.has("lastName"));  // true
console.log(m.size);			 // 1
```

```js
m.clear(); 						 // 清除 Map 实例中的所有键/值对
```

```js
console.log(m.has("firstName")); // false
console.log(m.has("lastName"));  // false
console.log(m.size);			 // 0
```

```js
const m = new Map().set("key1", "val1");
m.set("key2", "val2")
 .set("key3", "val3");
console.log(m.size); 			// 3
```

- 与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为键
	- Map 内部使用 SameValueZero 比较做操作符，基本上相当于使用严格对象相等的标准来检查键的匹配性

```js
const m = new Map();
const functionKey = function() {};
const symbolKey = Symbol();
const objectKey = new Object();

m.set(functionKey, "functionValue");
m.set(symbolKey, "symbolValue");
m.set(objectKey, "objectValue");

console.log(m.get(functionKey)); // functionValue
console.log(m.get(symbolKey));   // symbolValue
console.log(m.get(objcetKey));   // objectValue

// SameValueZeor 比较意味着独立实例不冲突
console.log(m.get(function() {})); // undefined
```

- 与严格相等一样，在映射中用作键和值的对象及其他“集合”类型，在自己的内容或属性被修改时仍然保持不变

```js
const m = new Map();
const objKey = {}, objVal = {}, arrKey = [], arrVal = [];
m.set(objKey, objVal);
m.set(arrKey, arrVal);
objKey.foo = "foo";
objVal.bar = "bar";
arrKey.push("foo");
arrVal.push("bar");

console.log(m.get(objKey)); // {bar: "bar"}
// SameValueZero 比较也可能导致意想不到的冲突
const m = new Map();
const a = 0/"", // NaN
      b = 0/"", // NaN
      pz = +0,
      nz = -0;
alert(a === b); // false
alert(pz === nz); // true
m.set(a, "foo");
m.set(pz, "bar");
alert(m.get(b)); // foo
alert(m.get(nz)); // bar
```

### 4.2 顺序与迭代

- 与 Object 类型的一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作
- Map 实例可以提供一个迭代器(Iterator)，能以插入顺序生成 [key, value] 形式的数组(Array)，可以通过 entries() 方法 (或者 Symbol.iterator 属性，它引用 entries()) 取得这个迭代器

```js
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
alert(m.entries === m[Symbol.iterator]); // true

for (let pair of m.entries()) {
    alert(pair);
}
// [key1, val1]
// [key2, val2]
// [key3, val3]

for (let pair of m[Symbol.iterator]()) {
    alert(pair);
}
// [key1, val1]
// [key2, val2]
// [key3, val3]
```

- 因为 entries() 是默认迭代器，所以可以直接对 Map 实例使用扩展操作，把 Map 转换为 Array

```js
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
console.log([...m]); // [[key1,val1],[key2,val2],[key3,val3]]
```

- 如果不适用迭代器，而是使用回调方式，则可以调用 Map 的 forEach(callback, opt_thisArg) 方法并传入回调，依次迭代每个键/值对
	- 传入的回调接收可选的第二个参数，这个参数用于重写回调内部 this 值

```js
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
m.forEach((val, key) => alert(`${key} -> ${val}`));
// key1 -> val1
// key2 -> val2
// key3 -> val3
```

- keys() 和 values() 分别返回插入顺序生成键和值的迭代器

```js
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
for (let key of m.keys()) {
    alert(key);
}
// key1
// key2
// key3

for (let value of m.values()) {
    alert(value);
};
// val1
// val2
// val3
```



- 键和值在迭代器遍历时是可以修改的，但 Map 内部的引用则无法修改。当然，这并不妨碍修改作为键或值的对象内部的属性，因为这样并不影响它们在映射实例中的身份

```js
// 作为键的字符串原始值是不能修改的
const m1 = new Map([
    ["key1", "val1"]
]);
for (let key of m1.keys()) {
    key = "newKey";
    alert(key);			   // newKey
    alert(m1.get("key1")); // val1
}

const keyObj = {
    id: 1
};
const m = new Map([
    [keyObj, "val1"]
]);
// 修改了作为键的对象的属性，但对象在映射内部仍然引用相同的值
for (let key of m.keys()) {
    key.id = "newKey";
    alert(key); // {id: "newKey"}
    alert(m.get(keyObj)); // val1
}
alert(keyObj); // {id: "newKey"}
```



### 4.3 选择 Object 还是 Map

- 对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大
- 对于在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别
	- 1.内存占用
		- Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。 不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。
	- 2.插入性能
		- 向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快 一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操 作，那么显然 Map 的性能更佳。
	- 3.查找速度
		- 与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对， 则 Object 有时候速度更快。在把 Object 当成数组使用的情况下(比如使用连续整数作为属性)，浏 览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言， 查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选 择 Object 更好一些。
	- 4.删除性能
		- 使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此， 出现了一些伪删除对象属性的操作，包括把属性值设置为undefined或null。但很多时候，这都是一 种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。 如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。

## 5.WeakMap

## 6.Set

### 6.1 Set 基本 API

### 6.2 顺序与迭代

### 6.3 定义正式集合操作

## 7.WeakSet

## 8.迭代与扩展操作



