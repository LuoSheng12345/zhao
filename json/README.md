# 太子党关系网络 yaml到json转换器
将编程随想的《太子党关系网络》的yaml数据转换成方便echarts使用的json。

## yaml到json的转换

想用的话得先安装东西。首先安装Node.js。来这里[nodejs.org](https://nodejs.org/en/)下载LTS版本。

装好之后在这个文件夹内运行这个指令:

    npm install

然后直接在这个文件夹跑 

    node jsonConverter.js

zhao.json就是跑完之后输出的文件

## 数据结构

    {
        nodes:[],
        links:[],
        categories:[]
    }

## Nuxt数据可视化
---
Nuxt前端部分和此项目独立。前端的Repo在 [github.com/LuoSheng12345/zhao-visualized](https://github.com/LuoSheng12345/zhao-visualized)。来这儿 [zhao-visualized.netlify.app](https://zhao-visualized.netlify.app) 看网站。
    
## 数据来源
数据来自编程随想的 [太子党关系网络](https://github.com/programthink/zhao)
