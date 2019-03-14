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
          <el-button
            @click="showeditcategoryinfo"
            class="el-icon-circle-plus-outline"
            type="info"
          >类别管理</el-button>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6" class="searchinput">
          <el-input
            v-model="videoname"
            placeholder="请输入要查询的视频"
            prefix-icon="el-icon-search"
            @keyup.enter.native="getvideosbyname"
          ></el-input>
          <el-button class="searchbutton" icon="el-icon-search" circle @click="getvideobyname"></el-button>
          <el-button round @click="showuploadinfo = true" class="el-icon-upload" type="primary">上传视频</el-button>
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
                <!-- <el-button @click="downresources(scope.row)" type="primary" size="small">下载</el-button> -->
                <el-button @click="watchvideo(scope.row)" type="error" size="small">观看</el-button>
                <el-button @click="delvideo(scope.row)" type="error" size="small">删除</el-button>
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

    <el-dialog title="类别管理" :visible.sync="showeditcategory" width="30%">
      <el-table :data="categorylist" border style="width: 100%" height="500">
        <el-table-column prop="categoryId" label="ID"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="delcategory(scope.row)" type="danger" size="small">
              删除
              <i class="el-icon-delete el-icon--right"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog width="25%" title="添加类别" :visible.sync="showaddcategory" append-to-body>
        <el-input v-model="categoryname" placeholder="请输入类别名称"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showaddcategory = false">取 消</el-button>
          <el-button type="primary" @click="addcategory">确定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showeditcategory = false">取 消</el-button>
        <el-button type="primary" @click="showaddcategory = true">添加新类别</el-button>
      </div>
    </el-dialog>

    <el-dialog width="20%" title="上传视频" :visible.sync="showuploadinfo">
      <el-col :span="24">
        <el-col :span="10">
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
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="10">
          <el-input placeholder="请输入资源名称" v-model="filedata.filename"></el-input>
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
            accept=".avi, .mov, .mp4, .mkv, .flv, .rmvb, .m3u8"
          >
            <el-button size="small" type="primary">选择视频文件</el-button>
            <div slot="tip" class="el-upload__tip">只能为(.avi,.mov,.mp4,.mkv,.flv,.rmvb,.m3u8)文件且视频大小不能超过500M</div>
          </el-upload>
        </el-col>
      </el-col>

      <div slot="footer" class="dialog-footer" style="margin-top:50px;height:50px;">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { category,video } from "../../api/api.js";
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
      total: 20,
      showaddcategory: false,
      showeditcategory: false,
      showuploadinfo: false,
      filedata: {
        filecategoryid: "",
        filename: "",
        uploader: ""
      },
      flag: false
    };
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
      this.resourcename = "";
    },
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      this.getvideo();
    },
    delresources(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            resid: row.resId
          };
          resources.delresources(params).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.categoryid = "";
              this.resourcename = "";
              this.getresources();
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
    },
    chagecategoryid() {
      this.getvideo();
    },
    changeuploadfilecategoryid(value) {
      this.uploadfilecategoryid = value;
    },
    showeditcategoryinfo() {
      this.showeditcategory = true;
    },
    addcategory() {
      if (this.categoryname == null || this.categoryname.length == 0) {
        this.$message({
          type: "warning",
          message: "名称不规范，请重新输入"
        });
      } else {
        var params = {
          categoryname: this.categoryname
        };
        category.addcategory(params).then(res => {
          if (res.data.code == 201) {
            this.$message({
              type: "info",
              message: "该类别已经存在"
            });
          } else if (res.data.code == 400) {
            this.$message({
              type: "error",
              message: "添加失败，找人去"
            });
          } else {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
            this.getallcategory();
            this.showaddcategory = false;
          }
        });
      }
    },
    delcategory(row) {
      this.$confirm(
        "此操作将永久删除该类别及其目录下的资源, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var params = {
            categoryid: row.categoryId
          };
          category.delcategory(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getallcategory();
              this.getresources();
            } else {
              this.$message({
                type: "error",
                message: "删除失败，还是得杀个程序员祭天"
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
    getuploader() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      this.filedata.uploader = user.teacherName;
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
    // 文件验证
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
    delvideo(row) {
      this.$confirm("此操作将永久删除该视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            videoId: row.videoId,
            videoName: row.videoName
          };
          console.log(params)
          video.delvideo(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getvideo();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
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
    },
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
.el-upload__tip{
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}
</style>