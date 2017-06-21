<template>
<div id="app">
  <router-view></router-view>
  <md-bottom-bar ref="bottomBar">
    <md-bottom-bar-item md-icon="add" @click.native="manualRoute('AddPicture')" ref="/add">Add</md-bottom-bar-item>
    <md-bottom-bar-item md-icon="explore" @click.native="manualRoute('Explore')" ref="/">Explore</md-bottom-bar-item>
    <md-bottom-bar-item md-icon="search" @click.native="manualRoute('Search')" ref="/search">Search</md-bottom-bar-item>
  </md-bottom-bar>
</div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    manualRoute (name) {
      this.$router.push({
        name
      })
    }
  },
  // useing for setting iem-active on first interact
  mounted () {
    const path = this.$route.path
    const bottomBar = this.$refs.bottomBar
    bottomBar.setActive(this.$refs[path])
  }
}
</script>

<style>

</style>
