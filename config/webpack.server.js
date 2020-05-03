const path = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const rootPath = path.join(__dirname, "..")
const nodeExternals = require('webpack-node-externals')
const vueSSRServerPlugin = require('vue-server-renderer/server-plugin')
module.exports = {
    mode: _mode,
    entry: rootPath + "/src/webapp/entry-server.js",
    output: {
        libraryTarget: "commonjs2"
    },
    target: 'node',
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new vueSSRServerPlugin(),
    ],

}