<template>
  <div>
    <el-col :span="24">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="10">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="什么是计算机网络？" name="1">
            <p>计算机网络是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统，网络管理软件及网络通信协议的管理和协调下，实现资源共享和信息传递的计算机系统</p>
            <!-- <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p> -->
          </el-collapse-item>
          <el-collapse-item title="广义的计算机网络" name="2">
            <p>计算机网络也称计算机通信网。关于计算机网络的最简单定义是：一些相互连接的、以共享资源为目的的、自治的计算机的集合。若按此定义，则早期的面向终端的网络都不能算是计算机网络，而只能称为联机系统（因为那时的许多终端不能算是自治的计算机）。但随着硬件价格的下降，许多终端都具有一定的智能，因而“终端”和“自治的计算机”逐渐失去了严格的界限。若用微型计算机作为终端使用，按上述定义，则早期的那种面向终端的网络也可称为计算机网络。</p>
            <p>另外，从逻辑功能上看，计算机网络是以传输信息为基础目的，用通信线路将多个计算机连接起来的计算机系统的集合，一个计算机网络组成包括传输介质和通信设备。</p>
            <p>从用户角度看，计算机网络是这样定义的：存在着一个能为用户自动管理的网络操作系统。由它调用完成用户所调用的资源，而整个网络像一个大的计算机系统一样，对用户是透明的。</p>
            <p>一个比较通用的定义是：利用通信线路将地理上分散的、具有独立功能的计算机系统和通信设备按不同的形式连接起来，以功能完善的网络软件及协议实现资源共享和信息传递的系统。</p>
            <p>从整体上来说计算机网络就是把分布在不同地理区域的计算机与专门的外部设备用通信线路互联成一个规模大、功能强的系统，从而使众多的计算机可以方便地互相传递信息，共享硬件、软件、数据信息等资源。简单来说，计算机网络就是由通信线路互相连接的许多自主工作的计算机构成的集合体</p>
            <p>最简单的计算机网络就只有两台计算机和连接它们的一条链路，即两个节点和一条链路。</p>
          </el-collapse-item>
          <el-collapse-item title="按连接来说计算机网络" name="3">
            <p>计算机网络就是通过线路互连起来的、自治的计算机集合，确切的说就是将分布在不同地理位置上的具有独立工作能力的计算机、终端及其附属设备用通信设备和通信线路连接起来，并配置网络软件，以实现计算机资源共享的系统。</p>
          </el-collapse-item>
          <el-collapse-item title="按需求来说计算机网络" name="4">
            <p>计算机网络就是由大量独立的、但相互连接起来的计算机来共同完成计算机任务。这些系统称为计算机网络（computer networks）</p>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="6">
        <img src="../../static/c1.jpg" alt>
      </el-col>
      <el-col :span="4"></el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1"
    };
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
img {
  width: 90%;
  height: 100%;
  margin-right: 20px;
}
.el-collapse {
  margin: 15px;
}
</style>

