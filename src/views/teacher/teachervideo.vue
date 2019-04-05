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
          <el-button class="searchbutton" icon="el-icon-search" circle @click="getvideobyname"></el-button>
          <el-button @click="showaddvideoinfo">上传视频</el-button>
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="watchvideo(scope.row)" type="primary" size="small">观看</el-button>
                <el-button @click="delvideo(scope.row)" type="primary" size="small">删除</el-button>
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

    <el-dialog title="视频观看" :visible.sync="showvideoinfo" width="40%" @close="closePlay">
      <vueplayer ref="videoPlayer" :video-url="videoUrl" :state="state"></vueplayer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showvideoinfo = false">退出</el-button>
        <!-- <el-button type="primary" @click="detialPlayVideo = false" style="text-align:right">确 定</el-button> -->
      </span>
    </el-dialog>

    <el-dialog width="20%" title="上传文件" :visible.sync="showaddvideoinfoBool">
      <el-col :span="24">
        <el-col :span="12">
          <el-select
            v-model="filedata.filecategoryid"
            placeholder="请选择类别"
            @change="changeuploadfilecategoryid"
          >
            <el-option
              v-for="item in categorylist"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入视频名称" v-model="filedata.filename"></el-input>
        </el-col>
        <el-col :span="24" style="margin:10px;">
          <el-upload
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
            accept=".mp4"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能为mp4文件且视频大小不能超过500M</div>
          </el-upload>
        </el-col>
      </el-col>

      <div slot="footer" class="dialog-footer" style="margin-top:50px;height:50px;"></div>
    </el-dialog>
  </div>
</template>

<script>
import { category, video } from "../../api/api.js";
import vueplayer from "../../components/vueplayer";
export default {
  data() {
    return {
      action: "http://localhost:8080/video/uploadvideo",
      videoname: "",
      videolist: [],
      categorylist: [],
      categoryname: "",
      categoryid: "",
      loading: false,
      CurrentpageNum: 1,
      total: 1,
      showvideoinfo: false,
      videoUrl: "",
      state: true,
      showaddvideoinfoBool: false,
      filedata: {
        filecategoryid: "",
        filename: "",
        uploader: ""
      }
    };
  },
  components: {
    vueplayer
  },
  mounted() {
    this.getallcategory();
    this.getvideo();
    this.getuploader();
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
      var params = {
        videoid: row.videoId
      };
      video.addviewingtimes(params).then(res => {
        if (res.data.code == 400) {
          this.$message({
            type: "warning",
            message: "观看次数好像出BUG,找找程序员之可我不会唱歌"
          });
        }
      });
      this.videoUrl = row.videoPath;
      this.showvideoinfo = true;
      this.getvideo();
    },
    closePlay() {
      this.$refs.videoPlayer.player.pause();
      this.videoUrl = "";
    },
    showaddvideoinfo() {
      this.showaddvideoinfoBool = true;
    },
    getuploader() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      this.filedata.uploader = user.teacherName;
    },
    changeuploadfilecategoryid(value) {
      this.filedata.filecategoryid = value;
    },
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
    async beforeUpload(file) {
      var type = file.name.substring(file.name.lastIndexOf(".") + 1);
      const typelist = ["mp4"];
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
      var params = {
        videoname: this.filedata.filename + "." + type
      };
      await new Promise((resolve, reject) => {
        resolve(
          video.getvideobyname(params).then(res => {
            if (res.data.code == 201) {
              return true;
            } else {
              return false;
            }
          })
        );
      }).then(data => {
        var maxsize = 1024 * 1024 * 1024 * 5;
        if (file.size > maxsize) {
          this.$message({
            type: "warning",
            message: "文件过大，无法上传"
          });
          return reject();
        }
        if (typelist.indexOf(type) < 0) {
          console.log(type);
          this.$message({
            type: "warning",
            message: "文件类型不对，无法上传"
          });
          console.log("文件类型不对，无法上传");
          return reject();
        }
        if (data) {
          this.$message({
            type: "warning",
            message: "文件名已经存在，请重新命名"
          });
          console.log("文件名已经存在，请重新命名");
          return reject();
        }
      });
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
      this.getvideo();
    },
    error(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败"
      });
    },
    delvideo(row){
      this.$confirm("此操作将永久删除该视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            videoId: row.videoId,
            videoName:row.videoName
          };
          video.delvideo(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getvideo();
            } else {
              this.$message({
                type: "error",
                message: "删除失败,哎"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
