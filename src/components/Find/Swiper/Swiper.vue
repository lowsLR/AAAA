<template>
  <div class="banner-layout">
    <div class="banner-bottom"></div>
    <div class="banner-superstratum">
      <van-swipe :autoplay="3000" indicator-color="rgb(231, 22, 39)" class="van-swipes">
        <van-swipe-item v-for="(image,index) in banners" :key="index" class="van-swiper">
          <div class="image">
            <img :src="image.imageUrl" alt="图片" lazy-load />
          </div>
          <div class="label" :style="`background:${image.titleColor}`">{{image.typeTitle}}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: ["banners"],
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.banner-layout {
  width: 100%;
  margin-top: 44px;
  .van-swiper {
    position: relative;
    .label {
      position: absolute;
      bottom: 0.06rem;
      right: 0;
      padding: 0.11rem;
      font-size: 0.27rem;
      color: #fff;
      border-top-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  .banner-bottom {
    background: $bg-color;
    width: 100%;
    padding: 15% 0;
    background: $bg-color;
  }
  .banner-superstratum {
    width: 100%;
    padding: 10px 15px;
    margin-top: -30%;
  }
  .van-swipes {
    border-radius: 6px;
  }
}

img {
  width: 100%;
  border-radius: 6px;
}
</style>