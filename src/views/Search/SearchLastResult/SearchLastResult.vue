<template>
  <div class="SearchLastResult-layout">
    <div class="search-title">
      <div class="l">
        单曲
        <van-icon name="arrow" />
      </div>
      <div class="r">
        <div class="play-circle">
          <van-icon name="play-circle-o" size="0.34rem" class="margin" />播放全部
        </div>
      </div>
    </div>
    <div class="search-list">
      <div class="list" v-for="list in searchList" :key="list.id" @click="parameters(list)">
        <div class="list-left">
          <div class="title">
            <div class="title-name">{{list.name}}</div>
            <div class="title-alias" v-if="list.alias[0]">({{list.alias[0]}})</div>
          </div>
          <div class="name">
            <div class="artists-name">{{list.artists[0].name}}-</div>
            <div class="album-name">{{list.album.name}}</div>
          </div>
          <div class="alias" v-if="list.alias[0]">{{list.alias[0]}}</div>
        </div>
        <div class="list-right">
          <van-icon name="ellipsis" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchLastResult",
  props: ["searchList"],
  data() {
    return {
      picUrl: ""
    };
  },
  methods: {
    parameters(list) {
      //   console.log(list, "searchList-id")
      let artistId = list.artists[0].id;
      this.getArtistImg(artistId);
      this.$store.commit("footerSearchList", list);
    },
    async getArtistImg(id) {
      let res = await this.$http(`http://47.100.48.11:4000/artists?id=${id}`);
      try {
        res = res.data;
        // console.log(res.artist.picUrl, "picUrl");
        this.picUrl = res.artist.picUrl;
        this.$nextTick(() => {
          this.$store.commit("footerSearchImg", this.picUrl);
        });
        // console.log(this.picUrl, "picUrl");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.SearchLastResult-layout {
  margin-top: 2rem;
  font-size: 16px;

  .search-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.22rem;
    .l {
      font-size: 0.4rem;
      display: flex;
      align-items: center;
    }
    .r {
      .play-circle {
        border: 1px solid border_bottom(0.3);
        font-size: 0.3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 30px;
        border-top-right-radius: 60px;
        border-top-left-radius: 60px;
        border-bottom-left-radius: 60px;
        border-bottom-right-radius: 60px;
        .margin {
          margin-right: 0.05rem;
        }
      }
    }
  }
  .search-list {
    .list {
      padding: 0.22rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .list-right {
      transform: rotate(90deg);
      font-size: 0.35rem;
    }
    .list-left {
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        // border: 1px solid #f59;
        font-size: 0.34rem;
        padding: 0.11rem 0;
        // padding: 0 10px;
        // .title-name {
        //   flex: 1;
        // }
        .title-alias {
          //   flex: 2;
          width: 4.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 0.1rem;
          color: border_bottom(0.9);
        }
      }
      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
        color: border_bottom(0.8);
      }
      .alias {
        color: border_bottom(0.8);
        font-size: 0.32rem;
      }
    }
  }
}
</style>    