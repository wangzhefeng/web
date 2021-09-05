
0.React
============================================

   React--用于构建用户界面的 JavaScript 库

1.简介
--------

   - 声明式

      - React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，而数据改变时 React 能有效地更新并正确的渲染组件
      - 以声明式编写 UI，可以让你的代码更可靠，且方便调试
   
   - 组件化

      - 创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI
      - 组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离

   - 一次学习，随处编写

      - 无论你现在正在使用什么技术栈，你都可以随时引入 React 来开发新特性，而不需要重写现有代码
      - React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用

1.1 简单组件
~~~~~~~~~~~~~~~~~~~~~~~~~

   - React 组件使用一个名为 ``render()`` 的方法，接收输入的数据并返回需要展示的内容。
     在示例中这种类似 XML 的写法被称为 JSX。被传入的数据可在组件中通过 ``this.props`` 在 ``render()`` 访问。
   - 使用 React 的时候也可以不使用 JSX 语法。尝试使用 `Babel REPL <https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUPGDADkdECChWeASl4AlOMOBQAIgHkAssp0aIySpogoaFBUQmISdC48QA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.14.0&externalPlugins=>`_  ，
     了解 JSX 被编译成原生 JavaScript 代码的步骤。

      .. code-block::

         // 简单组件
         class HelloMessage extends React.Component {
            render() {
               return (
                     <div>
                        Hello {this.props.name}
                     </div>
               );
            }
         }
         ReactDOM.render(
            <HelloMessage name="Taylor" />,
            document.getElementById("hello-example")
         );

1.2 有状态组件
~~~~~~~~~~~~~~~~~~~~~~~~~

   - 除了使用外部数据（通过 ``this.props`` 访问）以外，组件还可以维护其内部的状态数据(通过 ``this.state`` 访问)。
     当组件的状态数据改变时，组件会再次调用 ``render()`` 方法重新渲染对应的标记。

      .. code-block::

         class Timer extends React.Component {
            constructor(props) {
               super(props);
               this.state = { seconds: 0 };
            }
      
            tick() {
               this.setState(state => ({
                  seconds: state.seconds + 1
               }));
            }
      
            componentDidMount() {
               this.interval = serInterval(() => this.tick(), 1000);
            }
            
            componentWillUnmount() {
               clearInterval(this.interval);
            }
      
            render() {
               return (
                  <div>
                     Seconds: {this.state.seconds}
                  </div>
               );
            }
         }
         ReactDOM.render(
            <Timer />,
            document.getElementById("timer-example")
         );

1.3 应用
~~~~~~~~~~~~~~~~~~~~~~~~~

   - 使用 ``props`` 和 ``state``，我们可以创建一个简易的 ``Todo`` 应用。
     在示例中，我们使用 ``state`` 来保存现有的待办事项列表及用户的输入。
     尽管事件处理器看似被内联地渲染，但它们其实只会被事件委托进行收集和调用。

      .. code-block:: 

         class TodoApp extends React.Component {
            constructor(props) {
               super(props);
               this.state = { items: [], text: '' };
               this.handleChange = this.handleChange.bind(this);
               this.handleSubmit = this.handleSubmit.bind(this);
            }

            render() {
               return (
                  <div>
                     <h3>TODO</h3>
                     <TodoList items={this.state.items} />
                     <form onSubmit={this.handleSubmit}>
                        <label htmlFor="new-todo">
                           What needs to be done?
                        </label>
                        <input 
                           id="new-todo"
                           onChange={this.handleChange}
                           value={this.state.text}
                        />
                        <button>
                           Add #{this.state.items.length + 1}
                        </button>
                     </form>
                  </div>
               );
            }

            handleChange(e) {
               this.setState({ text: e.target.value });
            }

            handleSubmit(e) {
               e.preventDefault();
               if (this.state.text.length === 0) {
                  return;
               }
               const newItem = {
                  text: this.state.text,
                  id: Date.now()
               };
               this.setState(state => ({
                  items: state.items.concat(newItem),
                  text: ''
               }));
            }
         }

         class TodoList extends React.Component {
            render() {
               return (
                  <ul>
                     {this.props.items.map(item => (
                        <li key={item.id}>{item.text}</li>
                     ))}
                  </ul>
               );
            }
         }

         ReactDOM.render(
            <TodoApp />,
            document.getElementById("todos-example")
         );

1.4 在组件中使用外部插件
~~~~~~~~~~~~~~~~~~~~~~~~~

   - React 允许你结合其他框架或库一起使用。示例中使用了一个名为 ``remarkable`` 的外部 Markdown 库。
     它可以实时转换 ``<textarea>`` 里的内容。

      .. code-block:: 
      
         class MarkdownEditor extends React.Component {
            constructor(props) {
               super(props);
               this.md = new Remarkable();
               this.handleChange = this.handleChange.bind(this);
               this.state = { value: 'Hello, **world**!' };
            }
            
            handleChange(e) {
               this.setState({ value: e.target.value });
            }
      
            getRawMarkup() {
               return { __html: this.md.render(this.state.value) };
            }

            render() {
               return (
                  <div className="MarkdownEditor">
                  <h3>Input</h3>
                  <label htmlFor="markdown-content">
                     Enter some markdown
                  </label>
                  <textarea
                     id="markdown-content"
                     onChange={this.handleChange}
                     defaultValue={this.state.value}
                  />
                  <h3>Output</h3>
                  <div
                     className="content"
                     dangerouslySetInnerHTML={this.getRawMarkup()}
                  />
                  </div>
               );
            }
         }
         ReactDOM.render(
            <MarkdownEditor />,
            document.getElementById("markdown-example")
         );
