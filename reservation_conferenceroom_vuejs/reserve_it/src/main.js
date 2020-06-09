// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueMomentJS from 'vue-momentjs'
import moment from 'moment'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueBlogPlaceholders from 'vue-blog-placeholders'
// import Body from './components/Body'

Vue.use(VueMomentJS, moment)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueBlogPlaceholders)
// Vue.component(Body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
