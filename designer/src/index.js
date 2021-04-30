import Vue from 'vue';
import Framework7 from 'framework7/framework7-lite.esm.bundle';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle';
import router from './router';
import App from './App';
import store from './store'

Framework7.use(Framework7Vue);

const isProd = process.env.NODE_ENV === 'production';

Vue.config.productionTip = isProd;
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
