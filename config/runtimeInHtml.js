const pluginName = 'RuntimeInHtml';
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 把runtime打进html
class RuntimeInHtml {
    constructor(name) {
        this.name = name || "runtime"
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            let runtimeJs = ""
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(pluginName, (data, cb) => {
                // console.log(data.plugin.assetJson)
                const assetTags = data.assetTags
                let manifestAssetName = getAssetName(compilation.chunks, this.name)

                if (manifestAssetName) {
                    assetTags.scripts.forEach((item, index) => {
                        // 找到runtime 删除掉
                        if (item.attributes.src.indexOf(this.name) > -1) {
                            assetTags.scripts.splice(index, 1)
                        }
                    })
                }
                cb(null, data)
            })

            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(pluginName, (data, cb) => {
                // console.log(data.plugin.assetJson)
                let runtime = []
                let assets = data.assets
                let manifestAssetName = getAssetName(compilation.chunks, this.name)
                if (manifestAssetName) {
                    runtime.push('<script>')
                    runtime.push(compilation.assets[manifestAssetName].source())
                    runtime.push('</script>')

                    let runtimeIndex = assets.js.indexOf(assets.publicPath + manifestAssetName)
                    if (runtimeIndex >= 0) {
                        assets.js.splice(runtimeIndex, 1)
                    }
                }
                runtimeJs = runtime.join('')
                cb(null, data)
            })


            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(pluginName, (data, cb) => {
                let _html = data.html
                _html = _html.replace("<!--runtime-->", runtimeJs)
                data.html = _html
                cb(null, data)
            })


        });
    }
}

function getAssetName(chunks, chunkName) {
    return (chunks.filter(function (chunk) {
        return chunk.name === chunkName
    })[0] || {
        files: []
    }).files[0]
}

module.exports = RuntimeInHtml