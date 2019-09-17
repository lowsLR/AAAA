<template>
  <div class="popup-layout">
    <div class="bgimg" v-bind:style="{ background: 'url(' +all.coverImgUrl + ') no-repeat' }"></div>
    <div class="popup-msk" ref="popupTxt">
      <div>
        <div class="coverImgUrl">
          <div class="cross">
            <van-icon name="cross" />
          </div>
          <div class="cover-img">
            <img :src="all.coverImgUrl" alt lazy-load />
          </div>
        </div>
        <div id="titleText">
          <div class="title-name">{{all.name}}</div>
          <div class="tags">
            <span class="marginRight">标签:</span>
            <span class="cover" v-if="all.tags[0]">{{all.tags[0]}}</span>
            <span class="cover co-margin" v-if="all.tags[1]">{{all.tags[1]}}</span>
            <span class="cover" v-if="all.tags[2]">{{all.tags[2]}}</span>
          </div>
          <div class="description">
            <div>
              <pre>{{all.description}} </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="saveCover" @click="prompt">
      <div class="save">保存封面</div>
    </div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
export default {
  name: "Popup",
  props: {
    all: {
      type: Object
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.addPopup();
  },
  computed: {},
  methods: {
    addPopup() {
      //   if (this.popupScroll) {
      //     this.popupScroll.refresh();
      //   } else {
      //     this.popupScroll = new BScroll(this.$refs.popupTxt, {
      //       click: true,
      //     });
      //   }
      //   this.popupScroll = new BScroll(this.$refs.popupTxt, {
      //     click: true
      //   });
    },
    prompt() {
      window.alert("封面已保存");
    }
  }
};
</script>
<style lang="scss">
.van-popup.van-popup--center {
  width: 100%;
  height: 100%;
}
.popup-layout {
  width: 100%;
  .bgimg {
    filter: blur(100px);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -10;
  }
  //    //拉动高度设置
  //   .popup-msk {
  //     max-height: 10rem;
  //     border: 1px solid #f59;
  //     overflow: hidden;
  //   }
  .coverImgUrl {
    padding: 0.22rem;
    .cross {
      font-size: 0.48rem;
      font-weight: 100;
      color: #fff;
      text-align: right;
    }
    .cover-img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;
      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }
  #titleText {
    padding: 0 0.44rem;
    .title-name {
      text-align: center;
      font-size: 0.31rem;
      color: #fff;
      padding: 0.21rem 0;
      border-bottom: 1px solid bbcolor(0.1);
    }
    .tags {
      font-size: 0.31rem;
      margin-top: 0.22rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      .cover {
        background: bbcolor(1);
        border-top-left-radius: 0.22rem;
        border-top-right-radius: 0.22rem;
        border-bottom-left-radius: 0.22rem;
        border-bottom-right-radius: 0.22rem;
        padding: 0.09rem;
        font-size: 0.2rem;
      }
      .co-margin {
        margin: 0 0.2rem;
      }
      .marginRight {
        margin-right: 0.19rem;
      }
    }
    .description {
      margin-top: 0.33rem;

      //   max-height: 3.4rem;
      //   border: 1px solid #f59;
      //   overflow: hidden;
      pre {
        color: #fff;
        font-size: 0.25rem;
        line-height: 0.4rem;
        width: 100%;
        white-space: pre-wrap;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
  }
  .saveCover {
    font-size: 0.28rem;
    color: #fff;
    position: fixed;
    bottom: 15%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .save {
      width: 1.8rem;
      height: 0.67rem;
      border: 1px solid #fff;
      border-top-left-radius: 0.45rem;
      border-bottom-left-radius: 0.45rem;
      border-top-right-radius: 0.45rem;
      border-bottom-right-radius: 0.45rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>