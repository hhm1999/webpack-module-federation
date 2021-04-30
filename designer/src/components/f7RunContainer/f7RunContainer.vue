<template>
  <f7-app v-if="hasF7App" :params="f7params" id="app">
    <f7-view main url="/"></f7-view>
  </f7-app>
</template>

<script>
export default {
  name: "f7RunContainer",
  props: {
    routes: {
      type: Array
    }
  },
  watch: {
    routes() {
      if (this.routes && this.routes.length > 0) {
        this.hasF7App = true
      } else {
        this.hasF7App = false
      }
    }
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
            //   try {
            //     // eslint-disable-next-line no-undef
            //     TTJSBridge.invoke('ui', 'setCurrentPageTitle', JSON.stringify({ title: window.document.title }));
            //   } catch (e) {
            //     // continue regardless of error
            //   }
            // }
          },
        },
        view: {
          pushState: true,
        },
      };
    }
  },
  data() {
    return {
      hasF7App: false,
    };
  },
  created () {
  
  },
  components: {
  }
}
</script>

<style scoped lang="less">

</style>
