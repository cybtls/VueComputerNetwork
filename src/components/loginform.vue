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
          <el-input v-model="stuaccount" placeholder="请输入学号（大于6位）"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">密码:</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="stupassword" placeholder="请输入密码（大于6位）" type="password"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">验证码:</span>
        </el-col>
        <el-col :span="14" class="code">
          <el-input v-model="identifyCode" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="4">
          <div @click="flush">
            <el-button class="realidentifyCode" type="text">{{realidentifyCode}}</el-button>
          </div>
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
          <el-input v-model="teacheraccount" placeholder="请输入账号（大于6位）"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">密码:</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="teacherpassword" placeholder="请输入密码（大于6位）" type="password"></el-input>
        </el-col>
      </el-row>
      <el-row class="entry">
        <el-col :span="4">
          <span class="accountandpwd">验证码:</span>
        </el-col>
        <el-col :span="14" class="code">
          <el-input v-model="identifyCode" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="4">
          <div @click="flush">
            <el-button class="realidentifyCode" type="text">{{realidentifyCode}}</el-button>
          </div>
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
      identifyCode: "",
      realidentifyCode: "",
      //防止用户多次点击
      isDisabled: false
    };
  },
  mounted() {
    this.generatedCode();
  },
  methods: {
    reset() {
      this.stuaccount = "";
      this.stupassword = "";
      this.teacheraccount = "";
      this.teacherpassword = "";
    },
    //刷新验证码
    flush() {
      this.generatedCode();
    },
    //设置基本码
    generatedCode() {
      const random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      let code = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 52);
        code += random[index];
      }
      this.realidentifyCode = code;
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
      //判断验证码是否通过
      if (this.checkidentifyCode()) {
        if (this.checkstu()) {
          this.stuaccount = parseInt(this.stuaccount);
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
                console.log(res.data.stu);
                this.$router.push({ path: "/stuhome/stuinfo" });
              }
            }
            // JSON.stringify(res.data.stu)
          });
        }
      }
      // this.isDisabled = false;
    },
    //教师登录
    teacherlogin() {
      if (this.checkidentifyCode()) {
        if (this.checkteacher()) {
          var param = {
            teacheraccount: this.teacheraccount,
            teacherpassword: this.teacherpassword
          };
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
                sessionStorage.setItem(
                  "user",
                  JSON.stringify(res.data.teacher)
                );
                this.$router.push({ path: "/teacherhome/teacherinfo" });
              }
            }
          });
        }
      }
    },
    //验证码检验
    checkidentifyCode() {
      if (this.identifyCode == null || this.identifyCode.length == 0) {
        this.$message({
          message: "验证码不能为空",
          type: "warning"
        });
        return false;
      } else {
        if (this.identifyCode != this.realidentifyCode) {
          this.$message({
            message: "验证码错误，请重新输入",
            type: "error"
          });
          this.generatedCode();
          return false;
        } else {
          return true;
        }
      }
    },
    checkstu() {
      if (this.stuaccount.length <= 6 || this.stupassword.length <= 6) {
        this.$message({
          message: "账号、密码不合规范",
          type: "warning"
        });
        this.reset();
        return false;
      } else {
        return true;
      }
    },
    checkteacher() {
      if (this.teacheraccount.length <= 6 || this.teacherpassword.length <= 6) {
        this.$message({
          message: "账号、密码不合规范,请重新输入",
          type: "warning"
        });
        this.reset();
        return false;
      } else {
        return true;
      }
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
.realidentifyCode {
  font-size: 16px;
  letter-spacing: 5px;
  font-style: italic;
  text-decoration: line-through;
  font-family: "STZhongsong";
}
</style>
