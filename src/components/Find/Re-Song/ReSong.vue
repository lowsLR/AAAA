<template>
  <div class="reSong-layout">
    <div class="reSong-container">
      <div class="title-list">
        <div class="title">推荐歌单</div>
        <div class="move">歌单广场</div>
      </div>
      <div class="song-list">
        <div class="song-img" v-for="song in rSong" :key="song.id">
          <div class="song-box" @click="transferId(song.id)">
            <div class="picUrl">
              <img :src="song.picUrl" alt="歌单图片" lazy-load/>
              <div class="playCount">
                <van-icon name="play" size="0.3rem" />
                {{song.playCount | countFilter}}
              </div>
            </div>
            <div class="txt">{{song.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import axios from "axios";
export default {
  name: "ReSong",
  data() {
    return {
      num: 6,
      rSong: []
    };
  },
  computed: {
    // ...mapGetters(["rSong"])
  },
  methods: {
    // changeReSongList() {
    //   this.$store.commit("changeReSong", this.num);
    //   this.$store.dispatch("getReSongList", axios);
    // },
    transferId(id) {
      // console.log(id);
      this.$router.push({
        path: `/listofsong/${id}`
      });
    },
    async getReSongDta() {
      let res = await this.$http(
        `http://47.100.48.11:4000/personalized?limit=${this.num}`
      );
      try {
        res = res.data;
        this.rSong = res.result;
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    // this.changeReSongList();
    this.getReSongDta();
  }
};
</script>

<style lang="scss" scoped>
.reSong-layout {
  padding: 0.4rem 10px 0 10px;
  box-sizing: border-box;
  .reSong-container {
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
  .title-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.15rem;
    .title {
      font-size: 0.34rem;
      font-weight: 550;
    }
    .move {
      padding: 0.11rem;
      border-top-right-radius: 0.22rem;
      border-bottom-right-radius: 0.22rem;
      border-top-left-radius: 0.22rem;
      border-bottom-left-radius: 0.22rem;
      border: 1px solid bbcolor(0.3);
      font-size: 0.2rem;
      font-weight: 100;
    }
  }
  .song-list {
    //  border: 1px solid #333;
    width: 100%;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .song-box {
      float: left;
      width: 33.3%;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      margin-bottom: 0.42rem;
      border: 1px solid transparent;
      .txt {
        width: 85%;
        font-size: 0.24rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 0.15rem;
        padding: 0 0 1px 0;
        line-height: 0.3rem;
      }
    }
    .picUrl {
      position: relative;
      .playCount {
        position: absolute;
        font-size: 0.25rem;
        top: 0;
        color: #fff;
        right: 20%;
        display: flex;
        flex-direction: row;
        align-items: center;
        @media (min-width: 760px) {
          right: 30%;
        }
      }
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 5px;
      }
    }
  }
}
</style>