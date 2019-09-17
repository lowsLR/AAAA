<template>
  <div class="video-layout">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="video-header">
        <div class="title">云村精选</div>
        <div class="move" @click="addNweVideo">
          <van-icon name="replay" />获取更多内容
        </div>
      </div>
      <div class="video-list">
        <div class="video-container" v-for="video in videoListData" :key="video.id">
          <div class="video-content">
            <div class="img" @click="transferId(video.id)">
              <img :src="video.cover" alt="视频封面" lazy-load />
              <div class="playCount-time">
                <div class="playCount">
                  <van-icon name="play" />
                  {{video.playCount | countFilter}}
                </div>
                <div class="time"></div>
              </div>
              <div class="bigPlay">
                <van-icon name="play" />
              </div>
            </div>
            <div class="name">{{video.name}}</div>
          </div>
          <div>
            <!-- <Interval /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Interval from "../../Interval/Interval";
export default {
  name: "VideoList",
  components: {
    // Interval
  },
  data() {
    return {
      videoListData: [],
      limit: 5,
      busy: false,
      interface: "/mv/first",
      num: 0
    };
  },
  methods: {
    async getVideoListData() {
      let res = await this.$http(
        `http://47.100.48.11:4000${this.interface}?limit=${this.limit}`
      );
      try {
        res = res.data;
        // console.log(res, "video");
        this.videoListData = res.data;
        // console.log(this.videoListData, "videoListData");
        this.$nextTick(() => {});
      } catch (err) {
        console.log(err);
      }
    },
    transferId(id) {
      // console.log(id);
      // var id = id;
      this.$router.push({
        path: `/mv/${id}`
      });
    },
    addNweVideo() {
      // this.limit += 5;
      // console.log("aaa", this.limit);
      this.num += 1;
      if (this.num == 1) {
        this.interface = "/mv/all";
      }
      if (this.num == 2) {
        this.interface = "/mv/first";
      }
      if (this.num > 2) {
        this.num = 1;
        this.interface = "/mv/all";
      }
      // console.log(this.num, "+1");
      // console.log("aaa", this.limit);
      this.getVideoListData();
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.limit += 5;
        this.getVideoListData();
        this.busy = false;
      }, 1000);
    }
  },
  mounted() {
    this.getVideoListData();
  }
};
</script>

<style lang="scss" scoped>
.video-layout {
  width: 100%;
  .video-header {
    padding: 10px;
    height: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid bbcolor(0.5);
    .title {
      font-size: 0.34rem;
      font-weight: 550;
      padding-right: 0.11rem;
    }
    .move {
      font-size: 0.25rem;
      font-weight: 100;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  .video-container {
    padding: 10px;
    .video-content {
      border-radius: 6px;
      overflow: hidden;
      padding: 0;
      margin: 0;
      .name {
        width: 100%;
        font-size: 0.35rem;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1rem;
        padding: 0 10px;
        background: rgba(202, 199, 199, 0.2);
      }
    }
    .img {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        display: block;
      }
      .playCount-time {
        position: absolute;
        bottom: 5px;
        left: 5px;
        .playCount {
          font-size: 0.25rem;
          color: #fff;
        }
      }
      .bigPlay {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 1.09rem;
        color: rgba(231, 231, 224, 0.4);
        margin-left: -0.54rem;
        margin-top: -0.54rem;
      }
    }
  }
}
</style>