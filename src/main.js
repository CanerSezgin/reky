import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: "UA-145060126-1",
});

new Vue({
  router,
  store,
  vuetify,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
