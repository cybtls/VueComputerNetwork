<template>
  <div>
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="16">&nbsp;</el-col>
        <el-col :span="4" class="searchinput">
          <el-input v-model="posttitleorauthor" placeholder="请输入需要查询的标题内容" @keyup.enter.native="getpost"></el-input>
          <el-button icon="el-icon-search" circle class="searchbutton" @click="getpost"></el-button>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="tableData3" border style="width: 100%">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="20">
          <el-pagination
            :current-page="CurrentpageNum"
            :page-size="10"
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
import { post } from "../../api/api.js";
export default {
  data() {
    return {
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      posttitleorauthor: "",
      CurrentpageNum: 1,
      total: 1
    };
  },
  mounted() {},
  methods: {
    getpost() {
      let params = {
        currentpagenum: this.CurrentpageNum
      };
      if (this.posttitleorauthor != null && this.posttitleorauthor.length != 0) {
        params.posttitleorauthor = this.posttitleorauthor;
      }
      console.log(params)
      post.getpost(params).then(res => {
        console.log(res);
      });
    },
    getCurrentChange(value) {
      this.CurrentpageNum = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
  .searchinput {
    display: flex;
    flex-direction: row;
  }
  .searchbutton {
    margin-left: 10px;
  }
}
.el-row {
  background-color: #fff;
  margin: 10px;
}
</style>
