import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './createRouter' // routers control

import * as filters from './filters' // global filters
import mixin from './utils/mixins'

import searchItem from './components/myComponents/searchItem'
import trainingItem from './components/myComponents/trainingItem'
Vue.component('searchItem', searchItem);
Vue.component('trainingItem', trainingItem);

Vue.mixin(mixin)
Vue.use(Element, {
    size: 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value),
    zhLocale
})

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.directive('focus', function (el) {
    el.querySelector('input').focus()
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
