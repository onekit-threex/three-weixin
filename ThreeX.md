![链接](./logo.jpeg)

# ThreeX(微信小程序插件)
# 支持Ammo（WASM/JS双模式）
# 牛逼可用,请点星.

#### 介绍
全网最强 Three.js 微信小程序版(兼容Uni-App版）。
完美效果，完美移植。
问题反馈（QQ群185654475）

#### 软件架构
完美复刻Three.js[效果演示](https://www.bilibili.com/video/BV1Qe4y1Z7x2?share_source=copy_web&vd_source=7c04e28e67346c8e44c9b04db22d7631)

![输入图片说明](1.png)
![输入图片说明](2.png)

#### 项目使用(微信小程序/Uni-App)

1.  安装

    1.1. 安装依赖

    ```
    npm i dhtml-weixin
    ```

    1.2.  app.json的plugins节点添加

    ```
      "ThreeX": {
        "provider": "wx5d6376b4fc730db9",
        "export": "threex.js"
      }
    ```

    1.3. 根目录添加threex.js文件

    ```
    module.exports = {
        getApp() {
            return getApp()
        },
        getCurrentPages() {
            return getCurrentPages()
        }
        wx_request() {
            return wx.request
        }
    }
    ```

    1.4.  编译（刷新）你的项目。

2.  页面UI上加入 

    ```
    <canvas id="canvas_webgl" type="webgl"/>
    ```

3.  代码中，使用three换为使用ThreeX

    ```
    import * as THREE from 'three'
    ```
    更换为
    ```
    const THREE = requirePlugin('ThreeX');
    ```

4.  代码中，替换examples中内容

    ```
    import xxx from 'three/examples/xxx'
    ``` 
    更换为
    ```
    import xxx from './xxx'
    ```

5.  复制你的网页版Three.js项目页面代码(建议Vue2项目)代码到本小程序页面onLoad或onReady中。

    5.1 异步方式

    ```
    var requestId // 来自 requestId = requestAnimationFrame()
    Page({
        async onLoad() {
            const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl");
            //组件中使用 getApp().canvas = await document.createElementAsync("canvas","webgl",this);
             const renderer = this.renderer = new THREE.WebGLRenderer( { canvas:canvas3d, antialias: true } );
            /*你的代码 */
        },
        onUnload(){
            cancelAnimationFrame(requestId)
            this.renderer.dispose()
            this.renderer.forceContextLoss()
            this.renderer.context = null
            this.renderer.domElement = null
            this.renderer = null
        },
    })
    ```

    5.2 同步方式

    ```
    var requestId // 来自 requestId = requestAnimationFrame()
    Page({
        onLoad() {
            document.createElementAsync("canvas","webgl").then(canvas=>{
                //组件中使用 document.createElementAsync("canvas","webgl",this).then(canvas=>{
                const canvas3d = this.canvas = canvas;
                const renderer = this.renderer = new THREE.WebGLRenderer( { canvas:canvas3d, antialias: true } );
                /*你的代码 */
            })
        },
        onUnload(){
            cancelAnimationFrame(requestId)
            this.renderer.dispose()
            this.renderer.forceContextLoss()
            this.renderer.context = null
            this.renderer.domElement = null
            this.renderer = null
       },
    })
    ```

6.  所有JS文件，若用到网页对象（如window、document），请在页面顶部添加 
    ```
    import {document,window,self,URL,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin'
    ```

7.  添加事件

    7.1 页面UI改造为
      ```
     <canvas id="canvas_webgl" type="webgl"
        disable-scroll="true"
        bindtouchcancel="webgl_touch"
        bindtouchend="webgl_touch"
        bindtouchmove="webgl_touch"
        bindtouchstart="webgl_touch"
        />
    ```

    7.2 页面代码添加

    ```
    const THREE = requirePlugin('ThreeX');
Page({
       webgl_touch(e){
            const web_e = Event.fix(e)
            document.dispatchEvent(web_e)
            window.dispatchEvent(web_e)
            this.renderer && this.renderer.dispatchEvent(web_e)
        },
    })
    ```

8.  模型资源，建议放置到你本地(推荐IIS)或云web服务器，并修改项目访问默认域名（请在小程序代码App.js中设置）


#### 常见问题（FAQ）

1. 图片/材质，按微信小程序要求，尺寸请小于2000x2000，体积小于2M（若图片来自CDN，请在url后边加缩放尺寸参数）。
2. onUnload记得释放资源。
3. 不要app.js在和页面const THREE = requirePlugin('ThreeX');
Page({})外部,里存放大数据。
4. Uni-App支持App.js不好，全局配置可能会失效。
5. 部分Android显示GLB模型，若黑屏，请添加环境光和点光源，增加模型粗糙度。
