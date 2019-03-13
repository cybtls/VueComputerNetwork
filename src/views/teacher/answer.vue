<template>
  <div>
    <el-row style="background-color: #fff;">
      <el-col :span="24" class="main">
        <el-col :span="5">&nbsp;</el-col>
        <el-col :span="12">
          <el-table :data="problemslist" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="问题详情:">
                    <span>{{props.row.problemText}}</span>
                  </el-form-item>
                  <el-form-item label="回答" v-if="props.row.answer!= null">
                    <span>{{props.row.answer.answerText}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="提问时间" prop="problemCreatedate"></el-table-column>
            <el-table-column label="标题" prop="problemTitle"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.answer == null"
                  size="mini"
                  type="info"
                  @click="showanswer(scope.row)"
                >回答</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5"></el-col>
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

    <el-dialog title="问题详情" :visible.sync="showanswerinfo" width="25%">
      <el-form :model="answerinfo">
        <el-form-item label="提问时间">
          <span>{{answerinfo.problemCreatedate}}</span>
        </el-form-item>
        <el-form-item label="问题标题">
          <span>{{answerinfo.problemTitle}}</span>
        </el-form-item>
        <el-form-item label="问题详情">
          <span>{{answerinfo.problemText}}</span>
        </el-form-item>
        <el-form-item label="回答">
          <el-input
            type="textarea"
            v-model="answerinfo.answertext"
            rows="5"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showanswerinfo = false">取消</el-button>
        <el-button type="primary" @click="addanswer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { problems, answer } from "../../api/api.js";
export default {
  data() {
    return {
      questioninfo: false,
      details: false,
      total: 1,
      questionform: {},
      CurrentpageNum: 1,
      problemslist: [],
      teacherid: "",
      answerinfo: {
        problemId: "",
        problemText: "",
        problemTitle: "",
        problemCreatedate: "",
        answertext: ""
      },
      showanswerinfo: false
    };
  },
  mounted() {
    this.getteacherid();
    this.getproblem();
  },
  methods: {
    getproblem() {
      var params = {
        teacherid: this.teacherid,
        CurrentpageNum: this.CurrentpageNum
      };
      problems.getmyproblemsbyteacherid(params).then(res => {
        if (res.data.code == 204) {
          this.$message({
            type: "info",
            message: "暂时没有需要解决的问题"
          });
        } else if (res.data.code == 400) {
          this.$message({
            type: "error",
            message: "出现BUG了,小虎杀疯辣"
          });
        } else {
          this.problemslist = res.data.problems;
          this.total = res.data.count;
        }
      });
    },
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      this.getproblem();
    },
    showanswer(row) {
      this.showanswerinfo = true;
      this.answerinfo = row;
    },
    addanswer() {
      if (
        this.answerinfo.answertext == null ||
        this.answerinfo.answertext.length == 0
      ) {
        this.$message({
          type: "warning",
          message: "请写下你的回答"
        });
      } else {
        var params = {
          problemid: this.answerinfo.problemId,
          text: this.answerinfo.answertext
        };
        answer.addanswer(params).then(res => {
          if (res.data.code == 200) {
            this.answerinfo.answertext = ""
            this.showanswerinfo = false;
            this.getproblem();
          } else {
            this.$message({
              type: "error",
              message: "回答失败辣，找辣个男人"
            });
          }
        });
      }
    },
    showquestioninfo() {
      this.questioninfo = true;
    },
    getteacherid() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      this.teacherid = user.teacherId;
    }
  }
};
</script>

<style lang="scss" scoped>
.question {
  margin: 10px 0;
  .putquestion {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-weight: 300;
    font-size: 16px;
    color: #000000;
  }
}
.main {
  margin: 10px 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-dialog__body {
  padding: 10px 15px;
}
</style>
