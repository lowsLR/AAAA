<template>
  <div class="icon-layout">
    <div class="icon-container">
      <div class="icon">
        <div class="box">
          <van-icon name="send-gift" size="0.5rem" color="#fff" />
        </div>每日推荐
      </div>
      <div class="icon">
        <div class="box">
          <van-icon name="music" size="0.5rem" color="#fff" />
        </div>歌单
      </div>
      <div class="icon">
        <div class="box">
          <van-icon name="hot" size="0.5rem" color="#fff" />
        </div>排行版
      </div>
      <div class="icon">
        <div class="box">
          <van-icon name="graphic" size="0.5rem" color="#fff" />
        </div>电台
      </div>
      <div class="icon">
        <div class="box">
          <van-icon name="live" size="0.5rem" color="#fff" />
        </div>直播
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Icon"
};
</script>
<style lang="scss" scoped>
.icon-layout {
  padding: 10px 10px 20px;
  border-bottom: 1px solid bbcolor(0.6);
  .icon-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.25rem;
    }
  }
  .box {
    width: 0.9rem;
    height: 0.9rem;
    background-color: $bg-color;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.22rem;
  }
}
</style>