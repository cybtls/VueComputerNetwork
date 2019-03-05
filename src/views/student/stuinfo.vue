<template>
  <div>
    <el-col :span="24" class="formmain">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="12">
        <el-form
          :model="stuform"
          status-icon
          :rules="stuformrule"
          ref="stuform"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="loading"
        >
          <el-form-item label="姓名" prop="stuName">
            <el-input type="text" v-model="stuform.stuName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="stuAccount">
            <el-input type="text" v-model="stuform.stuAccount" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="stuPassword">
            <el-input type="text" v-model="stuform.stuPassword"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="classname">
            <el-input type="text" v-model="stuform.stuClass.className" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密保问题" prop="stuQuestion">
            <el-input
              type="textarea"
              v-model="stuform.stuQuestion"
              rows="4"
              resize="none"
              class="el-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="密保回答" prop="stuAnswer">
            <el-input
              type="textarea"
              v-model="stuform.stuAnswer"
              rows="4"
              resize="none"
              class="el-input"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="hidden" v-model="stuform.stuStatus"></el-input>
            <el-input type="hidden" v-model="stuform.stuClass.classId"></el-input>
            <el-input type="hidden" v-model="stuform.stuId"></el-input>
            <el-button type="primary" icon="el-icon-edit" @click="submitForm('stuform')">提交</el-button>
            <el-button icon="el-icon-circle-close-outline" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-col>
  </div>
</template>

<script>
import { student } from "../../api/api.js";
export default {
  data() {
    return {
      stuform: {
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
      user: {},
      //验证规则
      stuformrule: {
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
      },
      loading: false
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    //表单提交
    submitForm(formName) {
      this.loading = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {
            stuform: JSON.stringify(this.stuform)
          };
          student.updatemyinfo(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "更新成功",
                type: "success",
                duration: 2000
              });
              sessionStorage.removeItem("user");
              sessionStorage.setItem("user", JSON.stringify(this.stuform));
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
          return false;
        }
      });
      this.loading = false;
    },
    //重置
    resetForm() {
      this.stuform.stuPassword = "";
      this.stuform.stuQuestion = "";
      this.stuform.stuAnswer = "";
    },
    //数据初始化
    start(){      
      this.user = sessionStorage.getItem("user");
      this.user = JSON.parse(this.user);
      this.stuform = this.user;
      this.loading = false;
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
