<template>
  <div class="search-layout">
    <div class="searchBox">
      <div class="goBlack" @click="goBlack">
        <van-icon name="arrow-left" />
      </div>
      <div class="inp">
        <input type="text" @input="changeName" v-model="searchResult" ref="val" />
        <div class="tipBox" v-show="tipShow">
          <div class="searchTitle">搜索"{{searchResult}}"</div>
          <div class="tip-list" v-for="(ts,i) in prompt" :key="i" @click="jump(ts.name)">{{ts.name}}</div>
        </div>
      </div>
      <div class="manager">
        <div class="manager">
          <van-icon name="manager" v-show="flasMamager" />
        </div>
        <div class="cross">
          <van-icon name="cross" v-show="flasCross" @click="clearInp" />
        </div>
      </div>
    </div>
    <HotDetail v-show="hotSearch" @hotSeatchListName="hotSeatchListName" />
    <SearchLastResult :searchList="searchList" v-show="listSong" />
  </div>
</template>

<script>
import HotDetail from "../Search/HotDetail/HotDetail";
import SearchLastResult from "../Search/SearchLastResult/SearchLastResult";
export default {
  name: "Search",
  components: { HotDetail, SearchLastResult },
  data() {
    return {
      tipShow: false, //提示框
      hotSearch: true, //热搜榜显隐
      listSong: false,
      flasMamager: true,
      flasCross: false,
      searchResult: "",
      prompt: [],
      songName: "",
      searchList: [],
      hotSeatchName: ""
    };
  },
  methods: {
    goBlack() {
      this.$router.go(-1);
      this.hotSearch = false;
    },
    changeName() {
      if (
        this.searchResult.split(" ").join("").length != 0 ||
        this.searchResult != 0
      ) {
        this.tipShow = true;
        setTimeout(() => {
          this.tipList();
        }, 500);
      }
    },
    async tipList() {
      //提示
      let resb = await this.$http(
        `http://47.100.48.11:4000/search/suggest?keywords=${this.searchResult}`
      );
      try {
        resb = resb.data;
        // console.log(resb, "resb");
        this.prompt = resb.result.songs;
        // console.log(this.prompt, "this.prompt");
      } catch (err) {
        console.log(err);
      }
    },
    async searchLastResult(dai) {
      //所有歌单
      let res = await this.$http(
        `http://47.100.48.11:4000/search?keywords=${dai}`
      );
      try {
        res = res.data;
        // console.log(res, "res");
        // console.log(res.result.songCount, "搜索条数");
        // console.log(res.result.songs, "搜索全部内容");
        // console.log(res.result.songs[0].id, "这是歌曲的id");
        this.searchList = res.result.songs;
        // console.log(this.searchList, "this.searchList");
      } catch (err) {
        console.log(err);
      }
    },
    jump(name) {
      this.songName = name;
      this.searchResult = name;
      // console.log(this.songName, "name");
      this.searchLastResult(this.songName);
      this.tipShow = false;
      this.flasMamager = false;
      this.flasCross = true;
      this.hotSearch = false;
      this.listSong = true;
    },
    clearInp() {
      this.searchResult = "";
    },
    hotSeatchListName(hot) {
      this.hotSeatchName = hot;
    }
  },
  watch: {
    hotSeatchName(a, b) {
      if (a !== b) {
        this.$refs.val.value = a;
        this.searchResult = a;
        this.hotSearch = false;
        this.listSong = true;
        this.searchLastResult(a);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-layout {
  input {
    width: 100%;
    outline: 0;
    border-width: 0;
    border-bottom: 1px solid #fff;
    background: transparent;
    color: #fff;
    &::-webkit-input-placeholder {
      color: border_bottom(1);
    }
  }
  .searchBox {
    padding: 0.2rem;
    background: $bg-color;
    position: fixed;
    top: 0;
    left: 0;
    height: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .goBlack {
      flex: 1;
      font-size: 0.48rem;
    }
    .inp {
      flex: 5;
      font-size: 0.35rem;
      .tipBox {
        width: 70%;
        border: 0.5px solid #fff;
        box-shadow: 3px 5px 5px #ccc;
        position: fixed;
        top: 1rem;
        color: #333;
        padding: 10px;
        z-index: 10;
        background: #fff;
        .searchTitle {
          border-bottom: 1px solid #ccc;
          line-height: 0.7rem;
        }
        .tip-list {
          border-bottom: 1px solid #ccc;
          line-height: 0.7rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .manager {
      flex: 1;
      text-align: right;
      font-size: 0.48rem;
    }
  }
}
</style>