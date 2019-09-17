<template>
  <div class="song-listing">
    <div class="listing-layout">
      <div class="list-title">
        <div class="title-l">
          <van-icon name="play-circle-o" size="0.45rem" />
          <span class="playAll">播放全部</span>
          <span class="border_bottom">(共{{allData.trackCount}}首)</span>
        </div>
        <div class="title-r">
          <van-icon name="plus" />
          收藏({{allData.subscribedCount|countFilter}})
        </div>
      </div>
      <div class="songList">
        <div
          class="song-container"
          v-for="(list,index) in listofsong"
          :key="index"
          @click="passId(list.id,listofsong,index)"
        >
          <div class="sort">{{index+1}}</div>
          <div class="song-name">
            <div class="name">{{list.name}}</div>
            <div class="all">
              <div class="al" v-for="(a,i) in list.ar" :key="i">
                {{a.name}}
                <span>/</span>
              </div>
            </div>
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
export default {
  name: "ListSongs",
  components: {},
  props: ["listofsong", "allData"],
  methods: {
    passId(id, listSong, index) {
      // console.log(id, "passId");
      // console.log(listSong, "passIda");
      this.$store.commit("conduction", { id, listSong, index });
      this.$store.commit("passFlas", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.song-listing {
  margin-top: 0.32rem;
  .listing-layout {
    padding: 0.22rem;
    background: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .list-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-l {
      display: flex;
      align-items: center;
      // font-size: 0.39rem;
      .border_bottom {
        font-size: 0.26rem;
        color: border_bottom(1);
      }
      .playAll {
        margin: 0 0.01rem 0 0.2rem;
        font-size: 0.36rem;
      }
    }
    .title-r {
      background-color: $bg-color;
      border-top-left-radius: 0.44rem;
      border-top-right-radius: 0.44rem;
      border-bottom-left-radius: 0.44rem;
      border-bottom-right-radius: 0.44rem;
      padding: 0.25rem;
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 0.26rem;
    }
  }

  .songList {
    z-index: 100;
    margin-bottom: 0.9rem;
    .song-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
    }
    .sort {
      font-size: 0.3rem;
      color: border_bottom(1);
      font-weight: 100;
      margin-right: 0.22rem;
    }
    .song-name {
      width: 5.5rem;
      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0.13rem;
        font-size: 0.3rem;
      }
      .all {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        // border: 1px solid #333;
      }
      .al {
        font-size: 0.22rem;
        color: border_bottom(1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:last-child span {
          font-size: 0;
        }
      }
    }
    .ellipsis {
      text-align: right;
      transform: rotate(90deg);
      font-size: 0.38rem;
      color: border_bottom(1);
      font-weight: 100;
    }
  }
}
</style>