<template>
    <div class="main">
      <div class="text">我是一个组件库的组件</div>
    </div>
</template>

<script>
export default {
    name: "Demo"
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
