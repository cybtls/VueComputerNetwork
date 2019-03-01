<template>
  <div>
    <el-row>
      <!-- 搜索栏 -->
      <el-col :span="24" class="search">
        <el-col :span="16">&nbsp;</el-col>
        <el-col :span="4" class="searchinput">
          <el-input v-model="coursename" placeholder="请输入要查询的课程" prefix-icon="el-icon-search" @keyup.enter.native="getmyscorebyname"></el-input>
          <el-button class="searchbutton" icon="el-icon-search" circle @click="getmyscorebyname" ></el-button>
        </el-col>
      </el-col>

      <!-- 主体 -->
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table 
            :data="myscore" 
            border 
            style="width:100%" 
            v-loading="loading" 
            stripe>
              <el-table-column prop="course.courseName" label="课程"></el-table-column>
              <el-table-column prop="student.stuClass.className" label="班级"></el-table-column>
              <el-table-column prop="student.stuName" label="姓名"></el-table-column>
              <el-table-column prop="courseScore" label="成绩"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>

      <!-- 分页 -->
      <el-col :span="24">
        <el-col :span="20">
          <el-pagination
            :page-size="13"
            :pager-count="5"
            layout="prev, pager, next"
            :total="total"
            @current-change="getCurrentChange"
            style="float:right;"
          ></el-pagination>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { student } from "../../api/api.js";
export default {
  data() {
    return {
      loading:true,
      coursename: "",
      total: 0,
      CurrentpageNum: 1,
      myscore: [],
    };
  },
  mounted() {
    //初始化
    this.getmyscore();
  },
  methods: {
    //获取所有
    getmyscore() {
      this.loading = true;
      var params = {
        CurrentpageNum: this.CurrentpageNum,
        User: sessionStorage.getItem("user")
      };
      student.getmyscore(params).then(res => {
        // console.log(res);
        this.myscore = res.data.myscore;
        this.total = res.data.count;
        this.loading = false;
      });
      this.loading = false;
    },
    //按课程名获取
    getmyscorebyname(){
        this.loading = true;
        var params = {
        CurrentpageNum: this.CurrentpageNum,
        User: sessionStorage.getItem("user"),
        coursename:this.coursename
      };
      student.getmyscorebyname(params).then(res=>{
        // console.log(res);
        this.myscore = res.data.myscore;
        this.total = res.data.count;
        this.loading = false;
      })
    },
    //获取当前页码
    getCurrentChange(val) {
      this.CurrentpageNum = val;
      this.getmyscore();
    },
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  background-color: #fff;
  margin: 10px;
}
.search {
  margin-bottom: 10px;
  .searchinput {
    display: flex;
    flex-direction: row;
  }
  .searchbutton{
    margin-left: 10px;
  }
}
.suc{
  background-color: lightgreen;
}
.fal{
  background-color: brown;
}
</style>
