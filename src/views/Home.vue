<template>
  <div>
    <!-- 置顶头部 -->
    <el-row>
      <myheader></myheader>
    </el-row>
    <!-- 轮播图  -->
    <el-row>
      <wheelplanting></wheelplanting>
    </el-row>
  </div>
</template>

<script>
import myheader from "../components/myheader.vue";
import wheelplanting from "../components/wheelplanting.vue";
export default {
  data() {
    return {};
  },
  components: {
    myheader,
    wheelplanting
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
