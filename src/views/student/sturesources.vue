<template>
  <div style="background-color: #fff;">
    <el-row>
      <!-- 搜索栏 -->
      <el-col :span="24" class="search">
        <el-col :span="11">
          <el-select v-model="categoryid" placeholder="请选择" @change="chagecategoryid">
            <el-option
              v-for="item in categorylist"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">&nbsp;</el-col>
        <el-col :span="4" class="searchinput">
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
            <el-table-column prop="resId" label="资源ID" width="100px;"></el-table-column>
            <el-table-column prop="resName" label="资源名称"></el-table-column>
            <el-table-column prop="category.categoryName" label="资源类别"></el-table-column>
            <el-table-column prop="resDownnum" label="下载数量" width="100px;"></el-table-column>
            <el-table-column prop="resLastuploader" label="上传者"></el-table-column>
            <el-table-column prop="resLastmodification" label="最后修改时间"></el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button @click="downresources(scope.row)" type="primary" size="small">下载</el-button>
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
import { category, resources } from "../../api/api.js";
export default {
  data() {
    return {
      resourcename: "",
      resorceslist: [],
      categorylist: [],
      categoryname: "",
      categoryid: "",
      loading: false,
      CurrentpageNum: 1,
      total: 20,
      showaddcategory: false,
      showeditcategory: false,
      showuploadinfo: false,

    };
  },
  mounted() {
    this.getallcategory();
    this.getresources();
  },
  methods: {
    getresourcesbyname() {
      this.getresources();
      this.categoryid = "";
      this.resourcename = "";
    },
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      this.getresources();
    },
    // 文件下载
    downresources(row) {
      var params = {
        resid: row.resId
      };
      resources.downresources(params).then(res => {
        // console.log(res)       
        var blob = new Blob([res.data]);
        var downloadElement = document.createElement("a");
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = row.resName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
        this.getresources();
      });
      
    },
    chagecategoryid() {
      this.getresources();
    },
    getallcategory() {
      category.getallcategory().then(res => {
        if (res.data.code == 200) {
          this.categorylist = res.data.categories;
        } else {
          this.$message({
            type: "error",
            message: "加载出错啦，找特仑苏去"
          });
        }
      });
    },
    getresources() {
      var params = {
        CurrentpageNum: this.CurrentpageNum
      };
      if (this.resourcename != null && this.resourcename.length > 0) {
        params.resourcename = this.resourcename;
      }
      if (this.categoryid != null && this.categoryid > 0) {
        params.categoryid = this.categoryid;
      }
      resources.getresources(params).then(res => {
        if (res.data.code == 204) {
          this.$message({
            type: "info",
            message: "查询不到相关资源"
          });
        } else {
          this.resorceslist = res.data.resources;
          this.total = res.data.count;
        }
      });
    },
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