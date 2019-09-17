<template>
  <div class="newDisc-layout">
    <div class="newDisc-container">
      <div class="newDisc-header">
        <div class="header-left">
          <span class="newDisc">新碟</span>
          <span class="horizontal">|</span>
          <span class="newSong">新歌</span>
        </div>
        <div class="header-right">更多新碟</div>
      </div>
      <div class="newDiscList">
        <div class="disc" v-for="disc in nDiscList" :key="disc.id" @click="transferId(disc.id)">
          <div class="disc-img">
            <img :src="disc.picUrl" alt="新碟图片" lazy-load />
          </div>
          <div class="txt">{{disc.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// http://47.100.48.11:4000/album?id=81402820 新碟的歌单
// import { mapGetters } from "vuex";
// import axios from "axios";
export default {
  name: "NewDisc",
  data() {
    return {
      num: 3,
      nDiscList: []
    };
  },
  computed: {
    // ...mapGetters(["nDiscList"])
  },
  methods: {
    // changeNewDiscList() {
    //   // this.$store.commit("changenDisc", this.num);
    //   // this.$store.dispatch("getNewSongList", axios);
    // },
    transferId(id) {
      console.log(id);
      // this.$router.push({
      //   path: `/listofsong/${id}`
      // });
    },
    async getDiscListData() {
      let res = await this.$http(
        `http://47.100.48.11:4000/top/album?offset=0&limit=${this.num}`
      );
      try {
        res = res.data;
        this.nDiscList = res.albums;
        // console.log(res,"nDiscList")
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.getDiscListData();
  },
  beforeMount() {
    // this.changeNewDiscList();
  }
};
</script>

<style lang="scss" scoped>
.newDisc-layout {
  width: 100%;
  padding: 0 10px 0.68rem 10px;
  .newDisc-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.34rem;
  }
  .header-left {
    font-size: 14px;
    .newDisc {
      font-size: 0.34rem;
      font-weight: 550;
      padding-right: 0.11rem;
    }
    .horizontal {
      font-size: 0.25rem;
      font-weight: 100;
      padding-right: 0.11rem;
    }
    .newSong {
      font-size: 0.25rem;
      font-weight: 100;
    }
  }
  .header-right {
    padding: 0.11rem;
    border-top-right-radius: 0.22rem;
    border-bottom-right-radius: 0.22rem;
    border-top-left-radius: 0.22rem;
    border-bottom-left-radius: 0.22rem;
    border: 1px solid bbcolor(0.3);
    font-size: 0.2rem;
    font-weight: 100;
  }

  .newDiscList {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    .disc {
      flex: 0 0 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .disc-img {
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 5px;
        }
      }
      .txt {
        // width: 90%;
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
  }
}
</style>