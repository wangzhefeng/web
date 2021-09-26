---
title: JS 函数
author: 王哲峰
date: '2020-07-01'
slug: js-function
categories: [js]
tags: [js]
---

# 1.函数简介

- 内容
	- 函数表达式、函数声明及箭头函数
	- 默认参数及扩展操作符
	- 使用函数实现递归
	- 使用闭包实现私有变量

- 函数定义方式

	- 方式1：函数声明

	```js
	function sum(num1, num2) {
	    return num1 + num2;
	}
	```

	- 方式2：函数表达式

	```js
	let sum = function(num1, num2) {
	    return num1 + num2;
	};
	```

	- 方式3：箭头函数

	```js
	let sum = (num1, num2) => {
	    return num1 + num2;
	};
	```

	- 方式4：使用 Function 构造函数

	```js
	let sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐
	```

	- 结论：
		- 函数是对象，每个函数都是 Function 类型的实例，而 Function 也有属性和方法
		- 函数是对象，函数名是指向函数对象的指针

