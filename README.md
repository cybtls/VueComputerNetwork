#### 后端状态码

```java
package com.cyb.codemsg;

public class CodeMsg {
    /**
     * 调用接口成功
     */
    public static Integer Code_SUCCESS = 200;
    public static String Code_SUCCESS_MSG = "调用接口成功";


    /**
     * 调用接口失败
     */
    public static Integer Code_ERROR = 400;
    public static String Code_ERROE_MSG = "调用接口失败";


    /**
     *  存在
     */
    public static Integer Code_EXIST = 201;
    public static String Code_EXIST_MSG = "存在";

    /**
     * 账号状态为封禁
     */
    public static Integer Code_CLOSURE = 202;
    public static String Code_CLOSURE_MSG = "账号状态为封禁";


    /**
     * 账号不存在，登录失败
     */
    public static Integer Code_NOTEXIST =  204;
    public static String Code_NOTEXIST_MSG = "账号不存在，登录失败";

}

```



#### vue-cli3解决跨域问题（最后还是在后端解决）

在根目录下创建vue-config.js文件，并做如下配置

```js
module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080', //自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
```

配置了很多种方法 还是不行，只能在后端实现了 具体实现看后端文档

#### 路由跳转以及懒加载

##### 跳转

```html
<span slot="title" @click="tostuscore">成绩查询</span> 
```

```js
    tostuscore(){
      this.$router.push({path:'/stuhome/stuscore'});
      console.log("tostuscore")
    }
```

##### 懒加载

```javascript
    {
      path:'/teacherhome',
      name:'teacherhome',
      component:teacherhome,
      children:[
        { path:'teacherinfo', name:'管理员个人信息', component:()=> import('../views/teacher/teacherinfo.vue') },
      ]
    }
```

#### 画布实现动态粒子背景(插件)

https://vue-particles.netlify.com/

```powershell
npm install vue-particles --save-dev
```

```js
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
```

```html
<template> 
  <p id="app">
   <vue-particles
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
   >
   </vue-particles>
  </p>
 </template>
```

```html
color: String类型。默认'#dedede'。粒子颜色。
particleOpacity: Number类型。默认0.7。粒子透明度。
particlesNumber: Number类型。默认80。粒子数量。
shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
particleSize: Number类型。默认80。单个粒子大小。
linesColor: String类型。默认'#dedede'。线条颜色。
linesWidth: Number类型。默认1。线条宽度。
lineLinked: 布尔类型。默认true。连接线是否可用。
lineOpacity: Number类型。默认0.4。线条透明度。
linesDistance: Number类型。默认150。线条距离。
moveSpeed: Number类型。默认3。粒子运动速度。
hoverEffect: 布尔类型。默认true。是否有hover特效。
hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
clickEffect: 布尔类型。默认true。是否有click特效。
clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"
```

如果要在画布里面添加组件，则需要把组件绝对定位

```html
<template>
  <div id="app" class="wrap-banner">
    <div >
        <!-- <logo class="control"></logo> -->
        <loginform class="control"></loginform>
    </div>
    <vue-particles
      class="sky"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
  </div>
</template>

<script>
import logo from '../components/logo.vue'
import loginform from '../components/loginform.vue'
export default{
  data(){
    return{
    }
  },
  components:{
    logo,loginform
  }
}
</script>
 
<style lang="scss" scoped>
.control{
    height: 320px;
    position: absolute;
    left: 60%;
    top: 30%;
    border-radius: 2em;
}
    //固定属性 对画布背景进行修改
#particles-js{
    // background-color: #000000;
    background-image: url('../assets/bk5.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
}
.sky{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;   //这个z-index 要是不设置 会对登录表单的点击产生干扰
}
.wrap-banner {
    display: flex;
}
</style>

```



#### 前端实现拦截（路由守卫）

main.js

```javascript
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  //获取当前用户身份
  let role = sessionStorage.getItem('role')
  let user = JSON.parse(sessionStorage.getItem('user'));
  //所包括的子路由
  const student = ['login','stuhome','stuinfo','stuscore'];
  const teacher = ['login','teacherhome','teacherinfo'];
  const admin = ['login','adminhome','admininfo'];

  if (!user && to.path != '/login' ) {
    //未登录状态
    alert("请先登录")
    next({ path: '/login' })
  } else {
    //判断身份
    if(role == 'stu' && student.indexOf(to.name) < 0){
      //to.name 表示在路由配置时各个路由对应的名字
      alert("访问不合法");
      // next({ path: '/login' });
      router.go(-1);
    }else{
      if(role == 'teacher' && teacher.indexOf(to.name) < 0){
        alert("访问不合法");
        // next({ path: '/login' });
        router.go(-1);
      }else{
        if(role == 'admin' && admin.indexOf(to.name) < 0){
          alert("访问不合法");
          // next({ path: '/login' });
          router.go(-1);
        }else{
          next();
        }
      }
    }
  }
})
```

#### api.js设计

```javascript
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let base = 'http://localhost:8080'
axios.defaults.withCredentials=true;

export const student = {
    stulogin(params){ return axios.post(`${base}/student/stulogin`,params).then(res=>{return res})},
}

export const teacher = {
    teacherlogin(params){ return axios.post(`${base}/teacher/teacherlogin`,params).then(res=>{return res})},
}

export const admin = {
}
```

#### 路由设计

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home.vue'
import login from '../views/login.vue'
import error from '../views/404.vue'
import stuhome from '../views/student/stuhome.vue'
import adminhome from '../views/admin/adminhome.vue'
import teacherhome from '../views/teacher/teacherhome.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      //首页
      path: '/',
      name: 'home',
      component:home,
    },
    {
      //登录
      path:'/login',
      name:'login',
      component:login,
    },
    {
      //学生首页
      path:'/stuhome',
      name:'stuhome',
      component:stuhome,
      children:[
        { path:'stuinfo', name:'stuinfo', component:()=> import('../views/student/stuinfo.vue') },
        { path:'stuscore', name:'stuscore', component:()=>import('../views/student/stuscore.vue') },
        { path:'study', name:'study', component:()=>import('../views/student/study.vue') },
        { path:'sturesources', name:'sturesources', component:()=>import('../views/student/sturesources.vue') },
        { path:'problem', name:'problem', component:()=>import('../views/student/problem.vue') }
      ]
    },
    {
      path:'*',
      name:'404',
      component:error
    }
  ]
})

```

#### 验证码（插件）

https://github.com/mizuka-wu/vue2-verify

```powershell
npm i vue2-verify
```

##### 事件

| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| `ready`   | 验证码初始化成功的回调函数。                                 |
| `success` | 验证码匹配成功后的回调函数。如要重新初始化：success:function(obj){obj.refresh();}。 |
| `error`   | 验证码匹配失败后的回调函数。                                 |

##### 常规验证码

| 参数         | 说明                                                |
| ------------ | --------------------------------------------------- |
| `type`       | 验证码type为picture或者1                            |
| `width`      | 常规验证码的宽,支持百分比形式设置，如：width:100%。 |
| `height`     | 常规验证码的高,支持百分比形式设置，如：height:10%。 |
| `fontSize`   | 常规验证码中的字母&数字的字体大小，默认为30px。     |
| `codeLength` | 常规验证码中显示的验证码个数，默认为6。             |

![](C:\Users\Administrator\Desktop\毕设\image\常规验证码.PNG)

##### 运算验证码

| 参数         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `type`       | 验证码type为compute或者2                                     |
| `figure`     | 运算验证码的位数,默认是100以内的数字，即两位数。如果是要设置三位数，则设置figure:1000。 |
| `arith`      | 算法选择，支持加、减、乘。设置为1至3分别代表加减乘，0为随机切换。。 |
| `width`      | 运算验证码的宽,支持百分比形式设置，如：width:100%。          |
| `height`     | 运算验证码的高,支持百分比形式设置，如：height:10%。          |
| `fontSize`   | 运算验证码中的数字的字体大小，默认为30px。                   |
| `showButton` | 是否显示确定按钮，默认为true                                 |

![](C:\Users\Administrator\Desktop\毕设\image\运算验证码.PNG)

##### 滑动验证码

| 参数         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `type`       | 验证码type为slide或者3                                       |
| `vOffset`    | 滑动验证码的误差量，如：误差量为5px就能完成验证，设置vOffset:5。 |
| `explain`    | 滑动条内的提示，不设置默认是：向右滑动完成验证。             |
| `barSize`    | 其中包含了width、height两个参数，分别代表滑动条的宽度和高度，支持百分比方式设置，如：{width:'100%',height:'40px'} |
| `showButton` | 是否显示确定按钮，默认为true                                 |

![](C:\Users\Administrator\Desktop\毕设\image\滑动验证码.PNG)

##### 拼图验证码

| 参数         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `type`       | 验证码type为puzzle或者4                                      |
| `mode`       | 验证码的显示方式，弹出式pop，固定fixed，默认是：mode : 'fixed'。 |
| `vOffset`    | 滑动验证码的误差量，默认单位是px。如：误差量为5px就能完成验证，设置vOffset:5。 |
| `vSpace`     | 验证码图片和移动条容器的间隔，默认单位是px。如：间隔为5px，设置vSpace:5。 |
| `explain`    | 滑动条内的提示，不设置默认是：'向右滑动完成验证'。           |
| `imgUrl`     | 背景图片的地址，不设置默认是：'images/'。                    |
| `imgName`    | 验证码背景图的数组集合，默认从images目录中进行读取，如 ['1.jpg', '2.jpg']。 |
| `imgSize`    | 其中包含了width、height两个参数，分别代表图片的宽度和高度，支持百分比方式设置 如:{width:'100%',height:'200px'}。 |
| `blockSize`  | 其中包含了width、height两个参数，分别代表拼图块的宽度和高度，如:{width:'40px',height:'40px'}。。 |
| `barSize`    | 其中包含了width、height两个参数，分别代表滑动条的宽度和高度，支持百分比方式设置，如:{width:'100%',height:'40px'} |
| `showButton` | 是否显示确定按钮，默认为true                                 |

![](C:\Users\Administrator\Desktop\毕设\image\拼图验证码.PNG)

##### 选字验证码

| 参数         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `type`       | 验证码type为pick或者5                                        |
| `mode`       | 验证码的显示方式，弹出式pop，固定fixed，默认是：mode : 'fixed'。 |
| `defaultNum` | 验证码中出现的文字数量，如要默认4个字                        |
| `checkNum`   | 验证码中要求比对的文字数量，如要按序比对2个字                |
| `vSpace`     | 验证码图片和移动条容器的间隔，默认单位是px。                 |
| `imgUrl`     | 背景图片的地址，不设置默认是：'images/'。                    |
| `imgName`    | 验证码背景图的数组集合，默认从images目录中进行读取，如 ['1.jpg', '2.jpg']。 |
| `imgSize`    | 其中包含了width、height两个参数，分别代表图片的宽度和高度，支持百分比方式设置 如:{width:'100%',height:'200px'}。 |
| `barSize`    | 其中包含了width、height两个参数，分别代表滑动条的宽度和高度，支持百分比方式设置，如:{width:'100%',height:'40px'} |
| `showButton` | 是否显示确定按钮，默认为true                                 |

![](C:\Users\Administrator\Desktop\毕设\image\选字验证码.PNG)

##### 基础用例

```html
<template>
      <Verify @success="alert('success')" @error="alert('error')" :type="1"></Verify>
</template>


<script>
    import Verify from 'vue2-verify'

    export default {
        name: 'app',
        methods: {
            alert(text) {
                console.log(text)
            }
        },
        components: {
            Verify
        }
    }
</script>
```

#### 时间戳处理

```javascript
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      // var h = date.getHours() + ':';
      // var m = date.getMinutes() + ':';
      // var s = date.getSeconds();
      return Y + M + D;
    },
    add0(m){return m<10?'0'+m:m },
```

##### 分页的实现（element-ui 分页插件的使用）

```html
          <el-pagination
            :current-page="CurrentpageNum"   当前页码
            :page-size="10"	                 每页数量
            :pager-count="5"													
            layout="prev, pager, next"
            :total="total"                   总数，最好通过后端查询返回
            @current-change="getCurrentChange"   页码改变时触发的时间
            style="float:right;"
          ></el-pagination>


```

具体的去看官方文档http://element-cn.eleme.io/#/zh-CN/component/installation

一个简单的例子（结合后端看）

```javascript
      resources.getresources(params).then(res => {
        if (res.data.code == 204) {
          this.$message({
            type: "info",
            message: "查询不到相关资源"
          });
        } else {
          this.resorceslist = res.data.resources;  //后端返回的指定数据
          this.total = res.data.count;			//后端返回的总数
        }
      });

```

#### 文件上传与下载（结合后端.md去看）

参考博文https://www.jianshu.com/p/decd9e45f1bf

##### 文件上传(基于element-ui的el-upload)

```html
          <el-upload
            action="后端接口"
            ref="upload"
            class="upload-demo"
            :action="action"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :on-success="success"
            :on-error="error"
            :limit="1"
            name="file"
            :data="filedata"
            :on-exceed="handleExceed"
            accept=".PDF, .txt, .doc, .wps, .md"
          >

```

```javascript
上面绑定的数据在下面实现和验证
      filedata: {
        filecategoryid: "",
        filename: "",
        uploader: ""
      }


    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择 1 个文件`);
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      if (
        this.filedata.filecategoryid == null ||
        this.filedata.filecategoryid.length == 0 ||
        this.filedata.filename == null ||
        this.filedata.filename.length == 0
      ) {
        this.$message({
          type: "warning",
          message: "请完善上面的内容"
        });
        return false;
      }
      var maxsize = 1024 * 1024 * 5;
      if (file.size > maxsize) {
        this.$message({
          type: "warning",
          message: "文件过大，无法上传"
        });
        return false;
      }
    },
    success() {
      this.$message({
        type: "success",
        message: "上传成功"
      });
      this.filedata.filecategoryid = "";
      this.filedata.filename = "";
      this.showuploadinfo = false;
      this.$refs.upload.clearFiles();
      this.getresources();
    },
    error(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败"
      });
    }

```

##### 下载（接收后端数据并告诉浏览器这是下载）

```javascript
    downresources(row) {
      var params = {
        resid: row.resId
      };
      resources.downresources(params).then(res => {
        // console.log(res)
        var blob = new Blob([res.data]);
        var downloadElement = document.createElement("a");
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = row.resName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    },
    
        
        //这里是自己定义的api接口
    downresources(params) {
    return axios.post(`后端接口`, params,{responseType: 'blob'}).then(res => {
      return res
    })
  },  

```

#### 关于异步处理与同步处理（具体还是要去上网查）

```javascript
async beforeUpload(file) {
      var type = file.type.lastIndexOf("/");
      type = file.type.substring(file.type.lastIndexOf("/") + 1);
      const typelist = ['avi','mov','mp4','mkv','flv','rmvb','m3u8']
      if (
        this.filedata.filecategoryid == null ||
        this.filedata.filecategoryid.length == 0 ||
        this.filedata.filename == null ||
        this.filedata.filename.length == 0
      ) {
        this.$message({
          type: "warning",
          message: "请完善上面的内容"
        });
        return reject();
      }
      var params = {
        videoname: this.filedata.filename + "." + type
      };
      await new Promise((resolve, reject) => {
        resolve(
          video.getvideobyname(params).then(res => {
            if (res.data.code == 201) {
              return true;
            }else{
              return false;
            }
          })
        );
      }).then(data => {
        if(typelist.indexOf(type)<0){
          this.$message({
            type: "warning",
            message: "文件类型不对，无法上传"
          });
           console.log("文件类型不对，无法上传")
          return reject();
        }
        //大于500M不能上传
        var maxsize = 1024 * 1024 * 1024 * 1024 * 5; 
        if (file.size > maxsize) {
          this.$message({
            type: "warning",
            message: "文件过大，无法上传"
          });
          console.log("文件过大，无法上传")
          return reject();
        }
        if (data) {
          this.$message({
            type: "warning",
            message: "文件名已经存在，请重新命名"
          });
           console.log("文件名已经存在，请重新命名")
          return reject();
        }
      });
    },

```

#### 前后端分离下的视频播放

- 播放路径不能为绝对路径（我自己试过不可以，其他人我不知道），当然，如果不是前后端分离的项目可以
- 路径为后端跑起来的项目路径（http://localhost:8080/resources/data/video/pdd.mp4），/resources/data/video  是我自己在后端定义视频存放位置（具体看后端）

#### 实现视频播放（插件 ）

##### GitHub

https://surmon-china.github.io/vue-video-player/

##### 别人的例子

https://blog.csdn.net/fei565789229/article/details/78925395/

```javascript
<template>
  <div class="container">
    <div class="player">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
export default {
  data () {
    return {
      playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "application/x-mpegURL",
          src: "video.m3u8" //你的m3u8地址（必填）
        }],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
      }
    }
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlayerPlay(player) {
      alert("play");
    },
    onPlayerPause(player){
      alert("pause");
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }
</style>

```

##### 自己的实践（封装为一个组件）

```html
<template>
  <div class="container">
    <div class="player">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="false"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @statechanged="playerStateChanged($event)"
      ></video-player>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "../../node_modules/video.js/dist/video-js.css";
import "../../node_modules/vue-video-player/src/custom-theme.css";
export default {
  props: {
    videoUrl: String,
    state: Boolean
  },
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: this.videoUrl // 你的m3u8地址（必填）
          }
        ],
        // poster: '', // 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      }
    };
  },
  watch: {
    //更改视频源 videoUrl从弹出框组件传值
    videoUrl: function(val) {
      if (val !== "") {
        this.$refs.videoPlayer.player.src(val);
      }
    },
    //弹出框关闭后暂停 否则一直在播放 state从弹出框组件传值
    state: function(val) {
      if (val) {
        this.$refs.videoPlayer.player.pause();
      }
    }
  },
  methods: {
    onPlayerPlay(player) {},
    onPlayerPause(player) {},
    playerStateChanged(player) {}
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>

<style type="text/css" scoped>
.container {
  background-color: #efefef;
  min-height: 100%;
}
</style>

```

看看如何调用

```html
    <el-dialog title="视频观看" :visible.sync="showvideoinfo" width="40%"  @close="closePlay">
      <vueplayer ref="videoPlayer" :video-url="videoUrl" :state="state"></vueplayer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showvideoinfo = false">退出</el-button>
        <!-- <el-button type="primary" @click="detialPlayVideo = false" style="text-align:right">确 定</el-button> -->
      </span>
    </el-dialog>

```

记得引入和设置对应的url

```javascript
import vueplayer from "../../components/vueplayer";
export default {
  data() {
    return {
      showvideoinfo: false,
      videoUrl:"",
      state:true,
    };
  },
  components: {
    vueplayer
  },
  methods: {
    watchvideo(row) {
      var params ={
        videoid :row.videoId
      }
      video.addviewingtimes(params).then(res=>{
        if(res.data.code == 400){
          this.$message({
            type:'warning',
            message:'观看次数好像出BUG,找找程序员之可我不会唱歌'
          })
        }
      })
      this.videoUrl = row.videoPath; //这里的url是对应行传过来的值，是数据库对应保存的路径http://localhost:8080/resources/data/video/pdd.mp4，本地的没去试过
      this.showvideoinfo = true;
      this.getvideo();
    },
    closePlay() {
      this.$refs.videoPlayer.player.pause();
      this.videoUrl = "";
    }
  }
};

```
