<template>
  <div>
    <el-row style="background-color: #fff;">
      <el-col :span="24" class="question">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="3">
          <el-button type="text" round class="putquestion" @click="showquestioninfo">咨询老师</el-button>
        </el-col>
      </el-col>
      <el-col :span="24" class="main">
        <el-col :span="5">&nbsp;</el-col>
        <el-col :span="14">
          <el-table :data="problems" style="width: 100%" height="600px">
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
                <el-button size="mini" type="info" @click="showdetails(scope.row)">详情</el-button>
                <el-button size="mini" type="danger" @click="delproblem(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5"></el-col>
      </el-col>
    </el-row>

    <el-dialog title="咨询老师" :visible.sync="questioninfo" width="25%">
      <el-form :model="questionform">
        <el-form-item label="我想问的老师">
          <el-select
            v-model="questionform.answerteacherid"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键字"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in newlist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题标题（少于50字）">
          <el-input type="text" v-model="questionform.title"></el-input>
        </el-form-item>
        <el-form-item label="问题详情（少于200字）">
          <el-input
            type="textarea"
            v-model="questionform.text"
            rows="6"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="questioninfo = false">取 消</el-button>
        <el-button type="primary" @click="addproblem">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="问题详情" :visible.sync="details" width="20%">
      <el-form :model="detailsform">
        <el-form-item label="提问时间">
          <span>{{detailsform.problemCreatedate}}</span>
        </el-form-item>
        <el-form-item label="我咨询的老师">
          <span>{{teachername}}</span>
        </el-form-item>
        <el-form-item label="问题标题">
          <span>{{detailsform.problemTitle}}</span>
        </el-form-item>
        <el-form-item label="问题详情">
          <span>{{detailsform.problemText}}</span>
        </el-form-item>
        <el-form-item label="问题回答" disabled v-if="this.showanswer">
          <span>{{detailsform.answer.answerText}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="details = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { problems, student } from "../../api/api.js";
export default {
  data() {
    return {
      questioninfo: false,
      details: false,
      questionform: {
        answerteacherid: "",
        title: "",
        text: ""
      },
      detailsform: {
        answer: {
          answerText: ""
        },
        problemCreatedate: "",
        problemTitle: "",
        problemText: ""
      },
      teachername: "",
      problems: [],
      showanswer: false,
      stuid: "",
      teacherlist: [],
      newlist: [],
      list: [],
      loading: false
    };
  },
  mounted() {
    this.getmyproblems();
    this.getteacherlist();
  },
  methods: {
    getmyproblems() {
      var stu = JSON.parse(sessionStorage.getItem("user"));
      this.stuid = stu.stuId;
      var params = {
        stuid: this.stuid
      };
      problems.getmyproblems(params).then(res => {
        if (res.data.code == 200) {
          this.problems = res.data.problems;
        } else {
          this.$message({
            type: "info",
            message: "你还没有提问过老师呢"
          });
        }
      });
    },
    delproblem(row) {
      this.$confirm("此操作将永久删除该问题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            problemid: row.problemId
          };
          problems.delproblem(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除是成功滴"
              });
              this.getmyproblems();
            } else {
              this.$message({
                type: "error",
                message: "删除失败，那就别删了"
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
    showdetails(row) {
      this.detailsform = row;
      this.details = true;
      var params = {
        teacherid: row.teacherId
      };
      problems.getteachernamebyid(params).then(res => {
        this.teachername = res.data.teachername;
      });
      if (row.answer == null) {
        this.showanswer = false;
      } else {
        this.showanswer = true;
      }
    },
    showquestioninfo() {
      this.questioninfo = true;
      this.list = this.teacherlist.map(item => {
        return { value: item.teacherId, label: item.teacherName };
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.newlist = this.list.filter(item => {
            return item.label.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.newlist = [];
      }
    },
    getteacherlist() {
      student.getteacherlist().then(res => {
        if (res.data.code == 200) {
          this.teacherlist = res.data.teachers;
        } else {
          this.$message({
            type: "error",
            message: "加载老师出错了，看代码去"
          });
        }
      });
    },
    addproblem() {
      if (
        this.questionform.answerteacherid == null ||
        this.questionform.answerteacherid.length == 0 ||
        this.questionform.title == null ||
        this.questionform.title.length > 50 ||
        this.questionform.title.length == 0 ||
        this.questionform.text == null ||
        this.questionform.text > 255 ||
        this.questionform.text.length == 0
      ) {
        this.$message({
          type: "warning",
          message: "请按要求填写"
        });
      } else {
        var params = {
          stuid: this.stuid,
          teacherid: this.questionform.answerteacherid,
          title: this.questionform.title,
          text: this.questionform.text
        };
        problems.addproblem(params).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "咨问成功,请等待老师回答"
            });
            this.questionform.title = "";
            this.questionform.text = "";
            this.questioninfo = false;
            this.getmyproblems();
          } else {
            this.$message({
              type: "error",
              message: "咨问失败,自己想去"
            });
          }
        });
      }
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
.test {
  display: inline-block;
}
.el-input {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
