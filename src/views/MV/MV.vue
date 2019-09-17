<template>
  <div class="mv-layout">
    <div class="mv-container">
      <div class="black" @click="goBlack">
        <van-icon name="arrow-left" />
      </div>
      <div class="video-msk">
        <div class="brs">
          <video
            width="100%"
            controls
            :poster="Mvdata.cover"
            x5-video-player-fullscreen="true"
            x5-playsinline
            playsinline
            webkit-playsinline
            preload="auto"
          >
            <source v-if="MvUrl" :src="Mvdata.brs['240']" />
          </video>
        </div>
        <div class="name">
          <span>MV</span>
          {{Mvdata.name}}
        </div>
        <div class="likeCount-commentCount">
          <div class="head-portrait">{{Mvdata.artistName}}</div>
          <div class="likeCount">
            <van-icon name="good-job-o" />
            {{Mvdata.likeCount}}
          </div>
          <div class="commentCount">
            <van-icon name="comment-o" />
            {{Mvdata.commentCount}}
          </div>
          <div class="ellipsis">
            <van-icon name="ellipsis" />
          </div>
        </div>
      </div>
      <div class="video-msk" v-for="rcmd in rcmdData" :key="rcmd.id">
        <div class="brs">
          <video
            width="100%"
            controls
            :poster="rcmd.cover"
            x5-video-player-fullscreen="true"
            x5-playsinline
            playsinline
            webkit-playsinline
            preload="auto"
          >
            <source v-if="rcmd.brs" :src="rcmd.brs['240']" />
          </video>
        </div>
        <div class="name">
          <span>MV</span>
          {{rcmd.name}}
        </div>
        <div class="likeCount-commentCount">
          <div class="head-portrait">{{rcmd.artistName}}</div>
          <div class="likeCount">
            <van-icon name="good-job-o" />
            {{rcmd.likeCount}}
          </div>
          <div class="commentCount">
            <van-icon name="comment-o" />
            {{rcmd.commentCount}}
          </div>
          <div class="ellipsis">
            <van-icon name="ellipsis" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Interval from "../../components/Interval/Interval";
import axios from "axios";
export default {
  name: "MV",
  components: {
    // Interval
  },
  data() {
    return {
      id: "",
      Mvdata: [],
      MvUrl: "",
      rcmdId: [],
      rcmdData: [],
      rcmdUrl: []
    };
  },
  mounted() {
    this.receiveId();
    this.getMvData();
    this.getMvRcmdData();
    // this.$nextTick(() => {
    this.getMvRcmdPlay();
    // });
  },
  methods: {
    async getMvData() {
      //   console.log(this.id,"this.id")
      let res = await this.$http(
        `http://47.100.48.11:4000/mv/detail?mvid=${this.id}`
      );
      try {
        res = res.data;
        // console.log(res.data.brs);
        this.Mvdata = res.data;
        this.MvUrl = res.data.brs[480];
        // console.log(this.Mvdata, " this.Mvdata");
      } catch (err) {
        console.log(err);
      }
    },
    receiveId() {
      var params = this.$route.params;
      //   console.log(params, "params");
      this.id = params.id;
      // console.log(this.id, "id");
    },
    goBlack() {
      this.$router.go(-1);
    },
    async getMvRcmdData() {
      //   console.log(this.id,"this.id")
      let resData = await this.$http(
        `http://47.100.48.11:4000/mv/exclusive/rcmd`
      );
      try {
        resData = resData.data;
        // console.log(resData, "aaaa");
        // this.rcmdId = resData.data;
        // console.log(this.rcmdId, " this.rcmdData");

        for (var i = 0; i < resData.data.length; i++) {
          this.rcmdId.push(resData.data[i].id);
        }
        // console.log(this.rcmdId, " this.rcmdData");
      } catch (err) {
        console.log(err);
      }
    },
    getMvRcmdPlay() {
      var rcmdId = this.rcmdId;
      // console.log(aaa, "aaaaaaaaaaaaa");
      setTimeout(() => {
        for (var i = 0; i < rcmdId.length; i++) {
          // console.log("111111111111111", rcmdId[i]);
          axios(`http://47.100.48.11:4000/mv/detail?mvid=${rcmdId[i]}`).then(
            res => {
              // console.log(res.data.data, "res.data");
              this.rcmdData.push(res.data.data);
              this.rcmdUrl.push(res.data.data.brs);
              // console.log(this.rcmdData,"aaa")
            }
          );
        }
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.mv-layout {
  width: 100%;
  .mv-container {
    padding: 5px;
    background: $MV-color;
    .black {
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;
      color: #fff;
      font-size: 0.6rem;
    }
  }
  .name {
    padding: 0 10px;
    line-height: 1rem;
    font-size: 0.32rem;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid bbcolor(0.1);
    span {
      height: 0.44rem;
      border: 1px solid rgb(128, 0, 0);
      margin: 0;
      padding: 0 0.11rem;
      color: rgb(128, 0, 0);
      font-size: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.11rem;
    }
  }
  .likeCount-commentCount {
    padding: 0.22rem 10px;
    font-size: 0.3rem;
    color: border_bottom(1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ellipsis {
      transform: rotate(90deg);
    }
  }
}
</style>