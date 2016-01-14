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
#####这个是应该用正则匹配的, 以后用的时候再改
```
<ant-Select multiple ant-options='list' ant-field='code,value' ng-model='testselect'></ant-Select>
```
+ multiple:可选，多选模式
+ ant-field:可选，ant-option取值的显示和值，默认是code,value
+ ng-model:此处双向绑定有问题，当外部数据模型改变并没有重新绘制select默认值，需要研究怎么销毁或者重新绘制

***

###全局提示
####调用service的方法
`antAlert.success('成功信息',2000)`
`antAlert.info('提示信息',2000)`
`antAlert.error('错误信息',2000)`

`var handle = antAlert.loading('加载信息')`
返回句柄调用解除提示:
`handle()`

***
