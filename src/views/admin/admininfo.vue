<template>
  <div>
    <el-col :span="24" class="formmain">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="12">
        <el-form
          :model="adminform"
          status-icon
          :rules="adminformrule"
          ref="adminform"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="loading"
        >
          <el-form-item label="姓名" prop="adminName">
            <el-input type="text" v-model="adminform.adminName"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="adminAccount">
            <el-input type="text" v-model="adminform.adminAccount" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="adminPassword">
            <el-input type="text" v-model="adminform.adminPassword"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="adminEmail">
            <el-input type="text" v-model="adminform.adminEmail"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="adminCreatedate">
            <el-input type="text" v-model="adminform.adminCreatedate" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="hidden" v-model="adminform.adminStatus"></el-input>
            <el-input type="hidden" v-model="adminform.adminId"></el-input>
            <el-button type="primary" icon="el-icon-edit" @click="submitForm('adminform')">提交</el-button>
            <el-button icon="el-icon-circle-close-outline" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-col>
  </div>
</template>

<script>
import { admin } from "../../api/api.js";
export default {
  data() {
    return {
      adminform: {
        adminId: "",
        adminName: "",
        adminAccount: "",
        adminPassword: "",
        adminEmail: "",
        adminCreatedate: "",
        adminSuper: ""
      },
      user: {},
      adminformrule: {
        adminName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { max: 12, message: "字数超过限制" }
        ],
        adminPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        adminEmail: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ]
      },
      loading: false,
      originaltime: ""
    };
  },
  mounted() {
    // console.log(sessionStorage.getItem("user"));
    this.start();
  },
  methods: {
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var tform = this.adminform;
          tform.adminCreatedate = this.originaltime;
          // console.log(tform);
          var params = {
            adminform: JSON.stringify(tform)
          };
          admin.updatemyinfo(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "更新成功",
                type: "success",
                duration: 2000
              });
              sessionStorage.removeItem("user");
              sessionStorage.setItem("user", JSON.stringify(this.adminform));
              this.start();
            } else {
              this.$message({
                showClose: true,
                message: "更新失败，请联系管理员",
                type: "error",
                duration: 2000
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "请按要求填写",
            type: "error",
            duration: 2000
          });
        }
      });
      this.loading = false;
    },
    resetForm() {
      this.adminform.adminName = "";
      this.adminform.adminPassword = "";
      this.adminform.adminEmail = "";
    },
    //时间戳转年月日
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      // var h = date.getHours() + ':';
      // var m = date.getMinutes() + ':';
      // var s = date.getSeconds();
      return Y + M + D;
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    },
    start() {
      this.user = sessionStorage.getItem("user");
      this.user = JSON.parse(this.user);
      this.originaltime = this.user.adminCreatedate;
      this.user.adminCreatedate = this.timestampToTime(
        this.user.adminCreatedate
      );
      this.adminform = this.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.formmain {
  padding-top: 120px;
  background-color: #fff;
}
.el-input {
  font-size: 14px;
  font-family: "STZhongsong";
  box-shadow: 20px 10px 10px gray;
}
</style>
