import {
    createApp
} from './main'
// 核心目的两个
// 获取每一个当前路由
// components异步的数据 组装成一个页面
// 把后端请求的这套流程数据交给context.state
export default context => {

    return new Promise((resolve, reject) => {
        const {
            app,
            router,
            store
        } = createApp()

        // 设置服务器端 router 的位置
        // router是前端的路由 context.url是后台给的路由
        router.push(context.url)

        router.onReady(() => {
            const matchComponents = router.getMatchedComponents()
            // 用于给服务端判断是否404
            if (!matchComponents.length) {
                return reject({
                    code: 404
                })
            }

            Promise.all(matchComponents.map((component) => {
                if (component.asyncData) {
                    const asyncData = component.asyncData({
                        store,
                        app
                    })
                    if (Array.isArray(asyncData)) {
                        return Promise.all(asyncData)
                    } else {
                        return asyncData
                    }

                }

            })).then(() => {
                // 读取完把后台state返回给前端
                context.state = store.state
                resolve(app)
            }).catch(reject)
        }, reject)

    })
}