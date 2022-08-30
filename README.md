# three-weixin

#### 介绍
Three.js微信小程序版/Uni-App版，
完美效果，完美移植。


#### 软件架构
完美复刻Three.js
[效果演示](https://www.bilibili.com/video/BV1Qe4y1Z7x2?share_source=copy_web&vd_source=7c04e28e67346c8e44c9b04db22d7631)


#### 安装教程(微信小程序/Uni-App)

1.  克隆或下载本仓库。
2.  在demo根目录运行
    `npm i dhtml-weixin \n npm i three-weixin \n npm i pako`
3.  小程序开发工具打开dmo目录。
4.  小程序开发工具顶部菜单->工具->构建npm
5.  刷新本项目。

#### 使用说明

1.  根目录测试页面均可删除。
2.  页面UI上加入 <canvas id="canvas_webgl" type="webgl"/>
3.  代码中，`import * as THREE from 'three'` 更换为 `import * as THREE from 'three-weixin'`
4.  代码中，`import xxx from 'three/examples/xxx'` 更换为 `import xxx from './xxx'`
5.  复制你的网页版Three.js项目页面代码(建议Vue2项目)代码到本小程序页面onLoad或onReady中。
    5.1 异步方式
    `Page({
        async onLoad() {
          getApp().canvas = await document.createElementAsync("canvas","webgl")
        }
    })`
    5.2 同步方式
    `Page({
        onLoad() {
          document.createElementAsync("canvas","webgl").then(canvas=>{
            getApp().canvas = canvas
        })
    })`
6.  所有JS文件，若用到网页对象（如window、document），请在页面顶部添加 
    `import {document,window,self,URL,requestAnimationFrame} from 'dhtml-weixin'`
7.  本项目所需模型资源访问较慢，可从网盘下载后( https://pan.baidu.com/s/1NU-9y6oeUNCUKpFBvvN7Hg?pwd=4077 )，放置到你本地或云web服务器，并修改项目访问默认域名（请在小程序代码App.js中设置）

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
