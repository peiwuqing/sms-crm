<template>
  <section id="app-main" class="app-main"
           style="padding:15px;overflow: scroll">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      clientHeight:''
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  methods:{
    computeHeight(){
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.clientHeight = this.clientHeight-84;
      document.getElementById("app-main").style.cssText="padding:15px;overflow: scroll;height:"+this.clientHeight+"px;";
    }
  },
  mounted() {
    let _this  = this;
    _this.computeHeight();
    window.onresize = function(){
      _this.computeHeight();
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

