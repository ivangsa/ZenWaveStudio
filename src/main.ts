import '@/router/register-component-route-guards';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/RootStore';
import vuetify from '@/plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@mdi/js';
import VueStoreModules from '@/store/StoreModules';
import VuetifyToastServicePlugin from '@/views/components/toast-service/ToastService';

Vue.config.productionTip = false;
Vue.use(VueStoreModules);
Vue.use(VuetifyToastServicePlugin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    //this.$vuetify.theme.dark = true;
    this.$projectState.$vue = this;
  }
}).$mount('#app');
