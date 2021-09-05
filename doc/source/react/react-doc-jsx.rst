
2.React--JSX
======================

   .. code-block:: js

      // 注意：这是简化过的结构
      const element = {
         type: 'h1',
         props: {
            className: 'greeting',
            children: 'Hello, world!'
         }
      }const element = <h1>Hello, world!</h1>;

   - 这个有趣的标签语法既不是字符串也不是 HTML
   - 它被称为 JSX，是一个 JavaScript 的语法扩展
   - 建议在 React 中配合使用 JSX
   - JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式
   - JSX 可能会使人联想到模板语言，但它具有 JavaScript 的全部功能
   - JSX 可以生成 React 元素


1.为什么使用 JSX ?
---------------------

   - React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合
   - React 并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在被称之为组件的松散耦合单元中，来实现关注点分离
   - React 不强制要求使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用，它还可以使 React 显示更多有用的错误和警告消息

2.在 JSX 中嵌入表达式
---------------------

   - 在 JSX 语法中，可以在大括号内放置任何有效的 JavaScript 表达式

   - 示例 1

      .. code-block:: 

         const name = "Josh Perez";
         const element = <h1>Hello, {name}</h1>;

         ReactDOM.render(
            element,
            document.getElementById('root')
         );


   - 示例 2

      .. code-block:: 

         function formatName(user) {
            return user.firstName + " " + user.lastName;
         }

         const user = {
            firstName: "Harper",
            lastName: "Perez"
         };

         const element = (
            <h1>
               Hello, {formatName(user)}!
            </h1>
         );

         ReactDOM.render(
            element,
            document.getElementById("root")
         );

   .. note:: 
   
      - 为了便于阅读, 建议将 JSX 拆分为多行
      - 为了避免遇到自动插入分号陷阱，建议将内容包裹在括号中

3.JSX 也是一个表达式
---------------------

   - 在编译之后，JSX 表达式也会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript对象，也就是说，
     可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当做参数传入，以及从函数中返回 JSX

   .. code-block:: js

      function getGreeting(user) {
         if (user) {
            return <h1>Hello, {formatName(user)}!<!h1>
         }
         return <h1>Hello, Stranger.</h1>
      }

4.JSX 特定属性
---------------------

   - 可以通过使用引号，来将属性值指定为字符串字面量，也可以使用大括号，来在属性值中插入一个 JavaScript 表达式

   .. code-block:: js

      const element = <div tabIndex="0"></div>;
      const element = <img src={user.avatarUrl}></img>;

5.使用 JSX 指定子元素
---------------------

   - 假如一个标签里面没有内容，可以使用 ``/>`` 来闭合标签，就像 XML 语法一样
   - JSX 标签里能够包含很多子元素

   .. code-block:: js

      const element = <img src={user.avatarUrl} />;

      const element = (
         <div>
            <h1>Hello!</h1>
            <h2>Good to see you here.</h2>
         </div>
      );

6.JSX 防止注入攻击
--------------------

   - 可以安全地在 JSX 当中插入用户输入内容
   - React DOM 在渲染所有输入内容之前，默认会进行转义，它可以确保在你的应用中，
     永远不会注入哪些并非自己明确编写的内容，所有的内容在渲染之前都被转换成了字符串，
     这样可以有效地防止 XSS(cross-site-scripting,跨站脚本)攻击

   .. code-block:: js

      const title = reponse.potentiallyMaliciousInput;
      // 直接使用时安全的
      const element = <h1>{title}</h1>


7.JSX 表示对象
---------------------

   - Babel 会把 JSX 转译成 ``React.createElement()`` 函数调用

      .. code-block:: js

         const element = (
            <h1 className="greeting">
               Hello, world!
            </h1>
         );

      .. code-block:: js

         const element = React.createElement(
            'h1',
            {className: 'greeting'},
            'Hello, world!'
         );
      
   - ``React.createElement()`` 会预先执行一些检查，以帮助你编写无措代码，但实际上它创建了一个这样的对象，这些对象被称为 "React 元素"，它们描述了你希望在屏幕上看到的内容。
     React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新

      .. code-block:: js

         // 注意：这是简化过的结构
         const element = {
            type: 'h1',
            props: {
               className: 'greeting',
               children: 'Hello, world!'
            }
         };