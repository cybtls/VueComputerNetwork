<template>
  <div>
    <el-col :span="24" class="formmain">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="12">
        <el-form
          :model="teacherform"
          status-icon
          :rules="teacherformrule"
          ref="teacherform"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="loading"
        >
          <el-form-item label="姓名" prop="teacherName">
            <el-input type="text" v-model="teacherform.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="teacherAccount">
            <el-input type="text" v-model="teacherform.teacherAccount" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="teacherPassword">
            <el-input type="text" v-model="teacherform.teacherPassword"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="teacherEmail">
            <el-input type="text" v-model="teacherform.teacherEmail"></el-input>
          </el-form-item>
          <el-form-item label="密保问题" prop="teacherQuestion">
            <el-input
              type="textarea"
              v-model="teacherform.teacherQuestion"
              rows="4"
              resize="none"
              class="el-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="密保回答" prop="teacherAnswer">
            <el-input
              type="textarea"
              v-model="teacherform.teacherAnswer"
              rows="4"
              resize="none"
              class="el-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="teacherCreatedate">
            <el-input type="text" v-model="teacherform.teacherCreatedate" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="hidden" v-model="teacherform.teacherStatus"></el-input>
            <el-input type="hidden" v-model="teacherform.teacherId"></el-input>
            <el-button type="primary" icon="el-icon-edit" @click="submitForm('teacherform')">提交</el-button>
            <el-button icon="el-icon-circle-close-outline" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-col>
  </div>
</template>

<script>
import { teacher } from "../../api/api.js";
export default {
  data() {
    return {
      teacherform: {
        teacherId: "",
        teacherName: "",
        teacherAccount: "",
        teacherPassword: "",
        teacherEmail: "",
        teacherQuestion: "",
        teacherAnswer: "",
        teacherStatus: "",
        teacherCreatedate: ""
      },
      user: {},
      teacherformrule: {
        teacherName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { max: 12, message: "字数超过限制" }
        ],
        teacherPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符" }
        ],
        teacherEmail: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ],
        teacherQuestion: [
          { required: true, message: "密保问题不能为空", trigger: "blur" },
          { max: 255, message: "字数超过限制" }
        ],
        teacherAnswer: [
          { required: true, message: "密保回答不能为空", trigger: "blur" },
          { max: 255, message: "字数超过限制" }
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
          var tform = this.teacherform;
          tform.teacherCreatedate = this.originaltime;
          // console.log(tform);
          var params = {
            stuform: JSON.stringify(tform)
          };
          teacher.updatemyinfo(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "更新成功",
                type: "success",
                duration: 2000
              });
              // sessionStorage.removeItem("user");
              // sessionStorage.setItem("user", JSON.stringify(this.teacherform));
              this.resetSetItem("user", JSON.stringify(this.teacherform));
              this.start();
              // this.$router.go(0)
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
      this.teacherform.teacherName = "";
      this.teacherform.teacherPassword = "";
      this.teacherform.teacherEmail = "";
      this.teacherform.teacherQuestion = "";
      this.teacherform.teacherAnswer = "";
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
      this.originaltime = this.user.teacherCreatedate;
      this.user.teacherCreatedate = this.timestampToTime(
        this.user.teacherCreatedate
      );
      this.teacherform = this.user;
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
