import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './permission'

Vue.config.productionTip = false

const files = require.context('./components/svg-icon', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
