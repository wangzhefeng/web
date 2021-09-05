
10.React--示例教程
===========================

1.课前准备
----------------------

   - 教程分为如下几部分：

      - 环境准备是学习该教程的起点
      - 概览介绍了 React 的基础知识、组件、props 和 state
      - 游戏完善介绍了在 React 开发过程中最常用的技术
      - 时间旅行可以让你更加深刻地了解 React 的独特优势

   - 我们会做出什么东西？

      - 用 React 开发一个井字棋(tic-tac-toe)
      - https://codepen.io/gaearon/pen/gWWZgR

   - 前置知识

      - HTML
      - CSS
      - JavaScript

2.环境准备
----------------------

2.1 在浏览器中编写代码
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - 首先，在新的浏览器选项卡中打开这个 `初始模板 <https://codepen.io/gaearon/pen/oWWQNa?editors=0010>`_ ，可以看到一个空的井字棋盘和 React 代码
   - 然后，在该模板中修改 React 代码

2.2 搭建本地开发环境
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - 1.安装最新版的 `Node.js <https://nodejs.org/en/>`_ 
   - 2.按照 `Create React App 安装指南 <https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app>`_ 创建一个新的项目

      .. code-block:: shell

         $ npx create-react-app my-app
   
   - 3.删除掉新项目中的 ``src/`` 文件夹下所有的文件

      .. code-block:: shell

         $ cd my-app
         $ cd src
         $ rm -f *
         $ cd ..

   - 4.在 ``src/`` 文件夹中创建一个名为 ``index.css`` 的文件
   - 5.在 ``src/`` 文件夹下创建一个名为 ``index.js`` 的文件
   - 6.拷贝以下三行代码到 ``src/`` 文件夹下的 ``index.js`` 文件的顶部

      .. code-block:: js

         import React from 'react';
         import ReactDOM from 'react-dom';
         import './index.css';

   - 7.在项目文件夹下执行 ``npm start`` 命令，然后在浏览器访问 ``http://localhost:3000``。
     这样就可以在浏览器中看见一个空的井字棋的棋盘

3.概览
----------------------

3.1 React 是什么?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - React 是一个声明式、高效且灵活的用于构建用户界面的 JavaScript 库。
     使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，
     这些代码片段被称作 “组件”。

   - React 中拥有多种不同类型的组件，先从 ``React.Component`` 的子类开始介绍:
     
      .. code-block:: 

         class ShoppingList extends React.Component {
            render() {
               return (
                  <div className="shopping-list">
                     <h1>Shopping List for {this.props.name}</h1>
                     <ul>
                        <li>Instagrm</li>
                        <li>WhatsApp</li>
                        <li>Oculus</li>
                     </ul>
                  </div>
               );
            }
         }
         // 用法示例：<ShoppingList name="Mark" />

   - 通过使用组件来告诉 React 希望在屏幕上看到什么，当数据发生改变时，React 会高效地更新并重新渲染组件
     
      - (1)其中，ShppingList 是一个 React 组件类，或者说是一个 React 组件类型。
        一个组件接收一些参数，把这些参数叫做 ``props``，``props`` 是 "properties" 的简写.
      - (2)然后通过 ``render`` 方法返回需要展示在屏幕上的视图的层次结构。 
        ``render`` 方法的返回值描述了你希望在屏幕上看到的内容。React 根据描述，然后把结果展示出来。更具体地来说，
        ``render`` 返回了一个 React 元素，这是一种对渲染内容的轻量级描述。大多数的 React 开发者使用了一种名为 "JSX" 的特殊语法，
        JSX 可以让你更轻松地书写这些结构.
      - (3)语法 ``<div />`` 会被编译成 ``React.createElement('div')``。因此上述代码等同于:

         .. code-block:: 

            return React.createElement(
               'div', 
               {className: 'shopping-list'},
               React.createElement('h1', /* ... h1 children ... */),
               React.createELement('ul', /* ... ul children ... */)
            );

3.2 阅读初始代码
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - 三个 React 组件

      - Square

         - Square 组件渲染了一个单独的 ``<button>``

      - Board

         - Board 组件渲染了 9(25) 个方块

      - Game

         - Game 组件渲染了含有默认值的一个棋盘


3.3 通过 Props 传递数据
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - 1.将数据从 Board 组件传递到 Square 组件中

      .. code-block:: js

         // 传递一个名为 value 的 prop 到 Square 当中
         class Board extends React.Component {
            renderSquare(i) {
               return <Square value={i} />;
            }
         }
   
   - 2.修改 Square 组件中的 render 方法，把 ``{/* TODO */}`` 替换为 ``{this.props.value}``，以显示上文中传入的值

      .. code-block:: js

         class Square extends React.Component {
            render() {
               return (
                  <button className="square">
                     {this.props.value}
                  </button>
               );
            }
         }

   - 3.刚刚成功地把一个 prop 从父组件 Board “传递” 给了子组件 Square。
     在 React 应用中，数据通过 props 的传递，从父组件流向子组件.

3.4 给组件添加交互功能
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   让棋盘的每一个格子在点击之后能落下一颗 "X" 作为棋子

   - 1.首先，把 Square 组件中的 ``render()`` 方法的返回值中的 button 标签修改为如下内容

      .. code-block:: js

         class Square extends React.Component {
            render() {
               return (
                  <button className="square" onClick={function() { alert("click"); }}>
                     {this.props.value}
                  </button>
               );
            }
         }

         // 为了少输入代码，同时为了避免 this 造成的困扰，建议使用箭头函数来进行事件处理
         class Square extends React.Component {
            render() {
               return (
                  <button className="square" onClick={() => { alert("click"); }}>
                     {this.props.value}
                  </button>
               );
            }
         }

   - 2.接下来，希望 Square 组件可以记住它被点击过，然后用 "X" 来填充对应的方格，
     用 state 来实现所谓"记忆"的功能。可以通过在 React 组件的构造函数中设置 ``this.state`` 来初始化 state。
     ``this.state`` 应该被视为一个组件的私有属性，在 ``this.state`` 中存储当前每个方格(Square)的值，
     并且在每次方格被点击的时候改变这个值

     - (2.1)首先，向这个 class 中添加一个构造函数，用来初始化 state

         .. code-block:: js

            class Square extends React.Component {
               constructor(props) {
                  super(props);
                  this.state = {
                     value: null,
                  };
               }

               render() {
                  return (
                        <button className="square" onClick={() => { alert("click"); }}>
                           {this.props.value}
                        </button>
                  );
               }
            }
      
      - (2.2)现在，修改一下 Square 组件的 render 方法，这样，每当方格被点击的时候，就可以显示当前 state 的值了

         - 在 ``<button>`` 标签中，把 ``this.props.value`` 替换为 ``this.state.value``
         - 将 ``onClick={...}`` 事件监听函数替换为 ``onClick={() => this.setState({value: 'X'})}``
         - 为了更好的可读性，将 ``className`` 和 ``onClick`` 的 prop 分两行书写

         .. code-block:: js

            class Square extends React.Component {
               constructor(props) {
                  super(props);
                  this.state = {
                     value: null,
                  };
               }

               render() {
                  return (
                        <button 
                           className="square" 
                           onClick={() => this.setState({value: 'X'})}
                        >
                           {this.state.value}
                        </button>
                  );
               }
            }

      - (2.3)在 Square 组件 ``render`` 方法中 onClick 事件监听函数中调用 this.setState，
        我们就可以在每次 <button> 被点击的时候通知 React 去重新渲染 Square 组件。组件更新之后，
        Square 组件的 this.state.value 的值会变成 "X"，因此，我们在游戏棋盘是哪个就能看见 ``X`` 了。
        点击任意一个方格，``X`` 就会出现了。


3.5 开发者工具
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   - `Chrome <https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en>`_ 
   - `Firefox <https://addons.mozilla.org/en-US/firefox/addon/react-devtools/>`_ 

4.游戏完善
----------------------

   - TODO

5.时间旅行
----------------------

   - TODO
