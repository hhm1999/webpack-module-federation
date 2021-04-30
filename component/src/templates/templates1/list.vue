<template>
    <f7-page class="home">
        模板1-列表
    </f7-page>
</template>

<script>
import { f7ready } from 'framework7-vue/framework7-vue.esm.bundle';

export default {
    name: 'list',
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
    async created() {
      
    },
    async mounted() {
        // f7ready(() => {
        //     console.log('f7ready123');
        // });
        await this.$store.dispatch('remoteComponent/init');
    },
    methods: {
    },
};
</script>

<style lang="less" scoped>
</style>
