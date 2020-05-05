const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const vueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')
const rootPath = path.join(__dirname, "..")
const os = require('os')

module.exports = {
  mode: 'production',
  entry: rootPath + "/src/webapp/entry-client.js",
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        // parallel: true
        parallel: os.cpus().length
      })
    ],
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [rootPath + 'dist']
    }),
    new vueSSRClientPlugin()
  ]
}