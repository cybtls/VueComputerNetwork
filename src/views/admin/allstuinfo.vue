<template>
  <div style="background-color: #fff;">
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="4" class="searchinput">
          <!-- <el-select v-model="classId" placeholder="请选择班级" @change="getstudentbyclassid">
            <el-option
              v-for="item in classlist"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>-->
          <el-input
            v-model="searchclassname"
            placeholder="请输入要查询的班级"
            prefix-icon="el-icon-search"
            @keyup.enter.native="getstudentbyclassname"
          ></el-input>
          <el-button
            class="searchbutton"
            icon="el-icon-search"
            circle
            @click="getstudentbyclassname"
          ></el-button>
        </el-col>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="6" class="searchinput">
          <el-input
            v-model="searchstudentname"
            placeholder="请输入要查询的学生"
            prefix-icon="el-icon-search"
            @keyup.enter.native="getstudentbystudentname"
          ></el-input>
          <el-button
            class="searchbutton"
            icon="el-icon-search"
            circle
            @click="getstudentbystudentname"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            round
            @click="addstudent"
          >添加学生</el-button>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="stuinfo" border style="width:100%" stripe>
            <el-table-column prop="stuClass.classId" label="班级号"></el-table-column>
            <el-table-column prop="stuClass.className" label="班级"></el-table-column>
            <el-table-column prop="stuAccount" label="学号"></el-table-column>
            <el-table-column prop="stuName" label="姓名"></el-table-column>
            <el-table-column prop="stuStatus" label="状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.stuStatus"
                  active-color="#42d885"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="正常"
                  inactive-text="封禁"
                  disabled
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="250px">
              <template slot-scope="scope">
                <el-button @click="chagestatusto1(scope.row)" type="primary" size="small">启用</el-button>
                <el-button @click="chagestatusto0(scope.row)" type="info" size="small">禁用</el-button>
                <el-button @click="editstudent(scope.row)" size="small">
                  编辑
                  <i class="el-icon-edit el-icon--right"></i>
                </el-button>
                <!-- <el-button @click="delstudent(scope.row)" type="danger" size="small">
                  删除
                  <i class="el-icon-delete el-icon--right"></i>
                </el-button>-->
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

    <!-- 添加学生 :before-close="handleClose" -->
    <el-dialog title="添加学生" :visible.sync="showaddstudent" width="25%">
      <el-form
        :model="newstuinfo"
        status-icon
        :rules="stuformrule"
        ref="newstuinfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="stuName">
          <el-input type="text" v-model="newstuinfo.stuName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="year">
          <el-date-picker
            v-model="newstuinfo.year"
            type="year"
            value-format="yyyy"
            placeholder="选择年"
            class="left"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="密码" prop="stuPassword">
          <el-input type="text" v-model="newstuinfo.stuPassword"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classname">
          <el-select
            v-model="newstuinfo.stuClass.classId"
            placeholder="请选择班级"
            @change="changeclassid"
            class="left"
            style="width:220px;"
          >
            <el-option
              v-for="item in classlist"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密保问题" prop="stuQuestion">
          <el-input
            type="textarea"
            v-model="newstuinfo.stuQuestion"
            rows="4"
            resize="none"
            class="el-input"
            placeholder="请输入密保问题"
          ></el-input>
        </el-form-item>
        <el-form-item label="密保回答" prop="stuAnswer">
          <el-input
            type="textarea"
            v-model="newstuinfo.stuAnswer"
            rows="4"
            resize="none"
            class="el-input"
            placeholder="请输入密保回答"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="submitForm('newstuinfo')">提交</el-button>
          <el-button icon="el-icon-circle-close-outline" @click="resetForm('newstuinfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑学生信息 -->
    <el-dialog title="编辑学生信息" :visible.sync="showeditstudent" width="25%">
      <el-form
        :model="editstuinfo"
        status-icon
        :rules="stuformrule"
        ref="editstuinfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="stuName">
          <el-input type="text" v-model="editstuinfo.stuName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="stuAccount">
          <el-input type="text" v-model="editstuinfo.stuAccount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="stuPassword">
          <el-input type="text" v-model="editstuinfo.stuPassword"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classname">
          <el-select
            v-model="editstuinfo.stuClass.classId"
            placeholder="请选择班级"
            @change="changeclassid"
          >
            <el-option
              v-for="item in classlist"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密保问题" prop="stuQuestion">
          <el-input
            type="textarea"
            v-model="editstuinfo.stuQuestion"
            rows="4"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="密保回答" prop="stuAnswer">
          <el-input
            type="textarea"
            v-model="editstuinfo.stuAnswer"
            rows="4"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="hidden" v-model="editstuinfo.stuStatus"></el-input>
          <el-input type="hidden" v-model="editstuinfo.stuClass.classId"></el-input>
          <el-input type="hidden" v-model="editstuinfo.stuId"></el-input>
          <el-button type="primary" icon="el-icon-edit" @click="submiteditForm('editstuinfo')">修改</el-button>
          <el-button icon="el-icon-circle-close-outline" @click="reseteditForm('editstuinfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { admin } from "../../api/api.js";
export default {
  data() {
    return {
      showaddstudent: false,
      showeditstudent: false,
      searchclassname: "",
      searchstudentname: "",
      stuinfo: [],
      total: 100,
      user: {},
      CurrentpageNum: 1,
      classlist: [],
      newstuinfo: {
        stuName: "",
        stuAccount: "",
        stuPassword: "000000",
        stuClass: {
          classId: "",
          className: ""
        },
        stuQuestion: "000000",
        stuAnswer: "000000",
        stuClassid: "",
        stuId: "",
        stuStatus: ""
      },
      year: "",
      editstuinfo: {
        stuName: "",
        stuAccount: "",
        stuPassword: "",
        stuClass: {
          classId: "",
          className: ""
        },
        stuQuestion: "",
        stuAnswer: "",
        stuClassid: "",
        stuId: "",
        stuStatus: ""
      },
      stuformrule: {
        stuName: [
          { required: true, message: "名字不能为空", trigger: "blur" },
          { max: 8, message: "名字不能超过8位" }
        ],
        stuPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符" }
        ],
        stuQuestion: [
          { required: true, message: "密保问题不能为空", trigger: "blur" },
          { max: 255, message: "字数超过限制" }
        ],
        stuAnswer: [
          { required: true, message: "密保回答不能为空", trigger: "blur" },
          { max: 255, message: "字数超过限制" }
        ]
      }
    };
  },
  mounted() {
    this.getallclass();
    this.getallstudent();
  },
  methods: {
    //获取当前页码
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      var classname = this.searchclassname;
      var studentname = this.searchstudentname;
      if (classname == null && studentname == null) {
        this.getallstudent();
      } else if (studentname != null && classname.length == 0) {
        this.getstudentbystudentname();
      } else if (classname != null && studentname.length == 0) {
        this.getstudentbyclassname();
      } else {
        this.getallstudent();
      }
    },
    editstudent(row) {
      this.editstuinfo = row;
      this.showeditstudent = true;
    },
    addstudent() {
      this.showaddstudent = true;
    },
    // 按班级名
    getstudentbyclassname() {
      this.searchstudentname = "";
      if (this.searchclassname == null || this.searchclassname.length == 0) {
        this.getallstudent();
      } else {
        var params = {
          CurrentpageNum: this.CurrentpageNum,
          classname: this.searchclassname
        };
        admin.getstudentbyclassname(params).then(res => {
          if (res.data.code == 204) {
            this.$message({
              type: "info",
              message: "找不到相似班级或该班级下无学生"
            });
          } else {
            this.stuinfo = res.data.students;
            this.total = res.data.count;
          }
        });
      }
    },
    // 按学生名
    getstudentbystudentname() {
      this.searchclassname = "";
      if (
        this.searchstudentname == null ||
        this.searchstudentname.length == 0
      ) {
        this.getallstudent();
      } else {
        var params = {
          CurrentpageNum: this.CurrentpageNum,
          studentname: this.searchstudentname
        };
        admin.getstudentbystudentname(params).then(res => {
          if (res.data.code == 204) {
            this.$message({
              type: "info",
              message: "找不到相似学生"
            });
          } else {
            this.stuinfo = res.data.students;
            this.total = res.data.count;
          }
        });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 获取所有班级列表
    getallclass() {
      admin.getallclass().then(res => {
        this.classlist = res.data.classList;
      });
    },
    getallstudent() {
      var params = {
        CurrentpageNum: this.CurrentpageNum
      };
      admin.getallstudent(params).then(res => {
        this.stuinfo = res.data.students;
        this.total = res.data.count;
      });
    },
    chagestatusto1(row) {
      row.stuStatus = 1;
      var params = {
        stuid: row.stuId,
        status: row.stuStatus
      };
      admin.chagestatus(params).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改失败，请联系管理员",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    //改变学生状态为0 即是封禁状态
    chagestatusto0(row) {
      row.stuStatus = 0;
      var params = {
        stuid: row.stuId,
        status: row.stuStatus
      };
      admin.chagestatus(params).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改失败，请联系管理员",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    changeclassid() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {
            newstuinfo: JSON.stringify(this.newstuinfo),
            year: this.newstuinfo.year
          };
          admin.addstudent(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
                duration: 2000
              });
            } else {
              this.$message({
                showClose: true,
                message: "添加失败，请联系程序员",
                type: "error",
                duration: 2000
              });
            }
            this.showaddstudent = false;
            this.getallstudent();
          });
        } else {
          this.$message({
            showClose: true,
            message: "请按要求填写",
            type: "error",
            duration: 2000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submiteditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {
            editstuinfo: JSON.stringify(this.editstuinfo)
          };
          admin.editstudent(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            } else {
              this.$message({
                showClose: true,
                message: "更新失败，请联系程序员",
                type: "error",
                duration: 2000
              });
            }
            this.showeditstudent = false;
            this.getallstudent();
          });
        } else {
          this.$message({
            showClose: true,
            message: "请按要求填写",
            type: "error",
            duration: 2000
          });
          return false;
        }
      });
    },
    reseteditForm(formName) {
      this.$refs[formName].resetFields();
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
.el-row{
  margin-top: 10px;
}
.left{
  display: flex;
}
</style>
