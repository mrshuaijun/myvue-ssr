import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter() {
  const routes = [{
      path: '/router1',
      component: resolve => require(['@pages/TestRouter'], resolve)
    },
    {
      path: '/router2',
      component: resolve => require(['@pages/TestRouter2'], resolve)
    }
  ]
  return new VueRouter({
    mode: 'history',
    routes
  })

}