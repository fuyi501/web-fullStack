# 面试

1. 使用 Nodejs 编写代码实现遍历文件夹及所有文件名

关键点：
  - fs 和 path 模块
  - fs 的 readdirSync() statSync 方法
  - path 的 join() 方法
  - isDirectory() 方法

```js
const fs = require('fs')
const path = require('path')

const readDir = (entry) => {
  const dirInfo = fs.readdirSync(entry)
  dirInfo.forEach(item => {
    const location = path.join(entry, item)
    const info = fs.statSync(location)
    if(info.isDirectory()){
      console.log(`dir: ${location}`)
      readDir(location)
    }else{
      console.log(`file: ${location}`)
    }
  });
  console.log(entry)
}

readDir(__dirname)
```

2. Node 如何做版本的升级？ 为什么要使用 nvm？

es6新语法，提高webpack打包速度（webpack一般会使用新的node的api提高自己的打包速度，所以更新新的node版本）

3. 模块化的差异，AMD，CMD，COMMONJS，ESMODULE

```js
define(['a', 'b'], function(a, b){

})
AMD 依赖前置，
CONMMONJS：耦合
前两者是动态引入，后者是静态引入
静态动态引入（）

ESMODULE 不能动态引入

运行时打包，

静态引入：

```

4. 图片上传到服务器的过程（FileReader.readAsDataURL）

<input type='file' onchange=(){}>
<img src="base64"> 预览

FileReader.readAsDataURL 可以获取到图片的 base64 编码，放到img标签里就可以预览了

1. 高版本

2. 全浏览器兼容

低版本的浏览器里没有 FileReader 这个类，onchange ：你就让 input 通过表单的形式直接提交给后端，后端存储完会返回给你一个 图片url，再放到 img 中实现预览

5. token 存在 localstorage里，过期怎么处理。

token 一般存在 cookie 里

让用户重新登陆

6. node框架中的 mvc

7. mongle 与 mysql 的优势

8. less，sass，stylus，css，命名空间与css module

9. 工程化上的按需加载

10. git 上的冲突怎么解决

11. 设计模式

12. Node中的npm与版本管理（package.lock）

13. webpack

14. 后端环境的搭建

15. typescript

