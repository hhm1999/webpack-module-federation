<template>
    <f7-app v-if="routes" :params="f7params" id="app">
        <f7-view main url="/"></f7-view>
    </f7-app>
</template>

<script>
// import routes from './templates/templates1/routes.js';
// import remoteComponent from './remoteComponent';

export default {
    name: 'App',
    props: {
      routes: {
        type: Array,
      }
    },
    data() {
        return {
        };
    },
    computed: {
      f7params() {
        return {
          id: 'com.myapp.app',
          name: 'TT EF',
          theme: 'ios',
          routes: this.routes,
          on: {
              routeChange: newRoute => {
                  // 修改标题
                  window.document.title = newRoute.name;
                  // if (window.myWebview.isInApp()) {
                  //     try {
                  //         // eslint-disable-next-line no-undef
                  //         TTJSBridge.invoke('ui', 'setCurrentPageTitle', JSON.stringify({ title: window.document.title }));
                  //     } catch (e) {
                  //         // continue regardless of error
                  //     }
                  // }
              },
          },
          view: {
              pushState: true,
          },
        }
      }
    },
    methods: {
    },
    created() {
      this.$f7ready(() => {
          console.log(this.$f7);
          window.f7 = this.$f7; // 挂在到全局解决babel问题
      });
    },
    beforeDestroy() {
    },
    components: {
      // remoteComponent,
    }
};
</script>

<style lang="less">

</style>

