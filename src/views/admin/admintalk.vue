<template>
  <div>
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="6">
          <el-button type="text" @click="showaddpost">发帖</el-button>
          <el-button type="text" @click="getpost">全部帖子</el-button>
          <el-button type="text" @click="getmypost">我的帖子</el-button>
        </el-col>
        <el-col :span="7">&nbsp;</el-col>
        <el-col :span="5" class="searchinput">
          <el-input
            v-model="posttitleorauthor"
            prefix-icon="el-icon-search"
            placeholder="请输入查询的标题内容(默认全部)"
            @change="getpost"
            @keyup.enter.native="getpost"
          ></el-input>
          <el-button icon="el-icon-search" circle class="searchbutton" @click="getpost"></el-button>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="postlist" border style="width: 100%">
            <el-table-column label="标题">
              <template slot-scope="scope">
                <el-button type="text" @click="lookpost(scope.row)">{{scope.row.postTitle}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="postPresentername" label="发帖人"></el-table-column>
            <el-table-column prop="postTime" label="发帖时间"></el-table-column>
            <el-table-column prop="postFire" width="100px">
              <template slot="header">
                <i class="el-icon-view"/>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <el-button @click="lookpost(scope.row)" type="primary" size="small">查看</el-button> -->
                <el-button @click="delpost(scope.row)" type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>
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

    <el-dialog title="帖子" :visible.sync="showpostinfo" width="30%">
      <div class="title">{{postinfo.postTitle}}</div>
      <div class="author">发帖人：{{postinfo.postPresentername}}</div>
      <div class="text">{{postinfo.postText}}</div>
      <el-table :data="commentlist" stripe style="width: 100%">
        <el-table-column prop="commentPresentername" label="姓名" width="100px"></el-table-column>
        <el-table-column prop="commentText" label="发言"></el-table-column>
        <el-table-column prop="commentTime" label="时间"></el-table-column>
        <el-table-column label="操作" width="70px">
          <template slot-scope="scope">
            <el-button @click="delcomment(scope.row)" type="text" size="small" class="delcomment">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="commentCurrentpageNum"
        :page-size="7"
        :pager-count="5"
        layout="prev, pager, next"
        :total="commenttotal"
        @current-change="getcommentCurrentChange"
        style="float:right;"
      ></el-pagination>
      <el-input
        type="textarea"
        v-model="userinfo.comment"
        placeholder="说出你的梦想......（200字以内哈）"
        rows="6"
        resize="none"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addcomment">确 定</el-button>
        <el-button @click="showpostinfo = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="发帖" :visible.sync="showaddpostinfo" width="30%">
      <div class="newtitle">标题</div>
      <el-input v-model="newpostinfo.postTitle" placeholder="请输入标题（少于50字）"></el-input>
      <div class="newtext">内容</div>
      <el-input
        type="textarea"
        v-model="newpostinfo.postText"
        resize="none"
        rows="6"
        placeholder="请输入内容（少于250字）"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addpost">确 定</el-button>
        <el-button @click="showaddpostinfo = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post, comment } from "../../api/api.js";
export default {
  data() {
    return {
      showpostinfo: false,
      showaddpostinfo: false,
      postlist: [],
      commentlist: [],
      posttitleorauthor: "",
      CurrentpageNum: 1,
      total: 1,
      commentCurrentpageNum: 1,
      commenttotal: 1,
      addpostinfo: {},
      postinfo: {},
      userinfo: {
        id: "",
        postid: "",
        type: 3,
        name: "",
        comment: ""
      },
      newpostinfo: {
        postPresenterid: "",
        postPresentertype: 3,
        postPresentername: "",
        postTitle: "",
        postText: ""
      }
    };
  },
  mounted() {
    this.getpost();
    this.getuser();
  },
  methods: {
    getpost() {
      let params = {
        currentpagenum: this.CurrentpageNum
      };
      if (
        this.posttitleorauthor != null &&
        this.posttitleorauthor.length != 0
      ) {
        params.posttitleorauthor = this.posttitleorauthor;
      }
      post.getpost(params).then(res => {
        if (res.data.code == 200) {
          this.postlist = res.data.posts;
        } else {
          this.$message({
            type: "warning",
            message: "加载出错"
          });
        }
      });
    },
    getcomment(value) {
      var params = {
        commentCurrentpageNum: this.commentCurrentpageNum,
        postid: value
      };
      comment.getcomment(params).then(res => {
        if (res.data.code == 200) {
          this.commentlist = res.data.comments;
          this.commenttotal = res.data.count;
        } else if (res.data.code == 204) {
          this.commentlist = [];
          this.commenttotal = 1;
          this.$message({
            type: "info",
            message: "暂无评论"
          });
        } else {
          this.commentlist = [];
          this.commenttotal = 1;
          this.$message({
            type: "error",
            message: "失败失败失败"
          });
        }
      });
    },
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      this.getpost();
    },
    getcommentCurrentChange(value) {
      this.commentCurrentpageNum = value;
      this.getcomment(this.postinfo.postId);
    },
    lookpost(row) {
      this.postinfo = row;
      this.showpostinfo = true;
      this.userinfo.postid = row.postId;
      post.addpostfire({ postid: row.postId }).then(res => {
        if (res.data.code == 400) {
          this.$message({
            type: "warning",
            message: "热度出问题了"
          });
        }
      });
      // this.getpost();
      this.getcomment(row.postId);
    },
    delpost(row) {
      this.$confirm("此操作将永久删除该帖及其评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          post.delpost({ postid: row.postId }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getpost();
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
    delcomment(row) {
      console.log(row);
      this.$confirm("此操作将永久删除此条评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          comment.delcomment({ commentid: row.commentId }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getcomment(row.postId);
            } else {
              this.$message({
                type: "error",
                message: "去数据库删吧，不想改了!"
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
    showaddpost() {
      this.showaddpostinfo = true;
    },
    addpost() {
      this.$confirm("发帖？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (
            this.newpostinfo.postTitle == null ||
            this.newpostinfo.postTitle.length == 0 ||
            this.newpostinfo.postTitle.length > 50 ||
            this.newpostinfo.postText == null ||
            this.newpostinfo.postText.length == 0 ||
            this.newpostinfo.postText.length > 250
          ) {
            this.$message({
              type: "warning",
              message: "请按要求写好不!"
            });
          } else {
            var params = {
              postinfo: JSON.stringify(this.newpostinfo)
            };
            post.addpost(params).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "发帖成功!"
                });
                this.showaddpostinfo = false;
                this.getpost();
              } else {
                this.$message({
                  type: "error",
                  message: "发帖失败!"
                });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    addcomment() {
      if (
        this.userinfo.comment == null ||
        this.userinfo.comment.length == 0 ||
        this.userinfo.comment.length >= 250
      ) {
        this.$message({
          type: "warning",
          message: "不能为空，且字数在240字以内"
        });
      } else {
        var params = this.userinfo;
        comment.addcomment(params).then(res => {
          if (res.data.code == 200) {
            this.userinfo.comment = "";
            this.commentCurrentpageNum = 1;
            this.getcomment(this.postinfo.postId);
            this.$message({
              type: "success",
              message: "水帖成功"
            });
          } else {
            this.$message({
              type: "error",
              message: "出事啦"
            });
          }
        });
      }
    },
    getuser() {
      var _userinfo = JSON.parse(sessionStorage.getItem("user"));
      this.userinfo.id = _userinfo.adminId;
      this.userinfo.name = _userinfo.adminName;
      this.newpostinfo.postPresenterid = _userinfo.adminId;
      this.newpostinfo.postPresentername = _userinfo.adminName;
    },
    getmypost() {
      var params = {
        currentpagenum: this.CurrentpageNum,
        type: 3,
        id: this.userinfo.id
      };
      post.getmypost(params).then(res => {
        if (res.data.code == 200) {
          this.postlist = res.data.posts;
          this.total = res.data.count;
        } else if (res.data.code == 204) {
          this.$message({
            type: "info",
            message: "你暂时还没有发过帖子呢"
          });
        } else {
          this.$message({
            type: "error",
            message: "你的帖子可能丢失了"
          });
        }
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
.title {
  font-size: 16px;
  margin: 0 0 10px 0;
  font-weight: 600;
}
.author {
  font-size: 12px;
  margin: 0 0 10px 0;
}
.text {
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
  border: 2px;
  border-style: ridge;
  border-radius: 1em;
  width: 100%;
  height: 100px;
  overflow: auto;
}
.newtitle {
  text-align: left;
  margin: 5px 0;
}
.newtext {
  text-align: left;
  margin: 5px 0;
}
.delcomment {
  color: #f56c6c;
  font-size: 14px;
}
</style>
