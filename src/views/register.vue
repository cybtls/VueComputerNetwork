<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-col :span="10">&nbsp;</el-col>
        <el-col :span="4" class="sign">教师注册</el-col>
        <el-col :span="10"></el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="8">
          <el-form
            :model="addteacherinfo"
            status-icon
            :rules="teacherformrule"
            ref="addteacherinfo"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="teacherName">
              <el-input type="text" v-model="addteacherinfo.teacherName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="teacherAccount">
              <el-input type="text" v-model="addteacherinfo.teacherAccount" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="teacherPassword">
              <el-input type="text" v-model="addteacherinfo.teacherPassword" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="teacherEmail">
              <el-input type="text" v-model="addteacherinfo.teacherEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密保问题" prop="teacherQuestion">
              <el-input
                type="textarea"
                v-model="addteacherinfo.teacherQuestion"
                rows="4"
                resize="none"
                class="el-input"
                placeholder="请输入密保问题"
              ></el-input>
            </el-form-item>
            <el-form-item label="密保回答" prop="teacherAnswer">
              <el-input
                type="textarea"
                v-model="addteacherinfo.teacherAnswer"
                rows="4"
                resize="none"
                class="el-input"
                placeholder="请输入密保回答"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-edit" @click="submitForm('addteacherinfo')">注册</el-button>
              <el-button icon="el-icon-circle-close-outline" @click="resetForm('addteacherinfo')">重置</el-button>
              <router-link icon="el-icon-circle-close-outline" to="/login" class="link">返回登录</router-link>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8"></el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { admin } from "../api/api.js";
export default {
  data() {
    return {
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
        ],
        teacherAccount: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符" }
        ]
      }
    };
  },
  methods: {
    addteacher() {
      this.showaddteacher = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {
            addteacherinfo: JSON.stringify(this.addteacherinfo)
          };
          admin.addteacher(params).then(res => {
            if (res.data.code == 201) {
              this.$message({
                showClose: true,
                message: "账号已存在",
                type: "warning",
                duration: 2000
              });
            } else if (res.data.code == 400) {
              this.$message({
                showClose: true,
                message: "注册失败，请联系程序员",
                type: "error",
                duration: 2000
              });
            } else {
              this.$message({
                showClose: true,
                message: "注册成功，请等待管理员同意",
                type: "success",
                duration: 2000
              });
              this.$router.push("/");
            }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 100px auto;
}
.link {
  margin-left: 2em;
  background-color: #fff;
}
.sign{
    margin: 2em 0;
    font-size: 16px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: 600;
}
.el-input{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
