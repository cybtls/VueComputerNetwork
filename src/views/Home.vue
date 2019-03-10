<template>
  <div>
      <el-upload
    ref="upload"
    class="upload-demo"
    action=""
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    name="file"
    :data="testdata"
    :on-exceed="handleExceed"
    :http-request="upload"
    :auto-upload="false"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
  <el-button @click="upload">上传</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      action: "",
      testdata: {
        filecategoryid: 111,
        filecategoryname: "喂喂喂"
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    upload(file){
      var formData = new FormData();
      console.log(file)
      formData.append("file", file.file);
      formData.append("filecategoryid",this.testdata.filecategoryid)
      formData.append("filecategoryname",this.testdata.filecategoryname)
      axios.post('http://localhost:8080/tt/rr',formData).then()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
