# zmfe-cli

### 安装

```
npm install zmfe-cli -g
```
***
### create

zmfe create <app-name> [-t|--template template-name]

指定目录创建指定模版到该目录，目录名将作为路由basename
```
zmfe create 98k -t mobile-router
```

在当前目录创建模版
```
zmfe create 
```

在当前目录创建指定模版
```
zmfe create -t mobile-router
```

模版名称
* mobile 移动端单页面react
* mobile-router  移动端多页面react
* react-ts react-ts模版

### 升级cli
```
npm i zmfe-cli -g
```
