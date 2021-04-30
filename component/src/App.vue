<template>
    <f7AppPack :routes="routes">
        
    </f7AppPack>
</template>

<script>
import routes from './templates/templates1/routes.js';
import f7AppPack from './f7AppPack';

export default {
    name: 'App',
    data() {
        return {
          routes: routes,
        };
    },
    computed: {
    },
    methods: {
    },
    created() {
    },
    beforeDestroy() {
    },
    components: {
      f7AppPack
    }
};
</script>

<style lang="less">

</style>

