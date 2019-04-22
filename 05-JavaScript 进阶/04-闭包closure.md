# 闭包

## 引入

在 HTML 中有三个按钮，需求是：点击某个按钮, 提示"点击的是第n个按钮

```html
<button>测试1</button>
<button>测试2</button>
<button>测试3</button>
```

一般的做法就是遍历所有的按钮，给它绑定事件，输出 i 的值，如下：

```js
var btns = document.getElementsByTagName('button')
// 遍历加监听
// 注意这里 var i = 0,length=btns.length; i < length;
// 如果写成 var i = 0; i < btns.length;
// 每次循环都会计算 btns.length 的值，影响效率
for (var i = 0,length=btns.length; i < length; i++) {
  var btn = btns[i]
  btn.onclick = function () {
    alert('点击的是第'+(i+1)+'个按钮')
  }
}
```

但是实际上上面的代码实现不了我们的需求，按钮的点击事件在调用的时候这个for循环已经遍历完了，i 的值变成了 3，所以以上代码输出都是 `点击的是第4个按钮` 。

那么我们应该怎么做呢？

方法一：

给每个按钮添加一个 index 下标，使用 index 提示点击的是哪一个按钮，代码如下：

```js
for (var i = 0,length=btns.length; i < length; i++) {
  var btn = btns[i]
  // 将btn所对应的下标保存在btn上
  btn.index = i
  btn.onclick = function () {
    alert('第'+(this.index+1)+'个')
  }
}
```

方法二：

使用闭包

```js
for (var i = 0,length=btns.length; i < length; i++) {
  (function (j) {
    var btn = btns[j]
    btn.onclick = function () {
      alert('第'+(j+1)+'个')
    }
  })(i)
}
// 这里写成了 j ，一般都写成 i，更容易混淆
for (var i = 0,length=btns.length; i < length; i++) {
  (function (i) {
    var btn = btns[i]
    btn.onclick = function () {
      alert('第'+(i+1)+'个')
    }
  })(i)
}
```

那什么是闭包？且听下面分解。

## 理解闭包

```js
function fn1 () {
  var a = 2
  var b = 'abc'
  function fn2 () { // 执行函数定义就会产生闭包(不用调用内部函数)
    console.log(a)
  }
  // fn2()
}
fn1()
```

先看上面的代码，在 fn1 中定义了 fn2 函数，然后执行 fn1() ，这时我们通过 chrome 浏览器的控制台观察：

![20190420142951.png](http://img.fuwenwei.com/blog/20190420142951.png)

如上图所示，在 `var a = 2` 处设置了断点，当程序运行到此处时，产生了闭包，并且闭包存在于 fn2 中，那么关于闭包来看三个问题：

1. 如何产生闭包?
   * 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包
2. 闭包到底是什么?
   * 使用chrome调试查看
   * 理解一: 闭包是嵌套的内部函数(绝大部分人)
   * 理解二: 包含被引用变量(函数)的对象(极少数人)
   * 注意: 闭包存在于嵌套的内部函数中
3. 产生闭包的条件?
   * 函数嵌套
   * 内部函数引用了外部函数的数据(变量/函数)

还需要注意的是，在执行外部函数时，内部函数执行定义（函数提升）时就会产生闭包，而不需要调用内部函数。

## 常见的闭包

1. 将函数作为另一个函数的返回值

```js
function fn1() {
  var a = 2
  function fn2() {
    a++
    console.log(a)
  }
  return fn2
}
var f = fn1()
f() // 3
f() // 4
```

2. 将函数作为实参传递给另一个函数调用

```js
function showDelay(msg, time) {
  setTimeout(function () {
    alert(msg) // 产生闭包的条件，1.函数嵌套，2.引用了外部的变量
  }, time)
}
showDelay('闭包', 2000)
```

## 闭包的作用

1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)

问题:

1. 函数执行完后, 函数内部声明的局部变量是否还存在?  一般是不存在, 存在于闭包中的变量才可能存在
2. 在函数外部能直接访问函数内部的局部变量吗? 不能, 但我们可以通过闭包让外部操作它

```js
function fn1() {
  var a = 2
  function fn2() {
    a++
    console.log(a)
    // return a
  }
  function fn3() {
    a--
    console.log(a)
  }
  return fn3
}
var f = fn1()
f() // 1
f() // 0
```

上面的代码在执行完了之后，函数内部的 fn2，fn3 都释放掉了，没有释放掉的是什么？是函数对象：

```js
{
  a--
  console.log(a)
}
```

因为：

```js
f = {
  a--
  console.log(a)
}
```

原来在 栈中定义了一个 fn3 函数对象，指向一个堆地址，后来将这个堆地址重新赋值给 f ，则 fn3 没有使用的必要了，被垃圾回收了。但是 f 还保存着。

## 闭包的生命周期

1. 产生: 在嵌套内部函数定义执行完时就产生了(不是在调用)
2. 死亡: 在嵌套的内部函数成为垃圾对象时

```js
function fn1() {
  // 此时闭包就已经产生了(函数提升, 内部函数对象已经创建了)
  var a = 2
  function fn2 () {
    a++
    console.log(a)
  }
  return fn2
}
var f = fn1()
f() // 3
f() // 4
f = null //闭包死亡(包含闭包的函数对象成为垃圾对象)
```

## 闭包的应用-自定义JS模块

JS模块：

* 具有特定功能的js文件
* 将所有的数据和功能都封装在一个函数内部(私有的)
* 只向外暴露一个包含n个方法的对象或函数
* 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能

### 定义方法一：

编写一个 `myModule.js` 文件

```js
function myModule() {
  //私有数据
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing () {
    console.log('doOtherthing() '+msg.toLowerCase())
  }

  //向外暴露对象(给外部使用的方法)
  return {
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
}
```

使用 `myModule.js` 模块：

```js
<script type="text/javascript" src="myModule.js"></script>
<script type="text/javascript">
  var module = myModule()
  module.doSomething()
  module.doOtherthing()
</script>
```

### 定义方法二：

编写一个 `myModule2.js` 文件

```js
(function (window) {
  //私有数据
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing () {
    console.log('doOtherthing() '+msg.toLowerCase())
  }

  //向外暴露对象(给外部使用的方法)
  window.myModule2 = {
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
})(window)
```

使用 `myModule2.js` 模块：

```js
<script type="text/javascript" src="myModule2.js"></script>
<script type="text/javascript">
  myModule2.doSomething()
  myModule2.doOtherthing()
</script>
```

## 闭包的缺点及解决

1. 缺点
   * 函数执行完后, 函数内的局部变量没有释放, 占用内存时间会变长
   * 容易造成内存泄露
2. 解决
   * 能不用闭包就不用
   * 及时释放

```js
function fn1() {
  var arr = new Array[100000]
  function fn2() {
    console.log(arr.length)
  }
  return fn2
}
var f = fn1()
f()

f = null //让内部函数成为垃圾对象 从而回收闭包
```

## 面试题

```js
// 代码片段一，没有闭包
var name = "The Window";
var object = {
  name : "My Object",
  getNameFunc : function(){
    return function(){
      return this.name;
    };
  }
};
alert(object.getNameFunc()());  //?  the window

// 代码片段二，有闭包
var name2 = "The Window";
var object2 = {
  name2 : "My Object",
  getNameFunc : function(){
    var that = this;
    return function(){
      return that.name2;
    };
  }
};
alert(object2.getNameFunc()()); //?  my object
```