网页资源下载工具
=============

## 解决了什么问题？
当遇见一个优秀网站时，我们不免想学习它具体的实现方式。传统的方法是打开浏览器开发者工具，将资源一个个下载到本地运行。当涉及到大量图片要下载的时候，就比较头疼了。WebResFetcher可以根据配置将网站图片一次过下载到本地指定目录。

## 实现原理
WebResFetcher的实现原理是分析JS代码，使用正则表达式匹配JS文件中的图片路径，然后发起http请求将图片保存到本地。

## 用到的NodeJS工具
+ mkdirp，用于检测和创建本地文件夹

## 使用方法：
只需配置3个参数即可，分别是：
+ refFiles：用于分析图片路径的JS文件，数据类型为数组
+ resHost：服务器主机地址
+ resPath：项目路径

例子：
> var refFiles  = ['game-1.1.4.min.js', 'PxLoader.min.js', 'PxLoaderImage.min.js', 'tge-0.3.5.min.js', 'viewporter.min.js'],      
>     resHost = 'static.tresensa.com',                           
>     resPath = '/vector-runner-remix/assets-1.1.4/';            
