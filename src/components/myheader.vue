<template>
  <div>
    <el-col :span="24" class="header">
      <el-col :span="15">&nbsp;</el-col>
      <el-col :span="4">
          <router-link to="/login" class="login">学生、老师？前往登录</router-link>
          <hr>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.header{
    height: 30px;
    .login{
        font-size: 16px;
        line-height: 30px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
}
</style>
