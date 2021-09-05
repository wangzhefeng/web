
4.React--组件 & Props
==========================

   - 组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思
   - 组件，从概念上类似于 JavaScript 函数。它接受任意的入参(即"props")，并返回用于描述页面展示内容的 React 元素

1.函数组件与 class 组件
----------------------------

   - 定义组件最简单的方式就是编写 JavaScript 函数

      .. code-block:: 

         function Welcome(props) {
            return <h1>Hello, {props.name}</h1>;
         }

   - 定义组件还可以使用 ES6 的 class

      .. code-block:: 

         class Welcome extends React.Component {
            render() {
               return <h1>Hello, {this.props.name}</h1>;
            }
         }

2.渲染组件
----------------------

   - React 元素可以是 DOM 标签，也可以是用户自定义的组件

      .. code-block:: js

         // DOM 标签
         const element = <div />;

         // 用户自定义组件
         const element = <Welcome name="Sara" />;

   - 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性(attributes)以及子组件(children)转换为单个对象传递给组件，这个对象被称之为 "props".

      .. code-block:: js
      
         // Welcome 组件
         function Welcome(props) {
            return <h1>Hello, {props.name}</h1>;
         }
         
         // React 元素用户自定义的组件
         const element = <Welcome name="Sara" />;

         // 元素渲染
         ReactDOM.render(
            element,
            document.getElementById('root')
         );

      - (1)我们调用 ``ReactDOM.render()`` 函数，并传入 ``<Welcome name="Sara" />`` 作为参数
      - (2)React 调用 Welcome 组件，并将 ``{name: 'Sara'}`` 作为 props 传入
      - (2)Welcome 组件将 ``<h1>Hello, Sara</h1>`` 元素作为返回值
      - (3)React DOM 将 DOM 高效地更新为 ``<h1>Hello, Sara</h1>``

   .. note:: 

      - 组件名称必须以大写字母开头
      - React 会将以小写字母开头的组件视为原生 DOM 标签

3.组合组件
----------------------

   - 组件可以在其输出中应用其他组件，这就可以让我们用同一组件来抽象出任意层次的细节
   - 在 React 应用程序中，按钮、表单、对话框，甚至整个屏幕的内容通常都会以组件的形式表示
   - 通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。但是，如果你将 React 集成到现有的应用程序中，
     你可能需要使用像 Button 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处

   .. code-block:: js

      // 可以创建一个可以多次渲染 Welcome 组件的 App 组件
      function Welcome(props) {
         return <h1>Hello, {props.name}</h1>;
      }

      function App() {
         return (
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
         );
      }

      ReactDOM.render(
         <App />,
         document.getElementById("root")
      );

4.提取组件
----------------------

   - 将组件拆分为更小的组件
   - 最初看上去，提取组件可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。
     根据经验来看，如果 UI 中有一部分被多次使用（``Button``，``Panel``，``Avatar``），
     或者组件本身就足够复杂（``App``，``FeedStory``，``Comment``），那么它就是一个可提取出独立组件的候选项

   .. code-block:: js

      // 该组件用于描述一个社交媒体网站上的评论功能，它接收 author（对象），text （字符串）以及 date（日期）作为 props
      function Comment(props) {
         return (
            <div className="Comment">
               <div className="UserInfo">
                  <img className="Avatar" 
                     src={props.author.avatarUrl}
                     alt={props.author.name}
                  />
                  <div className="UserInfo-name">
                     {props.author.name}
                  </div>
               </div>
               <div className="Comment-text">
                  {props.text}
               </div>
               <div className="Comment-date">
                  {formatDate(props.date)}
               </div>
            </div>
         );
      }
      // --------------------------------------------------------------------------------
      // 上面的组件由于嵌套的关系，变得难以维护，且很难复用它的各个部分。因此，让我们从中提取一些组件出来
      // --------------------------------------------------------------------------------
      // 1.提取 Avatar 组件
      function Avatar(props) {
         return (
            <img className="Avatar" 
               src={props.user.avatarUrl}
               alt={props.user.name}
            />
         );
      }
      
      // 2.提取 UserInfo 组件
      function UserInfo(props) {
         return (
            <div className="UserInfo">
               <Avatar user={props.user} />
               <div className="UserInfo-name">
                  {props.user.name}
               </div>
            </div>
         );
      }
      // 3.简化后的 Comment 组件
      function Comment(props) {
         return (
            <div className="Comment">
               <UserInfo user={props.author} />
               <div className="Comment-text">
                  {props.text}
               </div>
               <div className="Comment-date">
                  {formatDate(props.date)}
               </div>
            </div>
         );
      }


5.Props 的只读性
-----------------------

   - 组件无论是使用函数声明还是通过 class 声明，都绝不能修改自身的 props
   - React 非常灵活，但它有一个严格的规则：**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改**

   .. code-block:: js

      // 纯函数：部署尝试更改入参，且多次调用下相同的入参始终返回相同的结果
      function sum(a, b) {
         return a + b;
      }

      // 不是纯函数，因为它更改了自己的入参
      function withdraw(account, amount) {
         account.total -= amount;
      }

   .. note:: 

      当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。有一种新的概念，称之为 “state”。
      在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容
