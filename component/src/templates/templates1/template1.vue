<template>
    <f7-page class="home">
      模板1-首页
      <div @click="toListPage">去列表页</div>
    </f7-page>
</template>

<script>
import { f7ready } from 'framework7-vue/framework7-vue.esm.bundle';

export default {
    name: 'template1',
    components: {
    },
    data() {
        return {
        };
    },
    computed: {
    },
    watch: {
    },
    created() {
    },
    async mounted() {
        this.$f7ready(() => {
            console.log('f7ready');
        });
    },
    methods: {
      toListPage() {
          this.$f7router.navigate('/list', {
              pushState: true,
              history: true,
          });
      },
    },
};
</script>

<style lang="less" scoped>
</style>
