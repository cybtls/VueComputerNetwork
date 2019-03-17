<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="14">
          <div class="sign">计算机网络的四个阶段</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">&nbsp;</el-col>
      <el-col :span="7">
        <div v-on:mouseenter="addclass('c1')" v-on:mouseleave="removeclass('c1')">
          <el-card shadow="hover" :class="{ animated : showanimate, bounce: showbouncec1 }">
            <span class="title">网络雏形阶段</span>
            <p class="content">从20世纪50年代中期开始，以单个计算机为中心的远程联机系统，构成面向终端的计算机网络，称为第一代计算机网络。</p>
          </el-card>
        </div>
      </el-col>

      <el-col :span="7">
        <div v-on:mouseenter="addclass('c2')" v-on:mouseleave="removeclass('c2')">
          <el-card shadow="hover" :class="{ animated : showanimate, bounce: showbouncec2 }">
            <span class="title">网络初级阶段</span>
            <p>从20世纪60年代中期开始进行主机互联，多个独立的主计算机通过线路互联构成计算机网络，无网络操作系统，只是通信网。60年代后期，ARPANET网出现，称为第二代计算机网络。</p>
          </el-card>
        </div>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row>
      <el-col :span="5">&nbsp;</el-col>
      <el-col :span="7">
        <div v-on:mouseenter="addclass('c3')" v-on:mouseleave="removeclass('c3')">
          <el-card shadow="hover" :class="{ animated : showanimate, bounce: showbouncec3 }">
            <span class="title">以太网产生</span>
            <p
              class="content"
            >20世纪70年代至80年代中期，以太网产生，ISO制定了网络互连标准OSI，世界上具有统一的网络体系结构，遵循国际标准化协议的计算机网络迅猛发展，这阶段的计算机网络称为第三代计算机网络。</p>
          </el-card>
        </div>
      </el-col>
      <el-col :span="7">
        <div v-on:mouseenter="addclass('c4')" v-on:mouseleave="removeclass('c4')">
          <el-card shadow="hover" :class="{ animated : showanimate, bounce: showbouncec4}">
            <span class="title">综合化高速化发展</span>
            <p
              class="content"
            >从20世纪90年代中期开始，计算机网络向综合化高速化发展，同时出现了多媒体智能化网络，发展到现在，已经是第四代了。局域网技术发展成熟。第四代计算机网络就是以千兆位传输速率为主的多媒体智能化网络。</p>
          </el-card>
        </div>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
  </div>
</template>

<script>
import animate from "animate.css";
export default {
  data() {
    return {
      showanimate: false,
      showbouncec1: false,
      showbouncec2: false,
      showbouncec3: false,
      showbouncec4: false
    };
  },
  methods: {
    addclass(flag) {
      if (flag == "c1") {
        this.showanimate = true;
        this.showbouncec1 = true;
      }
      if (flag == "c2") {
        this.showanimate = true;
        this.showbouncec2 = true;
      }
      if (flag == "c3") {
        this.showanimate = true;
        this.showbouncec3 = true;
      }
      if (flag == "c4") {
        this.showanimate = true;
        this.showbouncec4 = true;
      }
    },
    removeclass(flag) {
      console.log(flag)
      if (flag == "c1") {
        this.showanimate = false;
        this.showbouncec1 = false;
      }
      if (flag == "c2") {
        this.showanimate = false;
        this.showbouncec2 = false;
      }
      if (flag == "c3") {
        this.showanimate = false;
        this.showbouncec3 = false;
      }
      if (flag == "c4") {
        this.showanimate = false;
        this.showbouncec4 = false;
      }
    }
  }
};
</script>



<style  lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 600;
}
.content {
  margin-top: 0.5em;
  text-indent: 2em;
  font-size: 16px;
  text-align: left;
}
.item {
  padding: 18px 0;
}
.box-card {
  margin: 2em 0;
  width: 400px;
}
.sign {
  font-size: 25px;
  padding-left: 4em;
  font-weight: 600;
  font-style: oblique;
  margin-bottom: 1em;
}
.el-card {
  margin: 1em 40px;
}
</style>