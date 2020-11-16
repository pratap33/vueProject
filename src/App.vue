<template>
<div id="App" class="app" >
     <router-view/>
</div>
</template>

<script>
import Vue from 'vue'
Vue.filter('currency',function(value){
    return '₹'+value;
})
Vue.filter('UpperCase',function(value){
  return value.toString().toUpperCase();
})
export default {
  name: 'app',
  data()
  {
    return{
          }
  },
}
</script>

<style lang="less">

</style>
