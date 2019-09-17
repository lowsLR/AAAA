<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/"></router-link> -->
    </div>
    <router-view />
    <keep-alive>
      <FooterMusic />
    </keep-alive>
  </div>
</template>


<script>
import FooterMusic from "./components/FooterMusic/FooterMusic";
export default {
  name: "App",
  components: {
    FooterMusic
  }
};
</script>
<style>
/* body {
  width: 100%;
  height: 100%;
  background-image: url("../public/image/005.jpg");
  background-size: cover;
} */
</style>