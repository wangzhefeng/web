
5.React--State & 生命周期
==========================

   - State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件

1.将函数组件转换成 class 组件
---------------------------------

1.1 时钟示例
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - 一种更新 UI 界面的方法：通过调用 ReactDOM.render() 来修改想要渲染的元素

      .. code-block:: js

         function tick() {
            const element = (
               <div>
                  <h1>Hello, world!</h1>
                  <h2>It is {new Date().toLocaleTimeString()}.</h2>
               </div>
            );
            ReactDOM.render(
               element,
               document.getElementById('root')
            );
         }
         
         setInterval(tick, 1000);

   - 封装可复用的 ``Clock`` 组件，它将设置自己的计时器并每秒更新一次

      .. code-block:: js

         function Clock(props) {
            return (
               <div>
                  <h1>Hello, world!</h1>
                  <h2>It is {props.date.toLocaleTimeString()}.</h2>
               </div>
            );
         }
         
         function tick() {
            ReactDOM.render(
               <Clock date={new Date()} />,
               document.getElementById('root')
            );
         }
         
         setInterval(tick, 1000);

   - 理想情况下，希望只编写一次代码，便可以让 ``Clock`` 组件自我更新，需要在 ``Clock`` 组件中添加 "state" 来实现这个功能

      .. code-block:: js

         ReactDOM.render(
            <Clock />,
            document.getElementById("root")
         );

1.2 将函数组件转换成 class 组件
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - 通过以下五步将 ``Clock`` 的函数组件转换成 class 组件

      - 1.创建一个同名的 ES6 class, 并且继承于 ``React.Component``
      - 2.添加一个空的 ``render()`` 方法
      - 3.将函数体移动到 ``render()`` 方法之中
      - 4.在 ``render()`` 方法中使用 ``this.props`` 替换 ``props``
      - 5.删除剩余的空函数声明，现在 ``Clock`` 组件被定义为 class，而不是函数

      .. code-block:: js

         class Clock extends React.Component {
            render() {
               return (
                  <div>
                     <h1>Hello, world!</h1>
                     <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
                  </div>
               );
            };
         }

   .. note:: 

      - 每次组件更新时 ``render`` 方法都会被调用，但只要在相同的 DOM 节点中渲染 ``<Clock />``，
        就仅有一个 ``Clock`` 组件的 class 实例被创建使用。
        这就使得我们可以使用如 state 或生命周期方法等很多其他特性

2.向 class 组件中添加局部的 state
---------------------------------

   - 通过以下三步将 ``date`` 从 ``props`` 移动到 ``state`` 中

      - 1.把 ``render()`` 方法中的 ``this.props.date`` 替换成 ``this.state.date``

         .. code-block:: js

            class Clock extends React.Component {
               render() {
                  return (
                     <div>
                        <h1>Hello, world!</h1>
                        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                     </div>
                  );
               }
            }

      - 2.添加一个 class 构造函数，然后在该函数中为 ``this.state`` 赋初值

         .. code-block:: js

            class Clock extends React.Component {
               // 通过这种方式将 props 传递到父类(React.Component)的构造函数中
               constructor(props) {
                  super(props);
                  this.state = {date: new Date()};
               }

               render() {
                  return (
                     <div>
                        <h1>Hello, world!</h1>
                        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                     </div>
                  );
               }
            }

         .. note:: 

            - class 组件应该始终使用 props 参数来调用父类的构造函数

      - 3.移除 ``<Clock />`` 元素中的 date 属性

         .. code-block:: js

            ReactDOM.render(
               <Clock />,
               document.getElementById('root')
            );

      - 4.完成

         .. code-block:: js

            class Clock extends React.Component {
               // 通过这种方式将 props 传递到父类(React.Component)的构造函数中
               constructor(props) {
                  super(props);
                  this.state = {date: new Date()};
               }

               render() {
                  return (
                     <div>
                        <h1>Hello, world!</h1>
                        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                     </div>
                  );
               }
            }

            ReactDOM.render(
               <Clock />,
               document.getElementById('root')
            );

3.将生命周期方法添加到 class 中
--------------------------------

   - 在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的

      - 当 ``Clock`` 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为 "挂载(mount)"
      - 同时，当 DOM 中 ``Clock`` 组件被删除的时候，应该清除计时器。这在 React 中被称为 "卸载(unmount)"

   - 1.可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法，这些方法叫做"声明周期方法"

      .. code-block:: js

         class Clock extends React.Component {
            constructor(props) {
               super(props);
               this.state = {date: new Date()};
            }

            componentDidMount() {
            }

            componentWillUnmount() {
            }

            render() {
               return {
                  <div>
                     <h1>Hello, world!</h1>
                     <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                  </div>
               }
            }
         }

   - 2.``componentDidMount()`` 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器

      .. code-block:: js

         componentDidMount() {
            this.timerID = setInterval(
               () => this.tick(),
               1000
            );
         }

4.正确地使用 State
--------------------------------


4.1 不要直接修改 State
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



4.2 State 的更新可能是异步的
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


4.3 State 的更新会被合并
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


5.数据是向下流动的
---------------------------------