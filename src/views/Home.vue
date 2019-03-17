<template>
  <div class="home">
    <!-- 头部区域 -->
    <el-row>
      <myheader></myheader>
    </el-row>
    <!-- 主体 -->
    <!-- 标题区域 -->
    <el-row>
      <mytitle></mytitle>
    </el-row>
    <!-- 轮播图区域  -->
    <el-row>
      <wheelplanting></wheelplanting>
    </el-row>
    <!-- 卡片区域  -->
    <el-row>
      <mycard></mycard>
    </el-row>
    <!-- 折叠面板区域  -->
    <el-row>
      <mycollapse></mycollapse>
    </el-row>
    <!-- Flash区域 -->
    <el-row>
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <vue-flashcard 
          front="hello" 
          imgFront="../../static/lp1.jpg"
          back="你好"
          imgBack="../../static/lp2.jpg"
          ></vue-flashcard>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>
    </el-row>
    <!-- 尾部区域 -->
    <el-row>
      <myfooter></myfooter>
    </el-row>
  </div>
</template>

<script>
import animate from "animate.css";
import vueFlashcard from "vue-flashcard";
import myheader from "../components/myheader";
import mytitle from "../components/mytitle";
import wheelplanting from "../components/wheelplanting";
import mycard from "../components/mycard";
import mycollapse from "../components/mycollapse";
import myfooter from "../components/myfooter";
export default {
  data() {
    return {
      test: false
    };
  },
  components: {
    vueFlashcard,
    myheader,
    wheelplanting,
    mytitle,
    mycard,
    mycollapse,
    myfooter
  },
  methods: {
    add(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
// .home {
// }
.el-row {
  padding: 1em 0;
}
</style>
