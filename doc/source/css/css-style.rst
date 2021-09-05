.. _header-n0:

CSS 样式
========

   -  CSS ``background``

      -  background

      -  background-color

      -  background-image

      -  background-repeat

      -  background-attachment

      -  background-position

   -  CSS ``text``

   -  CSS ``fonts``

   -  CSS ``link``

   -  CSS ``ul``

   -  CSS ``table``

   -  CSS 盒子模型

   -  CSS ``border``

   -  CSS ``outline``

   -  CSS ``margin``

   -  CSS ``padding``

   -  CSS 分组和嵌套

   -  CSS ``dimension``

   -  CSS ``display``

   -  CSS ``position``

   -  CSS ``overflow``

   -  CSS ``float``

   -  CSS 对齐

   -  CSS 组合选择符

   -  CSS 伪类

   -  CSS 导航栏

   -  CSS 下拉菜单

   -  CSS 提示工具

   -  CSS 图片廊

   -  CSS 图片透明/不透明

   -  CSS 图像拼合

   -  CSS 表单

   -  CSS 计数器

   -  CSS 媒体类型

   -  CSS 属性选择器

   -  CSS 表单

   -  CSS 网页布局


1.background
---------------------

   .. code:: css

      body {background-color: #b0c4de;}
      h1 {background-color: #6495ed;}
      p {background-color: #e0ffff;}
      div {background-color: #b0c4de;}

   .. code:: css

      body {background-image: url('paper.gif');}
      body {
         background-image: url('gradient2.png');
         background-repeat: repeat-x;
      }
      body {
         background-image: url('img_tree.png');
         background-repeat: no-repeat;
      }
      body {
         background-image: url('img_tree.png');
         background-repeat: no-repeat;
         background-position: right top;
      }

   .. code:: css

      body {background: #ffffff url("img_tree.png") no-repeat rightl top;}
