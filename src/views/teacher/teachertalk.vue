<template>
  <div>
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="6">
          <el-button type="text" @click="showaddpost">发帖</el-button>
        </el-col>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="4" class="searchinput">
          <el-input
            v-model="posttitleorauthor"
            placeholder="请输入需要查询的标题内容"
            @keyup.enter.native="getpost"
          ></el-input>
          <el-button icon="el-icon-search" circle class="searchbutton" @click="getpost"></el-button>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="postlist" border style="width: 100%">
            <el-table-column prop="postTitle" label="标题" width="400px"></el-table-column>
            <el-table-column prop="postPresentername" label="发帖人"></el-table-column>
            <el-table-column prop="postTime" label="发帖时间"></el-table-column>
            <el-table-column prop="postFire" width="100px">
              <template slot="header">
                <i class="el-icon-view"/>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="lookpost(scope.row)" type="primary" size="small">查看</el-button>
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
      <span>帖子</span>
      <el-table :data="commentlist" stripe style="width: 100%">
        <el-table-column prop="commentPresentername" label="姓名" width="100px"></el-table-column>
        <el-table-column prop="commentText" label="发言"></el-table-column>
        <el-table-column prop="commentTime" label="时间"></el-table-column>
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
        placeholder="说出你的梦想......"
        rows="6"
        resize="none"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addcomment">确 定</el-button>
        <el-button @click="showpostinfo = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="发帖" :visible.sync="showaddpostinfo" width="30%">
      <span>发帖</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showaddpostinfo = false">取 消</el-button>
        <el-button type="primary" @click="showaddpostinfo = false">确 定</el-button>
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
        type: 2,
        name: "",
        comment: ""
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
      console.log(row);
    },
    showaddpost() {
      this.showaddpostinfo = true;
    },
    addpost() {},
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
      this.userinfo.id = _userinfo.teacherId;
      this.userinfo.name = _userinfo.teacherName;
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
</style>
