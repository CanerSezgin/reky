import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics';
import './filters';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-145060126-1',
});

Vue.mixin({
  methods: {
    newRequest(qs = '?title=Untitled Request') {
      const currentPath = decodeURIComponent(this.$route.fullPath);
      const newPath = `/${qs}&timestamp=${new Date().getTime()}`;
      const isSamePath = currentPath === newPath;
      console.log(newPath);
      if (!isSamePath) {
        this.$router.push(newPath);
      }
    },
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: function(h) {
    return h(App);
  },
}).$mount('#app');
