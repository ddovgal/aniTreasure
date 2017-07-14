<template>
  <div id="image-holder">
    <img src="../assets/nothingHere.png"/>
    <div class="display-2">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'errorPage',
  data () {
    return {
      msg: 'Nothing here...'
    }
  }
}
</script>

<style scoped>
#image-holder {
  position: fixed;
  left: 0px;
  bottom: 48px;
  max-width: 100%;
}

img {
  position: relative;
  bottom: 2px;
  max-width: 100%;
}

.display-2 {
  position: absolute;
  top: 12%;
  right: 0px;
  text-align: left;
  width: 3.65em;
}
</style>
