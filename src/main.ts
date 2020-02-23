import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/model/store/root.store";
import vuetify from "@/plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$vuetify.theme.dark = true;
  }
}).$mount("#app");
