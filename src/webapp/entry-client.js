import Vue from 'vue'
import {
    createApp
} from './main'

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const {
            asyncData
        } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})


const {
    app,
    router,
    store
} = createApp()

router.onReady(() => {
    // 处理前端切页 没数据时重新加载
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)

        if (!asyncDataHooks.length) {
            return next()
        }
        Promise.all(asyncDataHooks.map(hook => hook({
                store,
                route: to
            })))
            .then(() => {
                next()
            })
            .catch(next)
    })
    app.$mount("#app")
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}