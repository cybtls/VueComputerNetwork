<template>
  <div class="home">
    <!-- 头部区域 -->
    <el-row class="animated fadeInDown">
      <myheader></myheader>
    </el-row>
    <!-- 主体 -->
    <!-- 标题区域 -->
    <el-row class="animated fadeInDown">
      <mytitle></mytitle>
    </el-row>
    <!-- 轮播图区域  -->
    <el-row class="animated fadeInDown">
      <wheelplanting></wheelplanting>
    </el-row>
    <!-- 卡片区域  -->
    <el-row class="animated fadeInDown" >
      <mycard></mycard>
    </el-row>
    <!-- 折叠面板区域   -->
    <div ref="mycollapse">
      <el-row v-if="showcollapse" class="animated bounceInLeft">
        <mycollapse></mycollapse>
      </el-row>
    </div>
    <!-- 不知道叫什么区域 -->
    <div ref="flashcard">
      <el-row v-if="showflashcard" class="animated bounceInLeft">
        <el-col :span="24">
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="8">
            <vue-flashcard
              class="flash"
              colorTextFront="black"
              colorTextBack="black"
              colorBack="#d2d2d2"
              headerFront="通信子网"
              headerBack="资源子网"
              footerFront="功能：负责全网的数据通信"
              footerBack="功能：提供各种网络资源和网络服务，实现网络的资源共享"
              front
              imgFront
              back
              imgBack
            ></vue-flashcard>
          </el-col>
          <el-col :span="8">
            <vue-flashcard
              class="flash"
              colorTextFront="black"
              colorTextBack="black"
              colorBack="#d2d2d2"
              headerFront="广告商专用"
              headerBack="你看不见我"
              footerFront="特仑苏"
              footerBack="你看不见我！！"
              front
              imgFront
              back
              imgBack
            ></vue-flashcard>
          </el-col>
          <el-col :span="4"></el-col>
        </el-col>
      </el-row>
    </div>
    <div ref="mycard2"></div>
    <el-row v-if="showmycard2" class="animated bounceInLeft">
      <mycard2></mycard2>
    </el-row>
    <!-- 尾部区域 -->
    <el-row>
      <myfooter></myfooter>
    </el-row>
    <el-tooltip class="item" effect="dark" content="前往登录" placement="top">
      <div class="login">
        <router-link to="/login" class="login">
          <img :src="src" alt>
        </router-link>
      </div>
    </el-tooltip>
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
import mycard2 from "../components/mycard2";
import myfooter from "../components/myfooter";
export default {
  data() {
    return {
      src: require("../assets/rock.gif"),
      showcollapse: false,
      showflashcard: false,
      showmycard2:false
    };
  },
  components: {
    vueFlashcard,
    myheader,
    wheelplanting,
    mytitle,
    mycard,
    mycollapse,
    myfooter,
    mycard2
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    addclass(e) {
      console.log(e);
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var mycollapseoffsetTop = this.$refs["mycollapse"].offsetTop;
      var flashcardoffsetTop = this.$refs["flashcard"].offsetTop;
      var mycard2offsetTop = this.$refs["mycard2"].offsetTop;
      if (scrollTop < mycollapseoffsetTop+100) {
        this.showcollapse = true;
        this.showflashcard = true;
        this.showmycard2 = true;
      }
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
.flash {
  margin: 0 6em;
  font-size: 14px;
}
.login {
  width: 60px;
  height: 60px;
  font-size: 16px;
  position: fixed; /*固定位置*/
  z-index: 99; /*设置优先级显示，保证不会被覆盖*/
  right: 100px;
  bottom: 100px;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}
</style>
