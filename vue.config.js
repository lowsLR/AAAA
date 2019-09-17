const path = require("path");

module.exports = {
  // configureWebpack: {
  //   devServer: {
  //     before: function(app, server) {
  //       app.get("http://47.100.48.11:4000/personalized?limit=150", function(
  //         req,
  //         res
  //       ) {
  //         res.json(res.data);
  //       });
  //     }
  //   }
  // },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/scss/*.scss")]
    }
  }
};

//http://47.100.48.11:4000
// http://47.100.48.11:4000/personalized 推荐歌单
// http://47.100.48.11:4000/personalized/djprogram 推荐电台
// http://47.100.48.11:4000/top/album 新碟
