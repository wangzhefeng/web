
3.React--元素渲染
========================

   .. code-block:: 

      const element = <h1>Hello, world</h1>;

   - 元素(Element)是构成 React 应用的最小砖块，组件()是由元素构成的
   - 与浏览器的 DOM 元素不同，React 元素是创建开销绩效的普通对象
   - React DOM 会负责更新 DOM 来与 React 元素保持一致

1.将一个元素渲染为 DOM
----------------------------

   - root DOM 节点

      .. code-block:: html

         <div id="root"></div>

      - root DOM 节点内的所有内容都由 React DOM 管理
      - 仅使用 React 构建的应用通常只有单一的 root DOM 节点，如果将 React 集成进一个已有应用，那么可以在应用中包含任意多的独立 root DOM 节点

   - 如果想要将一个 React 元素渲染到 root DOM 节点中，只需要把它们一起传入 ``ReactDOM.render()``

      .. code-block:: 

         const element = <h1>Hello, world</h1>;
         ReactDOM.render(
            element,
            document.getElementById('root')
         );

2.更新已渲染的元素
-----------------------------

   - React 元素是不可变对象，一旦被创建，就无法更改它的子元素或者属性。一个 React 元素就像电影的单帧：它代表了某个特定时刻的 UI
   - 更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ``ReactDOM.render()``
   - 在实践中，大多数 React 应用只会调用一次 ReactDOM.render()

   .. code-block:: 

      // 在 setInterval() 回调函数，每秒都调用 ReactDOM.render()
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

3.React 只更新它需要更新的部分
------------------------------------

   - React DOM 会将元素和它的子元素与它们之间的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态
   - 应该专注于 UI 在任意给定时刻的状态，而不是一视同仁地随着时间修改整个界面
