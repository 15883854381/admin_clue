<template>
    <section class="app-main">
        <router-view class="animate__animated animate__fadeIn" :key="key" />
    </section>
</template>
  
  <script>
export default {
    name: 'AppMain',
    computed: {
        key() {
            this.$bus.$emit('handleActive', this.$route)
            return this.$route.path
        }
    }
}
</script>
  
  <style scoped lang="less">
  .app-main {
      /*50 = navbar  */
      min-height: calc(100vh - 50px);
      width: 100%;
      position: relative;
      overflow: hidden;
      background: #F6F9F8;
  }
  
  .fixed-header+.app-main {
      padding-top: 50px;
  }
  </style>
  
  <style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}

</style>
  