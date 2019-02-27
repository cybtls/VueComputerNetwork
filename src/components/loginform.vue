<template>
  <div class="login">
    <el-row>
      <el-col :span="12">
        <el-button class="role" type="text" @click="stu" :class="role=='stu'?'active':''">
          <span class="sign">学生登录</span>
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="role" type="text" @click="teacher" :class="role=='teacher'?'active':''">
          <span class="sign">教师登录</span>
        </el-button>
      </el-col>
    </el-row>

    <!-- 学生登录 -->
    <template v-if="role=='stu'?true:false">
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">学号:</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="stuaccount" placeholder="请输入学号"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">密码:</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="stupassword" placeholder="请输入密码" type="password"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">验证码:</span>
        </el-col>
        <el-col :span="14" class="code">
          <el-input v-model="code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="6">
          <span>验证码</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="8">
          <el-button round @click="stulogin" :disabled="isDisabled">登录</el-button>
        </el-col>
        <el-col :span="6">
          <el-button round @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </template>

    <!-- 教师登录 -->
    <template v-if="role=='teacher'?true:false">
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">账号:</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="teacheraccount" placeholder="请输入账号"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">密码:</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="teacherpassword" placeholder="请输入密码" type="password"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">验证码:</span>
        </el-col>
        <el-col :span="14" class="code">
          <el-input v-model="code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="6">
          <span>验证码</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="8">
          <el-button round @click="teacherlogin">登录</el-button>
        </el-col>
        <el-col :span="6">
          <el-button round @click="reset">重置</el-button>
        </el-col>
        <el-col :span="4">
          <router-link to="/stuhome" class="link">
            <i class="fa fa-long-arrow-right" aria-hidden="true">注册</i>
          </router-link>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import { student, teacher } from "@/api/api";
export default {
  data() {
    return {
      role: "stu",
      stuaccount: "",
      stupassword: "",
      teacheraccount: "",
      teacherpassword: "",
      code: "",
      //防止用户多次点击
      isDisabled: false
    };
  },
  methods: {
    reset() {
      this.stuaccount = "";
      this.stupassword = "";
      this.teacheraccount = "";
      this.teacherpassword = "";
    },
    //切换为学生身份
    stu() {
      this.role = "stu";
      this.teacheraccount = "";
      this.teacherpassword = "";
    },
    //切换为老师身份
    teacher() {
      this.role = "teacher";
      this.stuaccount = "";
      this.stupassword = "";
    },
    // 学生登录
    stulogin() {
      // this.isDisabled = true;
      this.stuaccount = parseInt(this.stuaccount);
      // console.log(this.stuaccount);
      // console.log(this.stupassword);
      var param = {
        stuaccount: this.stuaccount,
        stupassword: this.stupassword
      };
      student.stulogin(param).then(res => {
        if (res.data.code == 204) {
          this.$message({
            message: "你的账号或密码错误，请重新输入",
            type: "error"
          });
        } else {
          if (res.data.code == 202) {
            this.$message({
              message: "你的账号为封禁状态，请联系管理员",
              type: "warning"
            });
          } else {
            sessionStorage.setItem("role", "stu");
            sessionStorage.setItem("user", JSON.stringify(res.data.stu));
            this.$router.push({ path: "/stuhome/stuinfo" });
          }
        }
      });
      // this.isDisabled = false;
    },
    //教师登录
    teacherlogin() {
      var param = {
        teacheraccount: this.teacheraccount,
        teacherpassword: this.teacherpassword
      };
      console.log(param);
      teacher.teacherlogin(param).then(res => {
        if (res.data.code == 204) {
          this.$message({
            message: "你的账号或密码错误，请重新输入",
            type: "error"
          });
        } else {
          if (res.data.code == 202) {
            this.$message({
              message: "你的账号为封禁状态，请联系管理员",
              type: "warning"
            });
          } else {
            sessionStorage.setItem("role", "teacher");
            sessionStorage.setItem("user", JSON.stringify(res.data.teacher));
            this.$router.push({ path: "/teacherhome/teacherinfo" });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  font-weight: bold;
}
.login {
  width: 27%;
  background-color: #fff;
  opacity: 0.95;
  .sign {
    font-family: "YouYuan";
    font-size: 18px;
    line-height: 20px;
  }
  .code {
    padding-left: 16px;
  }
  .entry {
    margin: 20px 0;
    .accountandpwd {
      font-size: 20px;
      line-height: 40px;
      padding-left: 15px;
      font-family: "STZhongsong";
    }
  }
  .role {
    color: #000;
    padding-top: 0;
    padding-bottom: 0;
  }
}
.el-col {
  padding: 10px 2px 0;
}
.el-input {
  width: 80%;
}
.link {
  float: right;
  font-size: 15px;
  line-height: 40px;
  color: rgb(71, 157, 207);
}
</style>
