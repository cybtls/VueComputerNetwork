<template>
  <div style="background-color: #fff;">
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="6" class="searchinput">
          <el-input
            v-model="searchteachername"
            placeholder="请输入要查询的老师"
            prefix-icon="el-icon-search"
            @keyup.enter.native="getteacher"
            @blur="getteacher"
          ></el-input>
          <el-button class="searchbutton" icon="el-icon-search" circle @click="getteacher"></el-button>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            round
            @click="addteacher"
          >添加老师</el-button>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="teacherinfo" border style="width:100%" stripe>
            <el-table-column prop="teacherId" label="老师id" width="80px"></el-table-column>
            <el-table-column prop="teacherAccount" label="账号"></el-table-column>
            <el-table-column prop="teacherName" label="姓名"></el-table-column>
            <el-table-column prop="teacherEmail" label="邮箱"></el-table-column>
            <el-table-column prop="teacherCreatedate" label="创建日期"></el-table-column>
            <el-table-column prop="teacherStatus" label="状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.teacherStatus"
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
                <el-button @click="editteacher(scope.row)" size="small">
                  编辑
                  <i class="el-icon-edit el-icon--right"></i>
                </el-button>
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

    <!-- 编辑教师信息 -->
    <el-dialog title="编辑教师信息" :visible.sync="showeditteacher" width="25%">
      <el-form
        :model="editteacherinfo"
        status-icon
        :rules="teacherformrule"
        ref="editteacherinfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="teacherName">
          <el-input type="text" v-model="editteacherinfo.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="teacherAccount">
          <el-input type="text" v-model="editteacherinfo.teacherAccount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="teacherPassword">
          <el-input type="text" v-model="editteacherinfo.teacherPassword"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="teacherEmail">
          <el-input type="text" v-model="editteacherinfo.teacherEmail"></el-input>
        </el-form-item>
        <el-form-item label="密保问题" prop="teacherQuestion">
          <el-input
            type="textarea"
            v-model="editteacherinfo.teacherQuestion"
            rows="4"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="密保回答" prop="teacherAnswer">
          <el-input
            type="textarea"
            v-model="editteacherinfo.teacherAnswer"
            rows="4"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="hidden" v-model="editteacherinfo.teacherStatus"></el-input>
          <el-input type="hidden" v-model="editteacherinfo.teacherId"></el-input>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="submiteditForm('editteacherinfo')"
          >修改</el-button>
          <el-button
            icon="el-icon-circle-close-outline"
            @click="reseteditForm('editteacherinfo')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>




    
  </div>
</template>

<script>
import { admin, teacher } from "../../api/api.js";
export default {
  data() {
    return {
      showeditteacher: false,
      showaddteacher: false,
      editteacherinfo: {},
      addteacherinfo: {},
      teacherformrule: {
        teacherName: [
          { required: true, message: "名字不能为空", trigger: "blur" },
          { max: 8, message: "名字不能超过8位" }
        ],
        teacherPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符" }
        ],
        teacherQuestion: [
          { required: true, message: "密保问题不能为空", trigger: "blur" },
          { max: 255, message: "字数超过限制" }
        ],
        teacherAnswer: [
          { required: true, message: "密保回答不能为空", trigger: "blur" },
          { max: 255, message: "字数超过限制" }
        ],
        teacherEmail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ]
      },
      searchteachername: "",
      teacherinfo: [],
      CurrentpageNum: 1,
      total: 1
    };
  },
  mounted() {
    this.getteacher();
  },
  methods: {
    addteacher(row) {
      this.showaddteacher = true;
    },
    editteacher(row) {
      this.showeditteacher = true;
      this.editteacherinfo = row;
    },
    submiteditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var time = this.editteacherinfo.teacherCreatedate
          this.editteacherinfo.teacherCreatedate = (new Date(time)).valueOf();
          var params = {
            teacherinfo: JSON.stringify(this.editteacherinfo)
          };
          admin.editteacher(params).then(res => {
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
            this.showeditteacher = false;
            this.getteacher();
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
    },
    getteacher() {
      var param = {
        CurrentpageNum: this.CurrentpageNum
      };
      if (this.searchteachername != null && this.searchteachername.length > 0) {
        param.searchteachername = this.searchteachername;
      }
      admin.getteacher(param).then(res => {
        if (res.data.code == 200) {
          this.teacherinfo = res.data.teachers;
          this.total = res.data.count;
          for (var i = 0; i < this.teacherinfo.length; i++) {
            var timestamp = new Date(
              this.teacherinfo[i].teacherCreatedate
            ).valueOf();
            this.teacherinfo[i].teacherCreatedate = this.timestampToTime(
              timestamp
            );
          }
        } else {
          this.$message({
            type: "info",
            message: "查找不到相似的教师"
          });
        }
      });
    },
    chagestatusto1(row) {
      row.teacherStatus = 1;
      var params = {
        teacherStatus: row.teacherStatus,
        teacherId: row.teacherId
      };
      admin.changeteacherstatus(params).then(res => {
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
    chagestatusto0(row) {
      row.teacherStatus = 0;
      var params = {
        teacherStatus: row.teacherStatus,
        teacherId: row.teacherId
      };
      admin.changeteacherstatus(params).then(res => {
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
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      this.getteacher();
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10
          ? "0" + (date.getDate())
          : date.getDate()) + " ";
      // var D = date.getDate() + " ";
      // var h = date.getHours() + ':';
      // var m = date.getMinutes() + ':';
      // var s = date.getSeconds();
      return Y + M + D;
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
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
  margin-top: 10px;
}
.left {
  display: flex;
}
</style>
