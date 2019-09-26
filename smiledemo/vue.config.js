import { url } from "./src/serviceApi.config";
module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: url.regiestUser,
          changeOrigin: true,
          pathRewrite:{
            "^/api":""
          }
        }
      }
    }
  }