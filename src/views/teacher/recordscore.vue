<template>
  <div style="background-color: #fff;">
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="11">&nbsp;
          <el-select v-model="classId" placeholder="请选择" @change="chageclassId">
            <el-option
              v-for="item in classlist"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">&nbsp;</el-col>
        <el-col :span="4" class="searchinput">
          <el-input
            v-model="searchname"
            placeholder="请输入要查询的班级"
            prefix-icon="el-icon-search"
            @keyup.enter.native="changesearchname"
          ></el-input>
          <el-button class="searchbutton" icon="el-icon-search" circle @click="changesearchname"></el-button>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="stuinfo" border style="width:100%" stripe>
            <el-table-column prop="stuClass.className" label="班级"></el-table-column>
            <el-table-column prop="stuAccount" label="学号"></el-table-column>
            <el-table-column prop="stuName" label="姓名"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="showstuscoreinfo(scope.row)" type="primary" size="small">查看成绩</el-button>
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
            :pager-count="7"
            layout="prev, pager, next"
            :total="total"
            @current-change="getCurrentChange"
            style="float:right;"
          ></el-pagination>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>
    </el-row>

    <el-dialog title="学生成绩" width="20%" :visible.sync="showstuscore">
      <span>{{stuname}}</span>
      <el-table :data="stuscorelist" style="width: 100%">
        <el-table-column prop="course.courseName" label="课程名"></el-table-column>
        <el-table-column prop="courseScore" label="成绩"></el-table-column>
      </el-table>


      <el-dialog width="15%" title="登记成绩" :visible.sync="showupdatastuscore" append-to-body>
        <el-select v-model="courseid" placeholder="请选择">
          <el-option
            v-for="item in courselist"
            :key="item.courseId"
            :label="item.courseName"
            :value="item.courseId"
          ></el-option>
        </el-select>
        <el-input placeholder="请输入成绩" v-model.number="score"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showupdatastuscore = false">取 消</el-button>
          <el-button type="primary" @click="updatastuscore">确 定</el-button>
        </div>
      </el-dialog>



      <div slot="footer" class="dialog-footer">
        <el-button @click="showstuscore = false">取 消</el-button>
        <el-button type="primary" @click="showupdatastuscore = true">登记成绩</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { teacher, score, course } from "../../api/api.js";
export default {
  data() {
    return {
      searchname: "",
      stuinfo: [],
      total: 0,
      user: {},
      CurrentpageNum: 1,
      classlist: [],
      classId: "",
      stuscorelist: [],
      showstuscore: false,
      showupdatastuscore: false,
      stuname: "",
      stuid: "",
      courselist: [],
      courseid: "",
      score: ""
    };
  },
  mounted() {
    //数据初始化
    this.getmyclassinfo();
    this.getmyclassbyname();
    this.getcourselist();
  },
  methods: {
    // 获取自己管理班级信息
    getmyclassinfo() {
      var params = {
        user: sessionStorage.getItem("user")
      };
      teacher.getmyclassinfo(params).then(res => {
        if (res.data.code == 200) {
          this.classlist = res.data.myclassinfo;
        } else {
          alert("nothing");
        }
      });
    },
    //通过班级名来查询班级
    getmyclassbyname() {
      this.classId = "";
      var params = {
        classname: this.searchname,
        user: sessionStorage.getItem("user"),
        CurrentpageNum: this.CurrentpageNum
      };
      teacher.getmyclassbyname(params).then(res => {
        if (res.data.code == 200) {
          this.total = res.data.count;
          this.stuinfo = res.data.students;
        } else {
          this.$message({
            showClose: true,
            message: "查找不到相关班级",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    //通过班级id来查询班级
    getmyclassbyid() {
      var params = {
        CurrentpageNum: this.CurrentpageNum,
        classid: this.classId
      };
      teacher.getmyclassbyid(params).then(res => {
        if (res.data.code == 200) {
          (this.total = res.data.count), (this.stuinfo = res.data.students);
        } else {
          this.$message({
            showClose: true,
            message: "失败",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    showstuscoreinfo(row) {
      this.showstuscore = true;
      this.stuname = row.stuName;
      this.stuid = row.stuId;
      var params = {
        stuid: row.stuId
      };
      score.getstuscore(params).then(res => {
        this.stuscorelist = res.data.scores;
      });
    },
    getcourselist() {
      course.getcourse().then(res => {
        if (res.data.code == 200) {
          this.courselist = res.data.courses;
        } else {
          this.$message({
            type: "error",
            message: "加载出错"
          });
        }
      });
    },
    updatastuscore() {
      var reg = /^[0-9]*$/;
      var flag = reg.test(this.score);
      if (!flag || this.courseid == null || this.courseid.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择课程与输入0-100的正整数"
        });
      } else {
        if (this.score < 0 || this.score > 100) {
          this.$message({
            type: "warning",
            message: "只能输入0-100的正整数"
          });
        } else {
          var params = {
            courseid: this.courseid,
            score: this.score,
            stuid: this.stuid
          };
          console.log(params);
          score.addscore(params).then(res => {
            console.log(res);
            if (res.data.code == 201) {
              this.$message({
                type: "warning",
                message: "该科成绩已经存在"
              });
            } else if (res.data.code == 400) {
              this.$message({
                type: "error",
                message: "登记失败，不想了"
              });
            } else {
              this.$message({
                type: "success",
                message: "登记成功"
              });
              this.showstuscore = false;
            }
          });
        }
      }
    },
    //获取当前页码
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      if (this.classId != null && this.classId != "") {
        this.getmyclassbyid();
      } else {
        this.getmyclassbyname();
      }
    },
    chageclassId() {
      this.CurrentpageNum = 1;
      this.getmyclassbyid();
    },
    changesearchname() {
      this.CurrentpageNum = 1;
      this.getmyclassbyname();
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
