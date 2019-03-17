<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="14">
          <div class="sign">主要网络</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">&nbsp;</el-col>
      <el-col :span="7">
        <el-tooltip class="item" effect="dark" :content="LANtext" placement="left">
          <el-card shadow="hover">
            <span class="title">局域网</span>
            <p
              class="content"
            >（Local Area Network；LAN） 通常我们常见的“LAN”就是指局域网，这是我们最常见、应用最广的一种网络。局域网随着整个计算机网络技术的发展和提高得到充分的应用和普及，几乎每个单位都有自己的局域网，有的甚至家庭中都有自己的小型局域网。很明显，所谓局域网，那就是在局部地区范围内的网络，它所覆盖的地区范围较小。局域网在计算机数量配置上没有太多的限制，少的可以只有两台，多的可达几百台。一般来说在企业局域网中，工作站的数量在几十到两百台次左右。在网络所涉及的地理距离上一般来说可以是几米至10公里以内。局域网一般位于一个建筑物或一个单位内，不存在寻径问题，不包括网络层的应用</p>
          </el-card>
        </el-tooltip>
      </el-col>
      <el-col :span="7">
        <el-tooltip class="item" effect="dark" :content="MANtext" placement="right">
          <el-card shadow="hover">
            <span class="title">城域网</span>
            <p class="content">（Metropolitan Area Network；MAN） 这种网络一般来说是在一个城市，但不在同一地理小区范围内的计算机互联。这种网络的连接距离可以在10￣100公里，它采用的是IEEE802.6标准。MAN与LAN相比扩展的距离更长，连接的计算机数量更多，在地理范围上可以说是LAN网络的延伸。在一个大型城市或都市地区，一个MAN网络通常连接着多个LAN网。如连接政府机构的LAN、医院的LAN、电信的LAN、公司企业的LAN等等。由于光纤连接的引入，使MAN中高速的LAN互连成为可能。</p>
          </el-card>
        </el-tooltip>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row>
      <el-col :span="5">&nbsp;</el-col>
      <el-col :span="7">
        <el-tooltip class="item" effect="dark" :content="LANtext" placement="left">
          <el-card shadow="hover">
            <span class="title">广域网</span>
            <p
              class="content"
            >（Wide Area Network；WAN） 这种网络也称为远程网，所覆盖的范围比城域网（MAN）更广，它一般是在不同城市之间的LAN或者MAN网络互联，地理范围可从几百公里到几千公里。因为距离较远，信息衰减比较严重，所以这种网络一般是要租用专线，通过IMP（接口信息处理）协议和线路连接起来，构成网状结构，解决循径问题。这种城域网因为所连接的用户多，总出口带宽有限，所以用户的终端连接速率一般较低，通常为9.6Kbps￣45Mbps 如：邮电部的CHINANET，CHINAPAC，和CHINADDN网。</p>
          </el-card>
        </el-tooltip>
      </el-col>
      <el-col :span="7">
        <el-tooltip class="item" effect="dark" :content="WIFItext" placement="right">
          <el-card shadow="hover">
            <span class="title">无线网</span>
            <p class="content">
              随着笔记本电脑（notebook computer）和个人数字助理
              （ Personal Digital Assistant，PDA）等便携式计算机的日益普及和发展，人们经常要在路途中接听电话、发送传真和电子邮件阅读网上信息以及登录到远程机器等。然而在汽车或飞机上是不可能通过有线介质与单位的网络相连接的，这时候可能会对无线网感兴趣了。虽然无线网与移动通信经常是联系在一起的，但这两个概念并不完全相同。表1 - 2给出了它们之间的对比。例如当便携式计算机通过P C M C I A卡接入电话插口，它就变成有线网的一部分。另一方面，有些通过无线网连接起来的计算机的位置可能又是固定不变的，如在不便于通过有线电缆连接的大楼之间就可以通过无线网将两栋大楼内的计算机连接在一起
            </p>
          </el-card>
        </el-tooltip>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        LANtext:"优点：连接范围窄、用户数少、配置容易、连接速率高。",
        MANtext:"优点：用户投入少，接入简单，技术先进、安全",
        WANtext:"优点：可大可小，无论在单位还是在家庭实现起来都比较容易，应用也是最广泛的一种网络",
        WIFItext:"优点：易于安装和使用",
    };
  },
  methods: {}
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
}
.el-card {
  margin: 1em 40px;
}
</style>