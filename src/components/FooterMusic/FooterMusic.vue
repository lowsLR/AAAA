<template>
  <div class="footer-music" v-show="showIt">
    <div id="muisc-container">
      <div class="l" type="primary" @click="showAssign">
        <div class="alPicUrl" ref="removeCd">
          <img :src="songImg" alt lazy-load />
        </div>
        <div class="name-arName">
          <div class="name">{{songName}}</div>
          <div class="arName">{{songArName}}</div>
        </div>
      </div>
      <div class="r">
        <div class="playCircle">
          <van-icon name="play-circle-o" v-show="playShowSmall" @click="palyStar" />
          <van-icon name="pause-circle-o" v-show="pauseShowSmall" @click="pauseClose" />
        </div>
        <div class="wapNav" type="primary" @click="showRoundAngle">
          <van-icon name="wap-nav" />
        </div>
      </div>
    </div>
    <!-- 圆角弹出层 -->
    <van-popup v-model="showRound" round position="bottom" :style="{ height: '60%' }">
      <div class="popup-title">
        <div class="popup-l"></div>
        <div class="popup-r"></div>强迫症，没有图标做不了！
      </div>
    </van-popup>
    <!-- 挂载位弹出层 -->
    <van-popup v-model="show" get-container="#app" id="popup-layout">
      <div class="po-header">
        <div class="l">
          <div class="arrowLayout">
            <van-icon name="arrow-left" @click="closePlayer" />
          </div>
          <div class="title">
            <div class="songN">{{songName}}</div>
            <div class="songAr">
              {{songArName}}
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="exchange">
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
        </div>
      </div>
      <div class="ap-header">
        <!-- 背景图 -->
        <div class="bgimg" v-bind:style="{ background: 'url(' +songImg + ') no-repeat' }"></div>
        <div calss="aplayer">
          <div class="songImg">
            <div class="img" v-show="imgShow" @click="hiddImg" ref="removeCd">
              <img :src="songImg" lazy-load />
            </div>
            <div class="lryic" v-show="lryicShow" @click="showImg">
              <Scroll
                class="middle-r"
                :style="{display:lyricFlag?'none':'block'}"
                ref="lyricList"
                :data="currentLyric && currentLyric.lines"
              >
                <div class="lyric-wrapper">
                  <div class="currentLyric" v-if="currentLyric">
                    <p
                      ref="lyricLine"
                      class="text"
                      :class="{'current': currentLineNum === index}"
                      v-for="(line, index) in currentLyric.lines"
                      :key="line.key"
                    >{{line.txt}}</p>
                  </div>
                  <p class="no-lyric" v-if="currentLyric === null">没有歌词</p>
                </div>
              </Scroll>
            </div>
          </div>
          <div class="icon">
            <div class="likeo">
              <van-icon name="like-o" />
            </div>
            <div class="certificate">
              <van-icon name="certificate" />
            </div>
            <div class="share">
              <van-icon name="share" />
            </div>
            <div class="commento">
              <van-icon name="comment-o" />
            </div>
            <div class="moreo">
              <van-icon name="more-o" />
            </div>
          </div>
          <!-- 线条 -->
          <div class="Progress-bar">
            <div class="currentTime">{{ currentTime | format }}</div>
            <div class="slider">
              <ProgressBar
                :percent="percent"
                @percentChangeEnd="percentChangeEnd"
                @percentChange="percentChange"
              ></ProgressBar>
            </div>
            <div class="TotalTime">{{ duration | format }}</div>
          </div>
          <div class="font">
            <div class="random">
              <i class="fa fa-random" aria-hidden="true"></i>
            </div>
            <div class="backward">
              <i class="fa fa-step-backward" aria-hidden="true"></i>
            </div>
            <div class="circle">
              <i class="fa fa-play-circle-o" aria-hidden="true" v-show="playShow" @click="playNow"></i>
              <i
                class="fa fa-pause-circle-o"
                aria-hidden="true"
                v-show="pauseShow"
                @click="pauseNow"
              ></i>
            </div>
            <div class="forward">
              <i class="fa fa-step-forward" aria-hidden="true"></i>
            </div>
            <div class="faBars">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <audio :src="musicMp" autoplay @canplay="getDuration" @timeupdate="updateTime" ref="music"></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Lyric from "lyric-parser";
import Scroll from "../FooterMusic/Scroll/Scroll";
import ProgressBar from "../FooterMusic/ProgressBar/ProgressBar";
export default {
  name: "FooterMusic",
  components: { Scroll, ProgressBar },
  data() {
    return {
      songImg: "",
      songName: "",
      songArName: "",
      showRound: false,
      showIt: false,
      musicMp: [],
      musicId: "",
      playShow: true,
      pauseShow: false,
      duration: null,
      currentTime: [],
      currentLyric: null,
      currentLineNum: 0,
      show: false,
      imgShow: true, //图片
      lryicShow: false, //歌词,
      lyricFlag: false,
      percent: 0,
      playShowSmall: true,
      pauseShowSmall: false
    };
  },
  computed: {
    ...mapGetters(["songListData"]),
    ...mapGetters(["searchListData"]),
    ...mapGetters(["searchListImg"]),
    ...mapGetters(["playPause"])
  },
  watch: {
    songListData(a, b) {
      //   console.log(a, b, "a-b");
      // console.log(a,"A")
      //   console.log(a.listSong,"歌单列表")
      if (a !== b) {
        this.showIt = true;
        this.getSongListData(a.id);
        setTimeout(() => {
          this.getLryic(this.musicId);
        }, 150);
        this.songImg = a.listSong[a.index].al.picUrl;
        this.songName = a.listSong[a.index].name;
        this.songArName = a.listSong[a.index].ar[0].name;
        // console.log(this.songArName, "this.songArName");
      }
    },
    searchListData(newSearch, oldSearch) {
      if (newSearch != oldSearch) {
        this.showIt = true;
        this.getSongListData(newSearch.id);
        setTimeout(() => {
          this.getLryic(this.musicId);
        }, 150);
        this.songName = newSearch.name + newSearch.alias[0];
        if (newSearch.artists[1] == undefined) {
          this.songArName = newSearch.artists[0].name;
        } else {
          this.songArName = ` ${newSearch.artists[0].name}/${newSearch.artists[1].name}`;
        }
      }
    },
    searchListImg(a, b) {
      if (a !== b) {
        this.songImg = a;
      }
    },
    currentTime() {
      this.percent = this.currentTime / this.duration;
    },
    playPause(a, b) {
      if (a !== b) {
        this.playShow = false;
        this.pauseShow = true;
        this.playShowSmall = false;
        this.pauseShowSmall = true;
      }
    }
  },
  methods: {
    async getSongListData(a) {
      let res = await this.$http(`http://47.100.48.11:4000/song/url?id=${a}`);
      try {
        res = res.data;
        this.musicMp = res.data[0].url;
        this.musicId = res.data[0].id;
        // console.log(this.musicMp, " this.musicMp3");
        // console.log(this.musicId, " this.musicId");
      } catch (err) {
        console.log(err);
      }
    },
    async getLryic(lry) {
      let res = await this.$http(`http://47.100.48.11:4000/lyric?id=${lry}`);
      try {
        res = res.data;
        // console.log(res.lrc, "res--aaaa");
        this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric);
        // console.log(this.currentLyric, "currentLyric");
        if (this.currentLyric && this.duration) {
          this.currentLyric.play();
          // 歌词重载以后 高亮行设置为 0
          this.currentLineNum = 0;
          this.$refs.lyricList.scrollTo(0, 0, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    hiddImg() {
      this.imgShow = false;
      this.lryicShow = true;
      this.$refs.removeCd.classList.remove("cd");
    },
    showImg() {
      this.imgShow = true;
      this.lryicShow = false;
      this.$refs.removeCd.classList.add("cd");
    },
    playNow() {
      this.playShow = false;
      this.pauseShow = true;
      this.playShowSmall = false;
      this.pauseShowSmall = true;
      this.$refs.music.play();
      this.$refs.removeCd.classList.add("cd");
    },
    pauseNow() {
      this.playShow = true;
      this.pauseShow = false;
      this.playShowSmall = true;
      this.pauseShowSmall = false;
      this.$refs.music.pause();
      this.$refs.removeCd.classList.remove("cd");
    },
    handleLyric({ lineNum, txt }) {
      console.log("lyric");
      console.log(lineNum, txt);
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000); // 滚动到元素
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000); // 滚动到顶部
      }
    },
    showRoundAngle() {
      this.showRound = true;
    },
    showAssign() {
      this.show = true;
    },
    closePlayer() {
      this.show = false;
      this.currentLyric.stop();
    },
    palyStar() {
      this.playShow = false;
      this.pauseShow = true;
      this.playShowSmall = false;
      this.pauseShowSmall = true;
      this.$refs.removeCd.classList.add("cd");
      this.$refs.music.play();
      // this.currentLyric.toggelePlay();
    },
    pauseClose() {
      this.playShow = true;
      this.pauseShow = false;
      this.playShowSmall = true;
      this.pauseShowSmall = false;
      this.$refs.removeCd.classList.remove("cd");
      this.$refs.music.pause();
      // this.currentLyric.toggelePlay();
    },
    getDuration() {
      let stop = setInterval(() => {
        //获取播放总时长
        this.duration = this.$refs.music.duration;
        if (this.duration) {
          clearInterval(stop);
        }
      }, 150);
    },
    updateTime() {
      this.currentTime = this.$refs.music.currentTime;
    },
    currentPlay() {
      this.$refs.music.play();
    },
    currentPause() {
      this.$refs.music.pause();
    },
    percentChange(percent) {
      //歌曲进度条
      this.move = true;
      const currentTime = this.duration * percent;
      this.currentTime = currentTime;
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    percentChangeEnd(percent) {
      //歌曲进度条
      this.move = false;
      const currentTime = this.duration * percent;
      this.$refs.music.currentTime = currentTime;
      if (this.getPlayFlags) {
        this.$refs.music.play();
        this.changePlayFlag(true);
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    }
  },
  created() {
    this.move = false;
  }
};
</script>

<style lang="scss">
.footer-music {
  position: fixed;
  width: 100%;
  height: 1rem;
  border-top: 0.01rem solid #ccc;
  bottom: 0px;
  left: 0;
  background: rgba(252, 248, 248, 0.9);
  #muisc-container {
    background: rgba(248, 244, 244, 0.8);
    padding: 0 0.1rem;
    height: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .l {
    display: flex;
    flex-direction: row;
    align-items: center;
    .alPicUrl {
      width: 0.81rem;
      height: 0.81rem;
      border-radius: 50%;
      border: 0.01rem solid #fff;
      overflow: hidden;
      img {
        width: 0.81rem;
        height: 0.81rem;
        border-radius: 50%;
        display: block;
      }
    }
    .name-arName {
      margin-left: 0.1rem;
      .name {
        font-size: 0.28rem;
        margin-bottom: 0.11rem;
        font-weight: 100;
        width: 4.4rem;
        // border: 1px solid #f59;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arName {
        font-size: 0.2rem;
        color: border_bottom(0.9);
        font-weight: 100;
      }
    }
  }
  .r {
    padding: 0.1rem 0.1rem 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgba(10, 10, 10, 0.8);
    .playCircle {
      font-size: 0.8rem;
      font-weight: lighter;
      margin-right: 0.2rem;
    }
    .wapNav {
      font-size: 0.7rem;
      font-weight: lighter;
    }
  }
  .popup-title {
    height: 200px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
#popup-layout {
  overflow: hidden;
}
.po-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 1.2rem;
  .l {
    flex: 5;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .arrowLayout {
    font-size: 0.6rem;
    color: $black;
  }
  .title {
    .songN {
      width: 5.5rem;
      font-size: 0.4rem;
      margin-bottom: 0.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .songAr {
      width: 5.5rem;
      font-size: 0.26rem;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .exchange {
    flex: 1;
    font-size: 0.55rem;
    margin-right: 0.15rem;
    text-align: right;
  }
}

.cd {
  animation: move 20s linear infinite;
}
@keyframes move {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.custom-button {
  width: 0.18rem;
  height: 0.18rem;
  border-radius: 50%;
  border: 0.01rem solid #e5e5e5;
  background: #fff;
}
.bgimg {
  filter: blur(100px);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
}
.ap-header {
  .songImg {
    padding: 1.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      border: 0.01rem solid #fff;
      overflow: hidden;
      img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        display: block;
      }
    }
  }
  .icon {
    font-size: 0.55rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 1rem;
    .moreo {
      transform: rotate(90deg);
      text-align: top;
      padding-right: 0.04rem;
    }
  }
  .Progress-bar {
    padding: 0.22rem;
    font-size: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .currentTime {
      margin-right: 0.22rem;
    }
    .TotalTime {
      margin-left: 0.22rem;
    }
    .slider {
      flex: 3;
    }
  }
  .font {
    font-size: 0.55rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: 0.48rem;
    font-weight: 100;
    color: rgba(10, 10, 10, 0.7);
    // margin-top: 0.5rem;
    .circle {
      font-size: 1.1rem;
    }
  }

  .lryic {
    // border: 1px solid #f59;
    width: 100%;
    .middle-r {
      max-height: 5rem;
      font-size: 20px;
      overflow: hidden;
    }
  }
}

.lyric-wrapper {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  .currentLyric {
    .text {
      font-size: 0.2rem;
      line-height: 0.25rem;
      &.current {
        color: #fff;
      }
    }
  }
  .no-lyric {
    line-height: 0.4rem;
    margin-top: 60%;
    color: #c7c7c7;
    font-size: 0.14rem;
  }
  .lyric__para {
    line-height: 2;
    margin: 0 0.2rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.15rem;
    color: rgba(255, 255, 255, 0.9);
    &.current {
      color: #31c27c;
    }
  }
}
#aaa {
  position: fixed;
  top: 40%;
  border: 1px solid #333;
  // width: 100%;
  // height:100px;
}
</style>    


