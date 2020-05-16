import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Loading from '@/components/Loading'
Vue.component("Loading",Loading)
Vue.prototype.axios=axios;
Vue.config.productionTip = false;
Vue.filter("setWH",(url,arg)=>{//替换图片宽高
    return  url.replace(/w\.h/,arg)
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
