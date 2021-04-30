import Vue from 'vue';
import Vuex from 'vuex';
import remoteComponent from './remoteComponent';

Vue.use(Vuex);



export default new Vuex.Store({
    modules: {
      remoteComponent
    }
});
