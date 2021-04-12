<template>
    <div>
	    <div class="app">活动可视化设计器项目</div>
      <remoteComponent v-if="loaded"/>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "App",
  data() {
    return {
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
      this.loaded = true
    }, 1000);
  },
  components: {
  }
}
</script>

<style scoped lang="less">
.app {
    font-size: 20px;
    color: #F56C6C;
}
</style>
