import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueLinkPreview from 'vue-link-preview'

Vue.component(VueLinkPreview);
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_REMOTE_API;
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
