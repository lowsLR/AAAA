<template>
  <div class="find-layout">
    <Swiper :banners="banners" />
    <Icon />
    <ReSong />
    <NewDisc />
    <Interval />
    <VideoList />
  </div>
</template>

<script>
import Swiper from "./Swiper/Swiper";
import Icon from "./Icon/Icon";
import ReSong from "./Re-Song/ReSong";
import NewDisc from "./NewDisc/NewDisc";
import VideoList from "./VideoList/VideoList";
import Interval from "../Interval/Interval";
export default {
  name: "Find",
  components: {
    Swiper,
    Icon,
    ReSong,
    NewDisc,
    VideoList,
    Interval
  },
  data() {
    return {
      banners: []
    };
  },
  mounted() {
    this.getBannersDate();
  },
  methods: {
    async getBannersDate() {
      let res = await this.$http(`http://47.100.48.11:4000/banner`);
      try {
        res = res.data;
        this.banners = res.banners;
        // console.log(res.banners);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>