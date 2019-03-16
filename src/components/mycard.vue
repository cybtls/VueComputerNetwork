<template>
  <div>
    <el-col :span="24">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="16" v-on:mouseenter="add(e)">
        <el-card class="box-card" >
          <div v-for="o in 4" :key="o" class="text item">{{'内容' + o }}</div>
        </el-card>
      </el-col>
      <el-col :span="4"></el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    add(e) {
      console.log(e);
    }
  }
};
</script>



<style  lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.box-card {
  width: 480px;
}
</style>