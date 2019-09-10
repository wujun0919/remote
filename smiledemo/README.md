# smiledemo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 使用淘宝的源
    --registry=htttps://registry.npm.taobao.org

### babel引入组件
npm i babel-plugin-import -D

"plugins":[
    ["import",{"libraryName":"vant","style":true}]
  ]

import { Button } from "vant";

Vue.use(Button)

