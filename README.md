# three-weixin

#### 介绍
Three.js微信小程序版，
完美效果，完美移植。


#### 软件架构
完美复刻Three.js


#### 安装教程

1.  克隆或下载本项目。
2.  npm i dhtml-weixin 和 npm i three-weixin 和 npm i pako
3.  小程序开发工具打开本目录。
4.  小程序开发工具顶部菜单->工具->构建npm
5.  刷新本项目。

#### 使用说明

1.  根目录测试页面均可删除。
2.  复制你的网页版Three.js项目(建议Vue2项目)代码到本小程序项目。
3.  若用到网页对象（如window、document），请在页面顶部添加 import {document,window,requestAnimationFrame} from 'dhtml-weixin'
4.  import * as THREE from 'three' 更换为 import * as THREE from 'three-weixin'
5.  import xxx from 'three/examples/xxx' 更换为 import * as THREE from './xxx'(相对路径)

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
