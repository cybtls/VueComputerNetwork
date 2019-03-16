<template>
  <div class="main">
      <el-carousel :interval="5000" type="card" height="400px">
        <el-carousel-item v-for="item in imglist" :key="item.url">
          <img :src="item.url">
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imglist: [
        { url: require("../assets/lp1.jpg") },
        { url: require("../assets/lp2.jpg") },
        { url: require("../assets/lp3.jpg") },
        { url: require("../assets/lp4.jpg") }
      ],
      test:'中文'
    };
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin: 30px 0;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  img{
      width: 100%;
      
  }
}
</style>
