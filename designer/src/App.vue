<template>
    <div>
	    <div class="app">活动可视化设计器项目</div>
      <remoteComponent v-if="loaded"/>
      <f7AppPack v-if="loaded" :routes="routes"></f7AppPack>
    </div>
</template>

<script>
import Vue from 'vue';
// import f7RunContainer from './components/f7RunContainer/f7RunContainer';
// import { f7ready } from 'framework7-vue/framework7-vue.esm.bundle';
export default {
  name: "App",
  data() {
    return {
      routes: null,
      loaded: false
    }
  },
  created () {
    setTimeout(() => { // 模拟网络加载组件列表
      window.libraryRemoteEntryUrl = 'http://localhost:3001/remoteEntry.js?v=' + Date.parse(new Date());
      Vue.component(
        'remoteComponent',
        () => import('component/remoteComponent')
      )
      import('component/remoteComponent.store').then(store => {
        this.$store.registerModule('remoteComponent', store.default)
      })
      Vue.component(
        'f7AppPack',
        () => import('component/f7AppPack')
      )
      import('component/routes').then(routes => {
        this.routes = routes.default
      })
      this.loaded = true
    }, 1000);
    // f7ready(() => {
    //     window.f7 = this.$f7; // 挂在到全局解决babel问题
    //     console.log('@@@@', window.f7);
    // });
  },
  components: {
    // f7RunContainer
  }
}
</script>

<style scoped lang="less">
.app {
    font-size: 20px;
    color: #F56C6C;
}
</style>
