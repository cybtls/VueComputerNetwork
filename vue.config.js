module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080/', //自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }