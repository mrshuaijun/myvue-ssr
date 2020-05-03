const path = require('path')
const rootPath = path.join(__dirname, "..")
const vueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = {
  entry: rootPath + "/src/webapp/entry-client.js",
  // 分割代码
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new vueSSRClientPlugin()
  ]
}