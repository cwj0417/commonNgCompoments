## ant.design的ui的一些ng封装
使用了[ant0.9.x](http://09x.ant.design/components/)的ant版本
与[ant最新版本](http://ant.design/components/)用法相差较大,没有使用JSX
[ant的github](https://github.com/ant-design/ant-design)

***

##依赖
+ ~angular1.3.8
+ ~react 0.13.3
+ ant 的js 和css 0.9.x
+ ?~jquery 2.0.0

***

###select框
```js
<ant-Select multiple ant-options='list' ant-field='code,value' ng-model='testselect'></ant-Select>
```