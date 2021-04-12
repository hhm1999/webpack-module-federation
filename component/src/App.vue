<template>
    <div>
      <div class="app">组件库项目</div>
      <remoteComponent/>
    </div>
</template>

<script>
import remoteComponent from './remoteComponent';
export default {
    name: "App",
    components: {
      remoteComponent
    }
}
</script>

<style scoped lang="less">
.app {
    font-size: 20px;
    color: #409EFF;
}
</style>
