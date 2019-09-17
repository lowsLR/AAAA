<template>
  <div class="hotDetail-layout">
    <div class="container">
      <div class="title">热搜榜</div>
      <div class="list">
        <div
          class="listBox"
          v-for="(hot,index) in hotDetailData"
          :key="index"
          @click="jump(hot.searchWord)"
        >
          <div class="l">{{index+1}}</div>
          <div class="r">
            <div class="searchWord-score">
              <span class="searchWord">{{hot.searchWord}}</span>
              <span class="score">{{hot.score}}</span>
              <span class="iconUrl" v-if="hot.iconUrl">
                <img :src="hot.iconUrl" lazy-load />
              </span>
            </div>
            <div class="content">{{hot.content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "HotDetail",
  data() {
    return {
      hotDetailData: []
    };
  },
  methods: {
    async getHotDetailData() {
      let hotDetail = await this.$http(
        "http://47.100.48.11:4000/search/hot/detail"
      );
      try {
        hotDetail = hotDetail.data;
        // console.log(hotDetail, "hotDetail热搜榜有效");
        this.hotDetailData = hotDetail.data;
        // console.log(this.hotDetailData, "this.hotDetailData");
      } catch (err) {
        console.log(err);
      }
    },
    jump(songName) {
      console.log("aaa", songName);
      this.$emit('hotSeatchListName',songName)
    }
  },
  mounted() {
    this.getHotDetailData(); //热搜榜
  }
};
</script>

<style lang="scss" scoped>
.hotDetail-layout {
  margin-top: 2.2rem;
  font-size: 10px; //
  .container {
    padding: 0.2rem;
  }
  .title {
    font-size: 0.3rem;
  }
  //   .list {
  //     border: 1px solid #f59;
  //   }
  .listBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.3rem 0;
  }
  .l {
    flex: 0 0.5rem;
    font-size: 0.28rem;
  }
  .r {
    flex: 5;
    .searchWord-score {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 0.11rem;
    }
    .searchWord {
      font-size: 0.32rem;
    }
    .score {
      font-size: 0.22rem;
      margin: 0 0.35rem 0 0.1rem;
      color: border_bottom(0.9);
    }
    .iconUrl {
      img {
        width: 0.32rem;
        height: 0.32rem;
      }
    }
    .content {
      font-size: 0.22rem;
      color: border_bottom(1);
    }
  }
}
</style>