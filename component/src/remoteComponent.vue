<template>
    <div class="main">
      <div class="text">我是一个组件库的组件 ~~ {{ test }}</div>
    </div>
</template>

<script>
import utils from './utils'
export default {
    name: "Demo",
    created() {
      console.log(utils.isMobile());
    },
    computed: {
      test() {
          return this.$store.state.remoteComponent.test;
      }
    }
}
</script>

<style scoped lang="less">
.main {
  padding: 20px;
  background-color: #409EFF;
  display: inline-block;
  .text{
    font-size: 16px;
    color: #fff;
  }
}
</style>
