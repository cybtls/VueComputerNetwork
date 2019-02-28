<template>
  <el-row class="container">
    <!-- header-->
    <el-col :span="24" class="header">
      <!-- logo -->
      <el-col :span="10" class="logo" :class="navshow?'logo-open':'logo-close'">
        <logo v-show="navshow"></logo>
        <i class="fa fa-desktop" v-show="!navshow"></i>
      </el-col>

      <!-- 按钮 -->
      <el-col :span="10">
        <div class="tools" @click.prevent="changenav">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>

      <!-- userinfo -->
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img src="../../assets/logo.png">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <!-- main -->
    <el-col :span="24" class="main">
      <!-- 侧边栏 -->
      <aside :class="navshow?'nav-open':'nav-close'">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#eef1f6"
          text-color="#48576a"
          active-text-color="#48576a"
          v-show="navshow"
        >
          <el-menu-item index="1">
            <i class="fa fa-book"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="tostuscore">我的成绩</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="fa fa-file"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="tosturesources">学习资源</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="fa fa-question"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toproblem">询问老师</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="fa fa-line-chart"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="tostudy">在线学习</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="fa fa-user"></i>&nbsp;&nbsp;&nbsp;
            <!-- <router-link slot="title" to="/stuinfo">个人信息</router-link> -->
            <span slot="title" @click="tostuinfo">个人信息</span>
          </el-menu-item>
        </el-menu>

        <ul v-show="!navshow">
          <el-tooltip
            class="item"
            effect="dark"
            content="我的成绩"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="changenav">
              <i class="fa fa-book"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="学习资源"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="changenav">
              <i class="fa fa-file"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="询问老师"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="changenav">
              <i class="fa fa-question"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="在线学习"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="changenav">
              <i class="fa fa-line-chart"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="个人信息"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="changenav">
              <i class="fa fa-user"/>
            </li>
          </el-tooltip>
        </ul>
      </aside>

      <el-col :span="24">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import logo from "../../components/logo.vue";
export default {
  components: {
    logo
  },
  created(){
    // alert(sessionStorage.getItem("user"));
  },
  data() {
    return {
      navshow: true
    };
  },
  methods: {
    show(){
      alert(sessionStorage.getItem("user"));
    },
    changenav() {
      this.navshow = !this.navshow;
    },
    tostuscore() {
      this.$router.push({ path: "/stuhome/stuscore" });
    },
    tosturesources() {
      this.$router.push({ path: "/stuhome/sturesources" });
    },
    toproblem() {
      this.$router.push({ path: "/stuhome/problem" });
    },
    tostudy() {
      this.$router.push({ path: "/stuhome/study" });
    },
    tostuinfo() {
      this.$router.push({ path: "/stuhome/stuinfo" });
    },
  }

};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background-color: #000000;
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-open {
      width: 250px;
    }
    .logo-close {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    background-color: #fbfdff;
    .nav-open {
      background-color: #eef1f6;
      flex: 0 0 250px;
      width: 250px;
    }
    .nav-close {
      background-color: #000000;
      // #eef1f6
      flex: 0 0 60px;
      width: 60px;
    }
  }
}
.el-menu {
  width: 100% !important;
}
.menu-expanded {
  flex: 0 0 180px;
  width: 180px;
  .el-menu {
    width: 100% !important;
  }
  .el-submenu .el-menu-item {
    min-width: 0px !important;
  }
}
</style>
