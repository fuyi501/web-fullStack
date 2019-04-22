# 闭包（closure）

> 闭包（closure）是Javascript语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现。要理解闭包，首先必须理解Javascript特殊的变量作用域。变量的作用域无非就是两种：全局变量和局部变量。Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。

1. 关于全局变量 和 局部变量的

函数外面定义变量： 
`var a = 20；`，此处 var 声明的 a 是一个全局变量
函数内部定义：
```js
function fn1() { 
  // 如果是 var 声明的，则是局部变量 (与函数外面声明的相反 )
  var a = 20;
  // 如果是直接写的（省去var声明的），则是全局变量
  a = 20;
}
```
访问范围：全局变量，在整个 script 中，都可以访问到；但是局部变量只能在函数内部访问到；函数外部是不能访问到的。有时候，想要在全局访问到函数内部的局部变量，要怎么办？--闭包，可以实现这一点。

2. 闭包（closure）：

何为闭包？在一个函数中写入另外一个函数，并且可以访问到这个函数的局部变量的函数，这就是闭包。

在js中，只有一个函数内部的子函数才可以读取局部变量，所以，也可以把闭包理解为“定义在一个函数内部的函数”。（本质上，闭包就是讲函数内部和函数外部链接的一座桥梁。）
```js
function fn1 () {
  var a = 20;
  return function fn2 () {
    console.log(a);
  }
}

fn1()();
```

此处的 fn2 函数就是闭包函数。

3. 闭包的作用：

第一：可以读取一个函数内部的函数，
第二：避免“垃圾回收机制”回收，因为子函数会返回一个全局变量，又会调用父函数的局部变量，两个变量相互调用；
所以，两个函数都不会被清除。

4. 关于闭包中`this`的指向问题

**代码一：**
```js
var name = 'The window ';
var object = {
  name:  'my object',
  fn1 : function () {
    console.log('第一个：' + this.name); // 此处this.name为 my object
    return function () {
      console.log('第二个：' + this.name); // 此处this.name为The window
      return this.name;
    }            
  },
}
// object.fn1()();
var fn = object.fn1()
console.log('fn', fn())
```

难点：
第二个`this.name`打印出来的为什么是`The window`？

解释：
我们可以换种写法：
```js
var  fn   =  object.fn1();
fn(); // 这里的 fn()是函数体 function(){ return this.name };
```
此处的 `fn()` 是 `window` 调用的，所以this.name是 `The window`

**代码二：**
```js
var name = "The Window";　　
var object = {　　　　
  name : "My Object",
  getNameFunc : function(){
    var that = this;           		 
    console.log(that.name);   // My Object
    return function(){    
      console.log(this.name); // The Window
      console.log(that.name); // My Object　
      return that.name;
    };　　　　
  }　　
};　　
  
console.log(object.getNameFunc()()) // My Object
```
