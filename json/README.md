# 太子党关系网络 可交互数据可视化
将编程随想的《太子党关系网络》数据可视化了。来这儿 [zhao-visualized.netlify.app](https://zhao-visualized.netlify.app) 看看这些人之间到底都有啥关系。这网站手机上用不太了，最好整个电脑，上电脑上去看去。
## 简介
这项目大致有两个部分，一个是用js进行的yaml到json转换，一个是用nuxt和echarts搞得可视化网站。
### yaml到json的转换
---

想用的话得先安装东西

    npm install

然后确认这个文件夹里面有编程随想的zhao-master文件夹 [没有的话从这儿点那个绿按钮下载](https://github.com/programthink/zhao)

然后直接在这个文件夹跑 

    node jsonConverter.js

zhao.json就是跑完之后生成的文件
### Nuxt数据可视化
---
Nuxt前端部分和此项目独立。前端的Repo在 [github.com/LuoSheng12345/zhao-visualized](https://github.com/LuoSheng12345/zhao-visualized)。来这儿 [zhao-visualized.netlify.app](https://zhao-visualized.netlify.app) 看网站。
    
## 数据来源
数据来自编程随想的 [太子党关系网络](https://github.com/programthink/zhao)
