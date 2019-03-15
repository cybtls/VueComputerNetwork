<template>
  <div style="background-color: #fff;">
    <el-row>
      <!-- 搜索栏 -->
      <el-col :span="24" class="search">
        <el-col :span="13">
          <el-select v-model="categoryid" placeholder="请选择" @change="chagecategoryid">
            <el-option
              v-for="item in categorylist"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="4" class="searchinput">
          <el-input
            v-model="videoname"
            placeholder="请输入要查询的视频"
            prefix-icon="el-icon-search"
            @keyup.enter.native="getvideosbyname"
          ></el-input>
          <el-button class="searchbutton"  icon="el-icon-search" circle @click="getvideobyname"></el-button>
        </el-col>
      </el-col>

      <!-- 主体 -->
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="videolist" border style="width:100%" v-loading="loading" stripe>
            <el-table-column prop="videoId" label="资源ID" width="100px;"></el-table-column>
            <el-table-column prop="videoName" label="资源名称"></el-table-column>
            <el-table-column prop="category.categoryName" label="资源类别"></el-table-column>
            <el-table-column prop="videoViewingtimes" label="观看次数" width="100px;"></el-table-column>
            <el-table-column prop="videoLastuploader" label="上传者"></el-table-column>
            <el-table-column prop="videoLastmodification" label="最后修改时间"></el-table-column>
            <el-table-column label="操作" width="100px;">
              <template slot-scope="scope">
                <el-button @click="watchvideo(scope.row)" type="primary" size="small">观看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>

      <!-- 分页 -->
      <el-col :span="24">
        <el-col :span="20">
          <el-pagination
            :current-page="CurrentpageNum"
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="total"
            @current-change="getCurrentChange"
            style="float:right;"
          ></el-pagination>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>
    </el-row>


    <el-dialog title="视频观看" :visible.sync="showvideoinfo" width="40%"  @close="closePlay">
      <vueplayer ref="videoPlayer" :video-url="videoUrl" :state="state"></vueplayer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showvideoinfo = false">退出</el-button>
        <!-- <el-button type="primary" @click="detialPlayVideo = false" style="text-align:right">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { category, video } from "../../api/api.js";
import vueplayer from "../../components/vueplayer";
export default {
  data() {
    return {
      videoname: "",
      videolist: [],
      categorylist: [],
      categoryname: "",
      categoryid: "",
      loading: false,
      CurrentpageNum: 1,
      total: 1,
      showvideoinfo: false,
      videoUrl:"",
      state:true,
    };
  },
  components: {
    vueplayer
  },
  mounted() {
    this.getallcategory();
    this.getvideo();
  },
  methods: {
    getvideobyname() {
      this.getvideo();
      this.categoryid = "";
    },
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      this.getvideo();
    },
    chagecategoryid() {
      this.getvideo();
    },
    showeditcategoryinfo() {
      this.showeditcategory = true;
    },
    getallcategory() {
      category.getallcategory().then(res => {
        if (res.data.code == 200) {
          this.categorylist = res.data.categories;
        } else {
          this.$message({
            type: "error",
            message: "加载出错啦，找特仑苏去"
          });
        }
      });
    },
    getvideo() {
      var params = {
        CurrentpageNum: this.CurrentpageNum
      };
      if (this.videoname != null && this.videoname.length > 0) {
        params.videoname = this.videoname;
      }
      if (this.categoryid != null && this.categoryid > 0) {
        params.categoryid = this.categoryid;
      }
      video.getvideo(params).then(res => {
        if (res.data.code == 204) {
          this.$message({
            type: "info",
            message: "查询不到相关资源"
          });
        } else {
          this.total = res.data.count;
          this.videolist = res.data.videos;
        }
      });
    },
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
      this.videoUrl = row.videoPath;
      this.showvideoinfo = true;
      this.getvideo();
    },
    closePlay() {
      this.$refs.videoPlayer.player.pause();
      this.videoUrl = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
  .searchinput {
    display: flex;
    flex-direction: row;
  }
  .searchbutton {
    margin-left: 10px;
  }
}
.el-row {
  background-color: #fff;
  margin: 10px;
}
.el-upload__tip {
  font-size: 14px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
