<template>
  <div style="background-color: #fff;">
    <el-row>
      <!-- 搜索栏 -->
      <el-col :span="24" class="search">
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="4" style="margin-left:40px;">
          <el-select v-model="categoryid" placeholder="请选择" @change="chagecategoryid">
            <el-option
              v-for="item in categorylist"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="4" class="searchinput" style="margin-left:30px;">
          <el-input
            v-model="resourcename"
            placeholder="请输入要查询的资源"
            prefix-icon="el-icon-search"
            @keyup.enter.native="getresourcesbyname"
          ></el-input>
          <el-button class="searchbutton" icon="el-icon-search" circle @click="getresourcesbyname"></el-button>
        </el-col>
      </el-col>

      <!-- 主体 -->
      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="resorceslist" border style="width:100%" v-loading="loading" stripe>
            <el-table-column prop="resId" label="资源ID"></el-table-column>
            <el-table-column prop="resName" label="资源名称"></el-table-column>
            <el-table-column prop="resCategoryid" label="资源类别"></el-table-column>
            <el-table-column prop="resDownnum" label="下载数量"></el-table-column>
            <el-table-column prop="resLastuploader" label="上传者"></el-table-column>
            <el-table-column prop="resLastmodification" label="最后修改时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="downfile(scope.row)" type="primary" size="small">下载</el-button>
                <el-button @click="delfile(scope.row)" type="error" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>

      <!-- 分页 -->
      <el-col :span="24">
        <el-col :span="20">
          <el-pagination
            :current-page="CurrentpageNum"
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
export default {
  data() {
    return {
      resourcename: "",
      resorceslist: [],
      categorylist: [],
      categoryid: "",
      loading: false,
      CurrentpageNum: 1,
      total: 20
    };
  },
  mounted() {},
  methods: {
    getresourcesbyname() {
      console.log(this.resourcename);
    },
    getCurrentChange(value) {
      this.CurrentpageNum = value;
    },
    downfile() {
      console.log("down");
    },
    uploadfile() {},
    delfile() {},
    chagecategoryid() {
      console.log(this.categoryid);
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