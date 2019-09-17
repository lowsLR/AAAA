<template>
  <div class="loSongs-layout">
    <div class="bg-img">
      <img :src="allData.coverImgUrl" alt="背景图片" lazy-load/>
    </div>
    <div class="header-title">
      <span class="arrow-left" @click="goblack">
        <van-icon name="arrow-left" />
      </span>
      <span class="title">
        <p class="songList">歌单</p>
        <p class="description">编辑推荐:{{allData.description}}</p>
      </span>
      <span class="search">
        <van-icon name="search" />
      </span>
      <span class="ellipsis">
        <van-icon name="ellipsis" />
      </span>
    </div>
    <div class="header-content">
      <div class="left-img" type="primary" @click="showPopup">
        <img :src="allData.coverImgUrl" alt="歌单头像" lazy-load/>
        <div class="playCount">
          <van-icon name="play" />
          {{allData.playCount | countFilter}}
        </div>  
      </div>
      <div class="right-text">
        <div class="text-name" type="primary" @click="showPopup">{{allData.name}}</div>
        <div class="portrait-nickname">
          <div class="portrait">
            <img :src="creatorImg.avatarUrl" alt="head portrait" lazy-load/>
          </div>
          <div class="nickname">{{creatorImg.nickname}}</div>
          <div class="arrow">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="text-description" type="primary" @click="showPopup">
          <div class="l">{{allData.description}}</div>
          <div class="r">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div class="commentCount-shareCount">
      <div class="commentCount">
        <span class="border_bottom">
          <van-icon name="comment-o" />
        </span>
        <span class="font">{{allData.commentCount}}</span>
      </div>
      <div class="shareCount">
        <span class="border_bottom">
          <van-icon name="share" />
        </span>
        <span class="font">{{allData.shareCount}}</span>
      </div>
      <div class="passed">
        <span class="border_bottom">
          <van-icon name="passed" />
        </span>
        <span class="font">下载</span>
      </div>
      <div class="passed">
        <span class="border_bottom">
          <van-icon name="certificate" size="0.5rem" />
        </span>
        <span class="font">多选</span>
      </div>
    </div>
    <ListSongs :listofsong="listofsong" :allData="allData" />
    <van-popup v-model="show" get-container="#app" @click="changeShow">
      <Popup :all="allData"/>
    </van-popup>
  </div>
</template>

<script>
import ListSongs from "./ListSongs/ListSongs";
import Popup from "./Popup/Popup";
export default {
  name: "ListOfSongs",
  components: {
    ListSongs,
    Popup
  },
  data() {
    return {
      id: "",
      allData: [], //全部数据
      listofsong: [], //歌单列表
      creatorImg: [], //小头像
      show: false
    };
  },
  mounted() {
    this.getListOfSongId();
    this.getListOfSongData();
  },
  methods: {
    getListOfSongId() {
      var params = this.$route.params.id;
      // var splitNum = params.split("&");
      // this.id = splitNum[0];
      // this.hitsNum = splitNum[1];
      this.id = params;
      // console.log(this.$route)
    },
    async getListOfSongData() {
      let res = await this.$http(
        `http://47.100.48.11:4000/playlist/detail?id=${this.id}`
      );
      try {
        res = res.data;
        // console.log(res, "res");
        // var aaa = res.playlist;

        
        // console.log(aaa, "aaa");
        // var bbb = aaa.tracks;
        // console.log(bbb, "bbb");
        this.allData = res.playlist;
        this.listofsong = res.playlist.tracks;
        this.creatorImg = res.playlist.creator;
        // console.log(this.listofsong, "this.listofsong");
      } catch (err) {
        console.log(err);
      }
    },
    goblack() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    changeShow() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss">
.loSongs-layout {
  width: 100%;
  .bg-img {
    position: absolute;
    z-index: -100;
    overflow: hidden;
    img {
      width: 100%;
      filter: blur(100px);
      transform: scale(5);
    }
  }
  .header-title {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 5px;
    color: #fff;
    .arrow-left {
      font-size: 0.44rem;
    }
    .title {
      .songList {
        font-size: 0.35rem;
      }
      .description {
        width: 4rem;
        font-size: 0.15rem;
        margin-top: 0.08rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: bbcolor(0.4);
      }
    }
    .search {
      font-size: 0.45rem;
    }
    .ellipsis {
      transform: rotate(90deg);
      font-size: 0.45rem;
    }
  }

  .header-content {
    padding: 0.1rem 0.3rem 0.1rem 0.3rem;
    color: #fff;
    display: flex;
    flex-direction: row;
  }

  .left-img {
    flex: 0 0 2.8rem 0;
    margin-right: 0.32rem;
    position: relative;
    img {
      width: 2.8rem;
      height: 2.8rem;
      display: block;
      border-radius: 6px;
    }
    .playCount {
      font-size: 0.28rem;
      top: 0.11rem;
      right: 0.11rem;
      position: absolute;
      display: flex;
      align-items: center;
    }
  }
  .right-text {
    display: flex;
    flex-direction: column;
    .text-name {
      font-size: 0.32rem;
      line-height: 0.46rem;
      font-weight: 300;
    }
    .portrait-nickname {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: bbcolor(0.5);
      margin: 0.44rem 0;
      width: 100%;
      // border: 1px solid #f59;
      .portrait {
        flex:1;
        img {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          display: block;
        }
      }
      .nickname {
        flex:4;
        font-size: 0.28rem;
        margin: 0 0.04rem;
      }
      .arrow {
        flex:1;
        font-size: 0.32rem;
      }
    }
    .text-description {
      color: #d0d0d0;
      font-size: 0.22rem;
      line-height: 0.3rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      // border: 1px solid #f59;
      .l {
        flex:5;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .r {
        flex:1;
        font-size: 0.32rem;
      }
    }
  }
  .commentCount-shareCount {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    margin-top: 10px;
    > div {
      display: flex;
      align-items: center;
      flex-direction: column;
      .border_bottom {
        margin-bottom: 0.07rem;
        font-size: 0.45rem;
      }
      .font {
        font-size: 0.25rem;
        font-weight: 100;
      }
    }
  }
}
</style>