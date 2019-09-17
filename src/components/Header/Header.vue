<template>
  <div class="music-header">
    <van-tabs
      v-model="active"
      swipeable
      title-active-color="#fff"
      lazy-render
      :animated="true"
      line-width="0"
      background="rgb(231, 22, 39)"
      title-inactive-color="#E0E0E0"
      :swipe-threshold="6"
    >
      <van-tab title disabled></van-tab>
      <van-tab title="我的">内容 1</van-tab>
      <van-tab title="发现">
        <Find />
      </van-tab>
      <van-tab title="朋友">内容 3</van-tab>
      <van-tab title="视频"></van-tab>
      <van-tab title disabled></van-tab>
    </van-tabs>
    <van-icon name="wap-nav" class="left" />
    <van-icon name="search" class="right" @click="search" />
  </div>
</template>

<script>
import Find from "../Find/Find";
export default {
  name: "Header",
  components: {
    Find
  },
  data() {
    return {
      active: 2, 
      titleName: ""
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: "/search"
      });
    }
  }
};
</script>

<style lang="scss">
.music-header {
  .left {
    position: fixed;
    top: 10px;
    z-index: 100;
    font-size: 20px;
    padding-left: 10px;
    color: #fff;
    z-index: 100;
  }
  .right {
    position: fixed;
    top: 10px;
    right: 0px;
    z-index: 100;
    font-size: 20px;
    padding-right: 10px;
    color: #fff;
    z-index: 100;
  }
  .fontSize {
    font-size: 38px;
  }
}

.van-tabs__wrap.van-hairline--top-bottom::after {
  border: 0 solid transparent;
}

.van-tabs__wrap.van-hairline--top-bottom {
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0;
  z-index: 100;
}
</style>