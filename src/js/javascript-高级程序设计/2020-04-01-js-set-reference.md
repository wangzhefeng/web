[TOC]

# 六、集合引用类型

## 1.Object

- Object 是 ECMAScript 中最常用的类型之一，虽然 Object 的实例没有多少功能，但很适合存储在应用程序间交互数据

### 1.1 创建 Object 实例

- （1）使用 new 操作符合 Object 构造函数

```js
let person = new Object();
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
// 对象字面量已经成为给函数传递大量可选参数的主要方式
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
let person = {
    name: "Nicholas",
    age: 29
};

console.log(person.name); // "Nicholas"
```

- （2）中括号：优势在于可以通过变量访问属性

```js
let person = {
    name: "Nicholas",
    age: 29,
    "fisrt name": "wangzf"
};

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

- ECMAScript 数组是一组有序的数据，组中每个槽位可以存储任意类型的数据
- ECMAScript 数组是动态大小的，会随着数据添加而自动增长

### 2.1 创建数组

- （1）`new Array()`

```js
let colors = new Array();   					// 创建空数组
let colors = Array(); 							// new 可以省略
let colors = new Array(20); 					// 创建已知元素个数的数组
let names = new Array("Greg"); 					// 创建一个元素，即字符串 "Greg" 的数组
let colors = new Array("red", "blue", "green"); // 创建数组时传入要保存的元素
```

- （2）数组字面量(array literal)

```js
let name = []; 							// 空数组
let colors = ["red", "blue", "green"];  // 包含3个元素的数组
let values = [1, 2,]; 				    // 包含2个元素的数组
```

- （3）ES6 新增 静态方法：

	- `Array.from() ` 用于将类数组结构转换为数组实例

		- 第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个 length 属性和可索引元素的结构
		- 第二个可选的映射函数参数，这个函数可以直接增强新数组的值，而无须像调用 Array.from().map() 那样先创建一个中间数组
		- 第三个可选参数： 用于指定映射函数中 this 值，但这个重写的 this 值在箭头函数中不适用

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
		
		
		const a1 = [1, 2, 3, 4];
		// 第二个可选的映射函数参数
		const a2 = Array.from(
		    a1, 
		    x => x ** 2
		);
		console.log(a2); // [1, 4, 9, 16]
		
		// 第三个可选参数
		const a3 = Array.from(
		    a1, 
		    function(x) {return x ** this.exponent}, 
		    {exponent: 2}
		);
		console.log(a3); // [1, 4, 9, 16]
		```

	- `Array.of()`

		- 用于将一组参数转换为数组实例，用来替代 ES6 之前常用的 `Array.protytype.slice.call(arguments)`

		```js
		console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
		console.log(Array.of(undefined));  // [undefined]
		```

### 2.2 数组空位

- 使用数组字面量初始化数组时，可以使用一串逗号来创建空位(hole)，ECMAScript 会将逗号之间相应索引位置的值当成空位，ES6 规范重新定义了该如何处理这些空位
	- ES6 之前的方法会忽略这些空位，但具体的行为也会因方法而异
	- ES6 新增的方法将普遍将这些空位当成存在的元素，只不过值是 undefined
- 由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位，如果确实需要空位，则可以显示地用 `undefined` 值代替

```js
const options = [,,,,,]; 	 // 创建包含 5 个元素的数组
console.log(options.length); // 5
console.log(options); 		 // [,,,,,]
```

```js
const options = [1,,,,5];

for (const option of options) {    
    console.log(option === undefined);
}
// false
// ture
// ture
// ture
// false


const a = Array.from(options);
for (const value of a) {
    console.log(value === undefined);
}
// true
// true
// true


alert(Array.of(...[,,,])); // [undefined, undefined, undefined]

for (const [index, value] of options.entries()) {
    alert(value);
}
// 1
// undefined
// undefined
// undefined
// 5
```

```js
// ES6 之前的方法会忽略空位，但具体的行为也会因方法而异
const options = [1,,,,5];

// map() 会跳过空位置
console.log(options.map(() => 6)); // [6, undefined, undefined, undefined, 6]

// join() 视空位置为空字符串
console.log(options.join("-")); // "1----5"
```

### 2.3 数组索引

- 要获得或设置数组的值，需要使用中括号 `[]` 并提供相应值的数字索引

	- 如果索引小于数组包含的元素数，则返回存储在相应位置的元素

	```js
	let colors = ["red", "blue", "green"]; 
	
	// 访问数组
	alert(colors[0]);  // "red"
	
	// 设置数组值
	colors[2] = "black";
	colors[3] = "brown";
	console.log(colors);     // ["red", "blue", "black", "brown"]
	```

	- 如果把一个值设置给超过数组最大索引的索引，则数组长度会自动扩展到该索引值加 1

	```js
	// 数组长度扩展
	let colors = ["red", "blue", "green"]; 
	
	color[4] = "yellow";
	console.log(colors); // ["red", "blue", "green", undefined, "yellow"]
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
	console.log(colors); // ["red", "blue", "green", undefined]
	```

	```js
	// 数组中最后一个元素的索引始终是 length-1，因此下一个新增槽位的索引就是 length，每次在数组最后一个元素后面新增一项，数组的 length 属性都会自动更新，以反映变化
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

	- 在只有一个网页(因而只有一个全局作用域)的情况下，使用 `instanceof` 操作就足矣

	```js
	if (value instanceof Array) {
	    // 操作数组
	}
	```

- 使用 `instanceof` 的问题是：

	- 假定只有一个全局执行上下文，如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因而就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数就有别于在第二个框架内本地创建的数组
	- 为了解决这个问题，ECMAScript 提供了 `Array.isArray()` 方法，这个方法的目的就是确定一个值是否为数组，而不管它是在哪个全局执行上下文中创建的

	```js
	if (Array.isArray(value)) {    
	    // 操作数组
	}
	```

### 2.5 迭代器方法

- 在 ES6 中，Array 的原型上暴露了3个用于检索数组内容的方法
	- `keys()`
		- 返回数组索引的迭代器
	- `values()`
		- 返回数组元素的迭代器
	- `entries()`
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

- 使用 ES6 的**解构**可以非常容易地在循环中拆分键/值对

```js
const a = ["foo", "bar", "baz", "qux"];

for (const [idx, element] of a.entries()) {    
    console.log(idx);    
    console.log(element);
}
// 0
// foo
// 1
// bar
// 2
// bar
// 3
// baz
// 4
// qux
```

### 2.6 复制和填充方法

- `copyWithin(insertStartIndex, copyStartIndex, copyEndIndex) `

	- 批量复制
	- 需要指定既有数组实例上的一个范围，包含开始索引，不包含结束索引
	- 不会改变数组的大小
	- 按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置，开始索引和结束索引计算方法如下：
		- 开始索引用于指定开始填充的位置，可选
		- 如果不提供结束索引，则一直填充到数组末尾
		- 负值索引从数组末尾开始计算，也可以将负索引想象成数组长度加上它得到一个正索引
	
	```js
	let ints;
	let reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	reset();
	
	// 从 ints 中复制索引0开始的内容，插入到索引5开始的位置，在源索引或目标索引到达数组边界时停止
	ints.copyWithin(5);
	console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
	reset();
	
	// 从 ints 中复制索引5开始的内容，插入到索引0开始的位置
	ints.copyWithin(0, 5);
	console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
	reset();
	
	// 从 ints 中复制索引0开始到索引3(不包含)结束的内容，插入到索引4开始的位置
	ints.copyWithin(4, 0, 3);
	console.log(ints); // [0, 1, 2, 3, 0, 1, 2, 3, 8, 9];
	reset();
	
	// JavaScript 引擎在插值前会完整复制范围内的值，因此复制期间不存在重写的风险
	ints.copyWithin(2, 0, 6);
	console.log(ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9]
	reset();
	
	// 支持负索引值，与 fill() 相对于数组末尾计算正向索引的过程是一样的
	ints.copyWithin(-4, -7, -3);
	console.log(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
	```
	
	- 静默忽略超出边界、零长度及方向相反的索引范围
	
	```js
	let ints;
	let reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	reset();
	
	// 索引过低，忽略
	ints.copyWithint(1, -15, -12);
	console.log(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	reset();
	
	// 索引过高，忽略
	ints.copyWithint(1, 12, 15);
	console.log(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	reset();
	
	// 索引反向，忽略
	ints.copyWithint(2, 4, 2);
	console.log(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	reset();
	
	// 索引部分可用，复制、填充可用部分
	ints.copyWithint(4, 7, 10);
	console.log(ints); // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9]
	```

- `fill(fillValue, startIndex, endIndex)`

	- 填充数组
	- 需要指定既有数组实例上的一个范围，包含开始索引，不包含结束索引
	- 不会改变数组的大小
	- 可以向一个已有的数组插入全部或部分相同的值，开始索引和结束索引计算方法如下：
		- 开始索引用于指定开始填充的位置，可选
		- 如果不提供结束索引，则一直填充到数组末尾
		- 负值索引从数组末尾开始计算，也可以将负索引想象成数组长度加上它得到一个正索引

	```js
	const zeroes = [0, 0, 0, 0, 0];
	
	// 用 5 填充整个数组
	zeroes.fill(5);
	console.log(zeroes); // [5, 5, 5, 5, 5]
	zeroes.fill(0);
	
	// 用6填充索引大于等于3的元素
	zeroes.fill(6, 3);
	console.log(zeroes); // [0, 0, 0, 6, 6]
	zeroes.fill(0);
	
	// 用7填充索引大于等于1且小于3的元素
	zeroes.fill(7, 1, 3);
	console..log(zeroes); // [0, 7, 7, 0, 0]
	zeroes.fill(0);
	
	// 用8填充索引大于等于1且小于4的元素
	// method 1
	zeroes.fill(8, 1, 4);
	console.log(zeroes); // [0, 8, 8, 8, 0]
	zeroes.fill(0);
	// method 2
	zeroes.fill(8, -4, -1);
	console.log(zeroes); // [0, 8, 8, 8, 0]
	zeroes.fill(0);
	```

	- 静默忽略超出数组边界、零长度及方向相反的索引范围

	```js
	const zeroes = [0, 0, 0, 0, 0];
	
	// 索引过低，忽略
	zeroes.fill(1, -10, -6);
	console.log(zeroes); // [0, 0, 0, 0, 0]
	
	// 索引过高，忽略
	zeroes.fill(1, 10, 15);
	console.log(zeroes); // [0, 0, 0, 0, 0]
	
	// 索引反向，忽略
	zeroes.fill(2, 4, 2);
	console.log(zeroes); // [0, 0, 0, 0, 0]
	
	// 索引部分可用，填充可用部分
	zeroes.fill(4, 3, 10);
	console.log(zeroes); // [0, 0, 0, 4, 4]
	```

### 2.7 转换方法

- 所有对象都有 `toLocaleString()`、`toString()`、`valueOf()` 方法

	- 数组本身

	```js
	let colors = ["red", "blue", "green"];
	console.log(colors); // Array(3) [ "red", "blue", "green" ]
	```

	- `valueOf()` 返回数组本身

	```js
	let colors = ["red", "blue", "green"];
	console.log(colors.valueOf()); // Array(3) [ "red", "blue", "green" ]
	```

	- `toString()` 返回由数组中每个值的等效字符串拼接而成的一个逗号分隔符的字符串，也就是说，对数组的每个值都会调用其 `toString()` 方法，以得到最终的字符串

	```js
	let colors = ["red", "blue", "green"];
	console.log(colors.toString()); // "red, blue, green"
	```

	- `toLocaleString()` 也可能返回跟 `toString()` 和 `valueOf()` 相同的结果，但也不一定。在调用数组的 `toLocaleString()` 方法时，会得到一个逗号分隔的数组字符串。它与另外两个方法唯一的区别是，为了得到最终的字符串，会调用数组每个值的 `toLocaleString()` 方法，而不是 `toString()` 方法

	```js
	let person1 = {
	    toLocaleString() {
	        return "Nikolaos";
	    },
	    toString() {
	        return "Nicholas";
	    }
	};
	
	let person2 = {
	    toLocaleString() {
	        return "Grigrios";
	    },
	    toString() {
	        return "Greg";
	    }
	};
	
	let people = [person1, person2];
	console.log(people); // Nicholas,Greg
	console.log(people.toString()); // Nicholas,Greg
	console.log(people.toLocaleString()); // Nikolaos,Grigorios
	```

- 继承的方法 `toLocaleString()` 和 `toString()` 都返回了数组值的逗号分隔的字符串，如果想使用不同的分隔符，则可以使用 `join()` 方法

	```js
	let colors = [ "red", "blue", "green" ];
	
	console.log(colors.join(",")); // red,green,blue
	console.log(colors.join("|")); // red|green|blue
	```

- 如果数组中某一项是 null 或 undefined，则在 join()、toLocaleString()、 toString() 和 valueOf() 返回的结果中会以空字符(`""`)串表示

### 2.8 栈方法

- ECMAScript 给数组提供几个方法，让它看起来像是另外一种数据结构。数组对象可以像栈一样， 也就是一种限制插入和删除项的数据结构。栈是一种后进先出(LIFO，Last-In-First-Out)的结构，也就是最近添加的项先被删除
	- 数据项的插入(称为推入，push)和删除(称为弹出，pop)只在栈的一个 地方发生，即栈顶
	- ECMAScript 数组提供了 push()和 pop()方法，以实现类似栈的行为
- `push()`方法接收任意数量的参数, 并将它们添加到数组末尾, 返回数组的最新长度

```js
let colors = new Array();

let count = colors.push("red", "green"); // 推入两项
console.log(count); 				     // 2

count = colors.push("black"); // 再推入一项
console.log(count); 		  // 3
```

- `pop()` 方法用于删除数组的最后一项, 同时减少数组的 length 值, 返回被删除的项

```js
let item = colors.pop();     // 取得最后一项
console.log(item); 			 // black
console.log(colors.length);  // 2
```

### 2.9 队列方法

- 队列以**先进先出(FIFO，First-In-First-Out)**形式限制访问。队列在列表末尾添加数据，但从列表开头获取数据

	- 因为有了在数据末尾添加数据的 push() 方法，所以要模拟队列就差一个从数组开头取得数据的方法了
	- 这个数组方法叫 `shift()`，它会删除数组的第一项并返回它，然后数组长度减 1。使用 shift()和 push()，可以把数组当成队列来使用

	```js
	let colors = new Array();
	let count = colors.push("red", "green");
	console.log(count);  // 2
	
	count = colors.push("black");
	console.log(count);  //3
	
	let item = colors.shift();
	console.log(item); // "red"
	console.log(colors.length); // 2
	```

	- ECMAScript 也为数组提供了 `unshift()` 方法，执行跟 `shift()` 相反的操作: 在数组开头添加任意多个值，然后返回新的数组长度。通过使用 `unshift（）` 和 `pop()` ，可以在相反方向上模拟队列，即在数组开头添加数据，在数组末尾取得数据

	```js
	let colors = new Array();
	
	// 在数组开头推入两项
	let count = colors.unshift("red", "green");
	console.log(count); // 2
	
	//  再推入一项
	count = colors.unshift("black");
	console.log(count); // 3
	
	// 取得最后一项
	let item = colors.pop();
	console.log(item); // green
	console.log(colors.length); // 2
	```

### 2.10 排序方法

- 数组有两个方法可以用来对元素重新排序,  并且都返回调用它们的数组的引用

  - `reverse()`

  ```js
  let values = [1, 2, 3, 4, 5];
  values.reverse();
  console.log(values); // 5,4,3,2,1
  ```

  - `sort()`
    - 默认情况下，sort() 会按照升序重新排列数组元素，即最小的值在前面，最大的值在后面，为此，sort() 会在每一项上调用 String() 转型函数，然后比较字符串来决定顺序。即使数组的元素都是数值也会把数组转换为字符串再比较、排序

    ```js
    let values = [0, 1, 5, 10, 15];
    values.sort();
    console.log(values); // 0,1,10,15,5
    ```

    - sort() 方法可以接收一个比较函数，用于判断哪个值应该排在前面，比较函数接收两个参数
    	- 如果第一个参数应该排在第二个参数前面，就返回负值
    	- 如果两个参数相等，就返回 0
    	- 如果第一个参数应该排在第二个参数后面，就返回正值

    ```js
    function compare(value1, value2) {
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
    
    let values = [0, 1, 5, 10, 15];
    values.sort(compare);
    console.log(values); // 0,1,5,10,15
    
    
    function compare(value1, value2) {
        if (value1 < value2) {
            return 1;
        } else if (value1 > value2) {
            return -1;
        } else {
            return 0;
        }
    }
    
    let values = [0, 1, 5, 10, 15];
    values.sort(compare);
    console.log(values); // 15,10,5,1,0
    
    
    let values = [0, 1, 5, 10, 15];
    values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
    console.log(values); // 15,10,5,1,0
    
    // 如果数组的元素是数值，或者是其 valueOf()方法返回数值的对象(如 Date 对象)，这个比较函 数还可以写得更简单，因为这时可以直接用第二个值减去第一个值
    function compare(value1, value2) {
        return value2 - value1;
    }
    ```


### 2.11 操作方法

- `concat()`
	
	- 在现有数组全部元素基础上创建一个新数组。它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新建的数组
	- 如果传入一个或多个数组，则 `concat()` 会把这些数组的每一项都添加到结果数组
	- 如果参数不是数组，则直接把它们添加到结果数组的末尾
	
	```js
	let colors = ["red", "green", "blue"];
	let colors2 = colors.concat("yello", ["black", "brown"]);
	console.log(colors); // ["red", "green", "blue"]
	console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
	```
	
	- 打平数组参数的行为可以重写，方法是在参数数组上指定一个特殊的符号 `Symbol.isConcatSpreadable`，这个符号能够阻止 `concat()` 打平参数数组，相反，这个值设置为 true 可以强制打平类数组对象
	
	```js
	let colors = ["red", "green", "blue"];
	
	let newColors = ["black", "brown"];
	newColors[Symbol.isConcatSpreadable] = false;
	
	let moreNewColors = {
	    [Symbol.isConcatSpreadable]: true,
	    length: 2,
	    0: "pink",
	    1: "cyan"
	};
	
	
	// 强制不打平数组
	let colors2 = colors.concat("yellow", newColors);
	
	// 强制打平类数组对象
	let colors3 = colors.concat(moreNewColors);
	
	console.log(colors); // ["red", "green", "blue"]
	console.log(colors2); // ["red", "green", "blue", "yellow", ["black", "brown"]]
	console.log(colors3); // ["red", "green", "blue", "pink", "cyan"]
	```

- `slice()`

	- 用于创建一个包含原有数组中一个或多个元素的新数组，这个操作不影响原始数组
	- 接收一个或两个参数：返回元素的开始索引和结束索引
		- 如果只有一个参数，则 slice() 会返回该索引到数组末尾的所有元素
		- 如果有两个参数，则 slice() 返回从开始索引到结束索引对应的所有元素，其中不包含结束索引对应的元素

	```js
	let colors = ["red", "green", "blue", "yellow", "purple"];
	let colors2 = colors.slice(1);
	let colors3 = colors.slice(1, 4);
	
	console.log(colors2); // green,blue,yellow,purple
	console.log(colors3); // green,blue,yellow
	```

- `splice()`

	- 主要目的是在数组中插入元素，`splice()` 始终返回这样一个数组，它包含数组中被删除的元素(如果没有删除元素，则返回空数组)
	- 有 3 总不同的方式使用这个方法
		- 删除
			- 需要给 splice()传 2 个参数:要删除的第一个元素的位置和要删除的元素数量。可以从 数组中删除任意多个元素，比如 splice(0, 2)会删除前两个元素
		- 插入
			- 需要给 splice()传 3 个参数:开始位置、0(要删除的元素数量)和要插入的元素，可 以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多 个要插入的元素
		- 替换
			- splice()在删除元素的同时可以在指定位置插入新元素，同样要传入 3 个参数:开始位置、要删除元素的数量和要插入的任意多个元素。要插入的元素数量不一定跟删除的元素数量 一致

	```js
	let colors = ["red", "green", "blue"];
	
	// 删除第一项
	let removed = colors.splice(0, 1);
	console.log(colors);  // green,blue
	console.log(removed); // red
	
	// 在位置1插入两个元素
	removed = colors.splice(1, 0, "yellow", "orange");
	console.log(colors); // green,yellow,orange,blue
	console.log(removed); // 空数组
	
	// 插入两个值，删除一个元素
	removed = colors.splice(1, 1, "red", "purple");
	console.log(colors);  // green,red,purple,orange,blue
	console.log(removed); // yellow
	```

### 2.12 搜索和位置方法

- ECMAScript 提供了两类搜索数组的方法
	- 按严格相等搜索
	- 按断言函数搜索

1. **严格相等**

- ECMAScipt 提供了 3 个严格相等的搜索方法，在比较第一个参数跟数组每一 项时，会使用全等(===)比较，也就是说两项必须严格相等。这些方法都接收两个参数：要查找的元素、一个可选的起始搜索位置
	- indexOf()
		- 从数组前头开始向后搜索
		- 返回要查找的元素在数组中的位置，如果没找到则返回 -1
	- lastIndexOf()
		- 从数组末尾开始向前搜索
		- 返回布尔值，表示是否至少找到一个与指定元素匹配的项
	- includes()
		- 从数组前头开始向后搜索
		- 返回要查找的元素在数组中的位置，如果没找到则返回 -1

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

console.log(numbers.indexOf(4));     // 3
console.log(numbers.lastIndexOf(4)); // 5
console.log(numbers.includes(4)); 	 // true

console.log(numbers.indexOf(4, 4));     // 5
console.log(numbers.lastIndexOf(4, 4)); // 3
console.log(numbers.includes(4, 7)); 	 // false


let person = {
    name: "Nicholas"
};
let people = [
    { name: "Nicholas" }
];
let morePeople = [person];
console.log(people.indexOf(person)); // -1
console.log(morePeople.indexOf(person)); // 0
console.log(people.includes(person)); // false
console.log(morePeople.includes(person)); // true
```

2. **断言函数**

- ECMAScript 允许按照定义的断言函数搜索数组，每个索引都会调用这个函数
	- 断言函数的返回值决定了相应索引的元素是否被认为匹配，断言函数返回真值，表示是否匹配
	- 找到匹配项后，将不再继续搜索
- 断言函数接收 3 个参数
	- 元素：数组中当前搜索的元素
	- 索引：当前元素的索引
	- 数组本身：正在搜索的数组
- 使用了断言函数的数组方法，这两个方法都从数组的最小索引开始，也都接收第二个可选参数，用于指定断言函数内部 this 值
	- `find()`
		- 从数组的最小索引开始看，返回第一个匹配的元素
	- `findIndex()`
		- 从数组的最小索引开始，返回第一个匹配元素的索引

```js
const people = [
    {
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];
console.log(people.find((element, index, array) => element.age < 28));
// {name: "Matt", age: 27}

console.log(people.findIndex((element, index, array) => element.age < 28));
// 0
```

```js
// 找到匹配项后，永远不会检查数组的最后一个元素
const events = [2, 4, 6];

events.find((element, index, array) => {
    console.log(element);
    console.log(index);
    console.log(array);
    return element === 4;
});
// 2
// 0
// [2, 4, 6]
// 4
// 1
// [2, 4, 6]
```

### 2.13 迭代方法

- ECMAScript 为数组定义了5个迭代方法，每个方法都接收两个参数：

	- 以每一项为参数运行的函数，传给每个方法的函数接收3个参数：
		- 数组元素
		- 元素索引
		- 数组本身
	- 可选的作为函数运行上下文的作用域对象(影响函数中 this 的值)

- 这些方法都不改变调用它们的数组

- 迭代方法

	```js
	let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
	```

	- `every()`
		- 对数组每一项都运行传入的函数，如果对每一项函数都返回 true, 则这个方法返回 true

	```js
	let everyResult = numbers.every((item, index, array) => item > 2);
	console.log(everyResult); // false
	```

	- `filter()`
		- 对数组每一项都运行传入的函数，函数返回 ture 的项会组成数组之后返回

	```js
	let filterResult = numbers.filter((item, index, array) => item > 2);
	console.log(filterResult); // 3,4,5,4,3
	```

	- `forEach()`
		- 对数组每一项都运行传入的函数，没有返回值

	```js
	numbers.forEach((item, index, array) => {
	    // 执行某些操作
	});
	```

	- `map()`
		- 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组

	```js
	let mapResult = numbers.map((item, index, array) => item * 2);
	console.log(mapResult); // 2,4,6,8,10,8,6,4,2
	```

	- `some()`
		- 对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true

	```js
	let someResult = numbers.some((item, index, array) => item > 2);
	console.log(someResult); // true
	```

### 2.14 归并方法

- ECMAScript 为数组提供了两个归并方法，这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值:
	- `reduce()`
		- 从数组第一项开始遍历到最后一项
	- `reduceRight()`
		- 从最后一项开始遍历至第一项

- `reduce()` 和 `reduceRight()` 都接收两个参数:
	-  对每一项都会运行的归并函数
	- 可选的以之为归并起点的初始值，如果没有给这两个方法传入可选的第二个参数，则第一次迭代将从数组的第二项开始，因此传给归并函数的第一个参数是数组的第一项，第二个参数是数组的第二项
- 传给 `reduce()` 和 `reduceRight()` 的函数都接收 4 个参数，这个函数返回的任何值都会作为下一次调用同一个函数的第一个参数：
	- 上一个归并值
	- 当前项
	- 当前项的索引
	- 数组本身
- 示例

```js
let values = [1, 2, 3, 4, 5];
let sum = values.reduce((prev, cur, index, array) => prev + cur);
console.log(sum); // 15
```

```js
let valuse = [1, 2, 3, 4, 5];
let sum = values.reduceRight(function(prev, cur, index, array) {
    return prev + cur;
});
console.log(sum); // 15
```

## 3.定型数组

### 3.1 历史

### 3.2 ArrayBuffer

### 3.3 DataView

### 3.4 定型数组

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
console.log(m1); // 3
// Map(3) { 'key1' => 'val1', 'key2' => 'val2', 'key3' => 'val3' }
```

```js
// 使用自定义迭代器初始化映射const m2 = new Map({    [Symbol.iterator]: function*() {        yield ["key1", "val1"];        yield ["key1", "val1"];        yield ["key1", "val1"];    }});console.log(m2.size);console.log(m2);// 3// Map(3) { 'key1' => 'val1', 'key2' => 'val2', 'key3' => 'val3' }
```

```js
// 映射期待的键/值对，无论是否提供const m3 = new Map([[]]);console.log(m3.has(undefined)); // trueconsole.log(m3.get(undefined)); // undefined
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
console.log(m.has("firstName")); // falseconsole.log(m.get("firstName")); // undefinedconsole.log(m.size);			 // 0
```

```js
m.set("firstName", "Matt") .set("lastName", "Frisbie");
```

```js
console.log(m.has("firstName")); // trueconsole.log(m.get("firstName")); // Mattconsole.log(m.size);			 // 2
```

```js
m.delete("firstName");		     // 只删除一个键/值对
```

```js
console.log(m.has("firstName")); // falseconsole.log(m.has("lastName"));  // trueconsole.log(m.size);			 // 1
```

```js
m.clear(); 						 // 清除 Map 实例中的所有键/值对
```

```js
console.log(m.has("firstName")); // falseconsole.log(m.has("lastName"));  // falseconsole.log(m.size);			 // 0
```

```js
const m = new Map().set("key1", "val1");m.set("key2", "val2") .set("key3", "val3");console.log(m.size); 			// 3
```

- 与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为键
	- Map 内部使用 SameValueZero 比较做操作符，基本上相当于使用严格对象相等的标准来检查键的匹配性

```js
const m = new Map();const functionKey = function() {};const symbolKey = Symbol();const objectKey = new Object();m.set(functionKey, "functionValue");m.set(symbolKey, "symbolValue");m.set(objectKey, "objectValue");console.log(m.get(functionKey)); // functionValueconsole.log(m.get(symbolKey));   // symbolValueconsole.log(m.get(objcetKey));   // objectValue// SameValueZeor 比较意味着独立实例不冲突console.log(m.get(function() {})); // undefined
```

- 与严格相等一样，在映射中用作键和值的对象及其他“集合”类型，在自己的内容或属性被修改时仍然保持不变

```js
const m = new Map();const objKey = {}, objVal = {}, arrKey = [], arrVal = [];m.set(objKey, objVal);m.set(arrKey, arrVal);objKey.foo = "foo";objVal.bar = "bar";arrKey.push("foo");arrVal.push("bar");console.log(m.get(objKey)); // {bar: "bar"}// SameValueZero 比较也可能导致意想不到的冲突const m = new Map();const a = 0/"", // NaN      b = 0/"", // NaN      pz = +0,      nz = -0;alert(a === b); // falsealert(pz === nz); // truem.set(a, "foo");m.set(pz, "bar");alert(m.get(b)); // fooalert(m.get(nz)); // bar
```

### 4.2 顺序与迭代

- 与 Object 类型的一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作
- Map 实例可以提供一个迭代器(Iterator)，能以插入顺序生成 [key, value] 形式的数组(Array)，可以通过 entries() 方法 (或者 Symbol.iterator 属性，它引用 entries()) 取得这个迭代器

```js
const m = new Map([    ["key1", "val1"],    ["key2", "val2"],    ["key3", "val3"]]);alert(m.entries === m[Symbol.iterator]); // truefor (let pair of m.entries()) {    alert(pair);}// [key1, val1]// [key2, val2]// [key3, val3]for (let pair of m[Symbol.iterator]()) {    alert(pair);}// [key1, val1]// [key2, val2]// [key3, val3]
```

- 因为 entries() 是默认迭代器，所以可以直接对 Map 实例使用扩展操作，把 Map 转换为 Array

```js
const m = new Map([    ["key1", "val1"],    ["key2", "val2"],    ["key3", "val3"]]);console.log([...m]); // [[key1,val1],[key2,val2],[key3,val3]]
```

- 如果不适用迭代器，而是使用回调方式，则可以调用 Map 的 forEach(callback, opt_thisArg) 方法并传入回调，依次迭代每个键/值对
	- 传入的回调接收可选的第二个参数，这个参数用于重写回调内部 this 值

```js
const m = new Map([    ["key1", "val1"],    ["key2", "val2"],    ["key3", "val3"]]);m.forEach((val, key) => alert(`${key} -> ${val}`));// key1 -> val1// key2 -> val2// key3 -> val3
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

- ECMAScript 6 新增 `Set` 是一种新集合类型，`Set()`  在很多方面都像是加强的 `Map`，这是因为它们的大多数 API 和行为都是共有的

### 6.1 Set 基本 API



### 6.2 顺序与迭代

### 6.3 定义正式集合操作

## 7.WeakSet

## 8.迭代与扩展操作

-  ECMAScript 6 新增的迭代器和扩展操作符对集合引用类型特别有用。这些新特性让集合类型之间相互操作、复制和修改变得异常方便
-  有 4 中原生集合类型定义了默认迭代器，很简单，这意味这些类型都支持顺序迭代，都可以传入 for-of 循环
	-  Array
	-  所有定型数组
	-  Map
	-  Set

- 示例
	- for-of 循环

```js
let iterableThings = [
    Array.of(1, 2),
    typedArr = Int16Array.of(3, 4),
    new Map([
        [5, 6], 
        [7, 8]
    ]),
    new Set([9, 10])
];

for (const iterableThing of iterableThings) {
    for (const x of iterableThing) {
        console.log(x);
    }
}

// 1
// 2
// 3
// 4
// [5, 6]
// [7, 8]
// 9
// 10
```

- 示例
	- 所有这些类型都兼容扩展操作符，扩展操作符在可迭代对象执行浅复制时特别有用，只需简单的语法就可以复制整个对象

```js
let arr1 = [1, 2, 3];
let arr2 = [...arr1];

console.log(arr1); // [1, 2, 3]
console.log(arr2); // [1, 2, 3]
console.log(arr1 === arr2); // false
```

- 示例
	- 对于期待可迭代对象的构造函数，只要传入一个可迭代对象就可以实现复制

```js
let map1 = new Map([
    [1, 2],
    [3, 4]
]);
let map2 = new Map(map1);

console.log(map1); // Map {1 => 2, 3 => 4}
console.log(map2); // Map {1 => 2, 3 => 4}
```

- 示例
	- 构建数组的部分元素

```js
let arr1 = [1, 2, 3];
let arr2 = [0, ...arr1, 4, 5];

console.log(arr2); // [0, 1, 2, 3, 4, 5]
```

- 示例
	- 浅复制意味着只会复制对象引用

```js
let arr1 = [{}];
let arr2 = [...arr1];
arr1[0].foo = "bar";
console.log(arr2[0]); // { foo: "bar" }
```

- 示例
	- 这些类型都支持多种构建方法，比如 `Array.of()` 和 `Array.from()` 静态方法，在于扩展操作符一起使用时，可以非常方便地实现互操作

```js
let arr1 = [1, 2, 3];

// 把数组复制到定型数组
let typedArr1 = Int16Arrray.of(...arr1);
let typedArr2 = Int16Array.from(arr1);
console.log(typedArr1); // Int16Array [1, 2, 3]
console.log(typedArr2); // Int16Array [1, 2, 3]

// 把数组复制到映射
let map = new Map(
    arr1.map((x) => [x, "val" + x])
);
console.log(map); // Map {1 => "val 1", 2 => "val 2", 3 => "val 3"}

// 把数组复制到集合
let set = new Set(typedArr2);
console.log(set); // Set {1, 2, 3}

// 把集合复制回数组
let arr2 = [...set];
console.log(arr2); // [1, 2, 3]
```











































