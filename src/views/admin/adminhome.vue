<template>
  <el-row class="container">
    <!-- header-->
    <el-col :span="24" class="header">
      <!-- logo -->
      <el-col :span="10" class="logo" :class="navshow?'logo-open':'logo-close'">
        <logo v-show="navshow"></logo>
        <i class="fa fa-desktop" v-show="!navshow"></i>
      </el-col>

      <!--展开侧边栏按钮 -->
      <el-col :span="10">
        <div class="tools" @click.prevent="changenav">
          <i v-if="navshow" class="el-icon-d-arrow-left" style="color:#fff;"></i>
          <i v-if="!navshow" class="el-icon-d-arrow-right" style="color:#fff;"></i>
        </div>
      </el-col>

      <!-- userinfo 用户信息 -->
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <span class="user">欢迎你,{{user.adminName}}</span>
            <img src="../../assets/rock.gif">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="修改信息" @click.native="myinfo">修改信息</el-dropdown-item>
            <el-dropdown-item command="退出登录" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <!-- main 主要显示界面-->
    <el-col :span="24" class="main">
      <!-- 侧边栏  展开时-->
      <aside :class="navshow?'nav-open':'nav-close'">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#eef1f6"
          text-color="#48576a"
          active-text-color="#409eff"
          v-show="navshow"
        >
          <el-menu-item index="1">
            <i class="fa fa-users"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toclassinfo">班级管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="fa fa-male"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toallteacherinfo">教师管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="fa fa-child"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toallstuinfo">学生管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="fa fa-file"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toadminresources">文档管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="fa fa-video-camera"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toadminvideo">视频管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="fa fa-commenting-o"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toadmintalk">帖子管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="fa fa-user"></i>&nbsp;&nbsp;&nbsp;
            <span slot="title" @click="toadmininfo">个人信息</span>
          </el-menu-item>
        </el-menu>

        <!-- 侧边栏  关闭时 -->
        <ul v-show="!navshow">
          <el-tooltip
            class="item"
            effect="dark"
            content="班级管理"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="toclassinfo">
              <i class="fa fa-users"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="老师管理"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="toallteacherinfo">
              <i class="fa fa-male"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="学生管理"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="toallstuinfo">
              <i class="fa fa-child"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="资料管理"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="toadminresources">
              <i class="fa fa-file"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="视频管理"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="toadminvideo">
              <i class="fa fa-video-camera"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="帖子管理"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="toadmintalk">
              <i class="fa fa-commenting-o"/>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="个人信息"
            placement="right"
            transition="el-zoom-in-center"
          >
            <li class="el-menu-item" @click="toadmininfo">
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
  created() {
    window.addEventListener("setItem", () => {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    });
  },
  components: {
    logo
  },
  data() {
    return {
      navshow: true,
      user: {}
    };
  },
  mounted() {
    this.getuser();
  },
  methods: {
    getuser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      console.log(this.user);
    },
    changenav() {
      this.navshow = !this.navshow;
    },
    toclassinfo() {
      this.$router.push({ path: "/adminhome/classinfo" });
    },
    toallteacherinfo() {
      this.$router.push({ path: "/adminhome/allteacherinfo" });
    },
    toallstuinfo() {
      this.$router.push({ path: "/adminhome/allstuinfo" });
    },
    toadminresources() {
      this.$router.push({ path: "/adminhome/adminresources" });
    },
    toadminvideo() {
      this.$router.push({ path: "/adminhome/adminvideo" });
    },
    toadmintalk() {
      this.$router.push({ path: "/adminhome/admintalk" });
    },
    toadmininfo() {
      this.$router.push({ path: "/adminhome/admininfo" });
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    logout() {
      this.$router.push({ path: "/adminlogin" });
    },
    myinfo() {
      this.$router.push({ path: "/adminhome/admininfo" });
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  font-size: 15px;
  font-weight: 300;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding-right: 15px;
}
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
