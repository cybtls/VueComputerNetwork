<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">管理员登录</h3>
    <el-form-item prop="adminaccount">
      <el-input type="text" v-model="ruleForm.adminaccount" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="adminpassword">
      <el-input type="password" v-model="ruleForm.adminpassword" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleSubmit('ruleForm')"
        :loading="logining"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { admin } from "../api/api.js";
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        adminaccount: "",
        adminpassword: ""
      },
      rules: {
        adminaccount: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "请输入大于6小于12的账号",
            trigger: "blur"
          }
        ],
        adminpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "请输入大于6小于12的密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // handleReset() {
    //   this.$refs[ruleForm].resetFields();
    // },
    handleSubmit(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          var params = {
            adminaccount: this.ruleForm.adminaccount,
            adminpassword: this.ruleForm.adminpassword
          };
          admin.adminlogin(params).then(res => {
            if (res.data.code == 204) {
              this.$message({
                message: "你的账号或密码错误，请重新输入",
                type: "error"
              });
            }else{
                sessionStorage.setItem("role", "admin");
                sessionStorage.setItem("user", JSON.stringify(res.data.admin));
                this.$router.push({ path: "/adminhome/classinfo" });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "请按要求填写"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 15px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 13% auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>