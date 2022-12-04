<template>
  <div id='app'>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>

export default {
  mounted () {
    this.$store.dispatch('getinfoActions')
    this.$store.dispatch('getcartActions')
  }
}
</script>

<style>
#app{
  text-align: center;
  font-family: 'RSU';
}
</style>
