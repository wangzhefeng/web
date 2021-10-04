.. _header-n0:

CSS 简介
==================

   -  CSS 指层叠样式表(**C**\ ascading **S**\ tyle **S**\ heets)

   -  样式定义如何显示 HTML 元素

   -  样式通常存储在样式表中

   -  把样式添加到 HTML 4.0 中，是为了解决内容与表现分离的问题

   -  外部样式表可以极大提高工作效率

   -  外部样式表通常存储在 CSS 文件中

   -  多个样式定义可层叠为一个

.. _header-n18:

0.CSS 实例
-------------------------------------

CSS 规则由两个主要的部分构成：\ **选择器**\ ，以及一条或多条\ **声明**:

   .. code:: css

      h1 {color: blue; font-size: 12px;}

   -  ``h1``

      -  选择器通常是需要改变样式的 HTML 元素

   -  ``color:blue;``\ 、\ ``font-size:12px;``

      -  每条声明由一个属性和一个值组成

   -  ``color``\ 、\ ``font-size``

      -  属性(property) 是希望设置的样式属性(style attribute)

   -  ``blue``\ 、\ ``font-size``

      -  属性值(property value) 每个属性有一个值，属性和属性值被冒号分开

   -  CSS 声明总是以分号(;)结束，声明总以大括号({})括起来

   -  不要在属性值与属性值单位之间留空格

.. _header-n46:

1.CSS 注释
----------

   .. code:: css

      /* 这是个注释 */

      p {
         text-align: center;
         /* 这是另一个注释 */
         color: black;
         font-family: arial;
      }

.. _header-n48:

2.CSS 选择器
------------------

   在 HTML 元素中设置 CSS 样式，需要在元素中设置 ``id`` 和 ``class`` 选择器

   -  ``id`` 选择器

   -  ``class`` 选择器

.. _header-n56:

2.1 ``id`` 选择器
~~~~~~~~~~~~~~~~~

   - ``id`` 选择器可以为标有特定 ``id`` 的 HTML 元素指定特定的样式

   -  ``id选择器`` 在 HTML 元素中以 ``id属性`` 表示

   -  ``id选择器`` 在 CSS 中以 ``#`` 表示

   -  HTML ``id属性`` 不要以数字开头，数字开头的 ``id属性`` 在
      Mozilla/Firefox 浏览器中不起作用

   .. code:: css

      #para1 {
         text-align: center;
         color: red;
      }

.. _header-n67:

2.2 ``class`` 选择器
~~~~~~~~~~~~~~~~~~~~

   - ``class选择器`` 用于描述一组元素的样式

   -  ``class选择器`` 在 HTML 中以 ``class属性`` 表示

   -  ``class选择器`` 在 CSS 中以 ``.`` 表示

   -  ``class选择器`` 可以在多个元素中使用

   -  HTML ``class属性`` 不能以数字开头，数字开头的 ``class属性`` 在
      Mozilla/Firefox 浏览器中不起作用

   .. code:: css

      .center {
         text-align: center;
      }

.. _header-n80:

3.CSS 创建
-----------------

   当浏览器读到一个样式表时，会根据样式表来格式化 HTML 文档

   在 HTML 中插入样式表的方法有三种：

      1. 外部样式表(External style sheet)

      2. 内部样式表(Internal style sheet)

      3. 内联样式(Inline style)

         -  如果样式仅需要在一个元素上应用一次时

      4. 多重样式

         -  如果某些属性在不同的样式表中被同样的选择器定义，那么属性值将从更具体的样式表中被继承过来

      5. 多重样式优先级

.. _header-n105:

3.1 外部样式表
~~~~~~~~~~~~~~

外部样式表引入方式：

   .. code:: html

      <head>
         <link rel="stylesheet" type="text/css" href="mystyle.css">
      </head>

样式表的创建形式：

   .. code:: css

      /* mystyle.css */

      hr {color: sienna;}
      p {margin-left: 20px;}
      body {background-image: url("/images/back40.gif");}

.. _header-n110:

3.2 内部样式表
~~~~~~~~~~~~~~

内部样式表的创建形式：

   .. code:: html

      <head>
         <style type="text/css">
            hr {color: sienna;}
            p {margin-left: 20px;}
            body {background-image: url("/images/back40.gif");}
         </style>
      </head>

.. _header-n114:

3.3 内联样式
~~~~~~~~~~~~

内联样式的创建形式：

   .. code:: html

      <p style="color:sienna;margin-left:20px">这是一个段落</p>

.. _header-n117:

3.4 多重样式
~~~~~~~~~~~~

外部样式表

   .. code:: css

      /* mystyle.css */

      h3 {
         color: red;
         text-align: left;
         font-size: 8pt;
      }

内部样式表：

.. .. code:: html

..    <head>
..       <style type="text/css">
..          h3 {
..             text-align: right;
..             font-size: 20pt;
..          }
..       </style>
..    </head>

``h3`` 属性最终样式：

   .. code:: 

      color: red;
      text-align: right;
      font-size: 20pt;

.. _header-n124:

3.5 多重样式优先级
~~~~~~~~~~~~~~~~~~

   .. math::
      
      (内联样式）Inline style > (内部样式)Internal style sheet >(外部样式)External style sheet > 浏览器默认样式


   .. code:: html

      <head>
         <!-- 外部样式 style.css -->
         <link rel="stylesheet" type="text/css" href="style.css">
         <!-- 设置 h3{color:blue;} -->
         <style type="text/css">
            /* 内部样式 */
            h3 {color: green;}
         </style>
      </head>
      <body>
         <h3>
            测试
         </h3>
      </body>
