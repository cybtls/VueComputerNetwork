<template>
  <div style="background-color: #fff;">
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="11">&nbsp;
          <el-select v-model="classId"  placeholder="请选择" @change="chageclassId">
            <el-option
              v-for="item in classlist"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          &nbsp;
        </el-col>
        <el-col :span="4" class="searchinput">
          <el-input
            v-model="searchname"
            placeholder="请输入要查询的班级"
            prefix-icon="el-icon-search"
            @keyup.enter.native="changesearchname"
          ></el-input>
          <el-button class="searchbutton" icon="el-icon-search" circle @click="changesearchname"></el-button>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="stuinfo" border style="width:100%" stripe>
            <el-table-column prop="stuClass.className" label="班级"></el-table-column>
            <el-table-column prop="stuAccount" label="学号"></el-table-column>
            <el-table-column prop="stuName" label="姓名"></el-table-column>
            <el-table-column prop="stuStatus" label="状态" width="150px">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.stuStatus"
                  active-color="#42d885"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="正常"
                  inactive-text="封禁"
                  disabled
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="chagestatusto1(scope.row)" type="primary" size="small">启用</el-button>
                <el-button @click="chagestatusto0(scope.row)" type="info" size="small">禁用</el-button>
                <el-button @click="delstudent(scope.row)" type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4"></el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="20">
          <el-pagination
            :current-page="CurrentpageNum"
            :page-size="10"
            :pager-count="7"
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
import { teacher } from "../../api/api.js";
export default {
  data() {
    return {
      searchname: "",
      stuinfo: [],
      total: 0,
      user: {},
      CurrentpageNum: 1,
      classlist: [],
      classId: ""
    };
  },
  mounted() {
    //数据初始化
    this.getmyclassinfo();
    this.getmyclassbyname();
  },
  methods: {
    // 获取自己管理班级信息
    getmyclassinfo() {
      var params = {
        user: sessionStorage.getItem("user")
      };
      teacher.getmyclassinfo(params).then(res => {
        if (res.data.code == 200) {
          this.classlist = res.data.myclassinfo;
        } else {
          alert("nothing");
        }
      });
    },
    //通过班级名来查询班级
    getmyclassbyname() {
      this.classId = "";
      var params = {
        classname: this.searchname,
        user: sessionStorage.getItem("user"),
        CurrentpageNum: this.CurrentpageNum
      };
      teacher.getmyclassbyname(params).then(res => {
        if (res.data.code == 200) {
          this.total = res.data.count;
          this.stuinfo = res.data.students;
        } else {
          this.$message({
            showClose: true,
            message: "查找不到相关班级",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    //通过班级id来查询班级
    getmyclassbyid() {
      var params = {
        CurrentpageNum: this.CurrentpageNum,
        classid: this.classId
      };
      teacher.getmyclassbyid(params).then(res => {
        if (res.data.code == 200) {
          this.total = res.data.count,
          this.stuinfo = res.data.students;
        } else {
          this.$message({
            showClose: true,
            message: "失败",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    //删除学生
    delstudent(row) {
      this.$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            stuid: row.stuId
          };
          teacher.delstudent(params).then(res => {
            if (res.data.code == 200) {
              this.getmyclassbyname();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请联系管理员!"
              });
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    //改变学生状态为1 即是正常状态
    chagestatusto1(row) {
      row.stuStatus = 1;
      var params = {
        stuid: row.stuId,
        status: row.stuStatus
      };
      teacher.chagestatus(params).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改失败，请联系管理员",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    //改变学生状态为0 即是封禁状态
    chagestatusto0(row) {
      row.stuStatus = 0;
      var params = {
        stuid: row.stuId,
        status: row.stuStatus
      };
      teacher.chagestatus(params).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改失败，请联系管理员",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    //获取当前页码
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      if (this.classId != null && this.classId != '') {
        this.getmyclassbyid();
      } else {
        this.getmyclassbyname();
      }
    },
    chageclassId(){
      console.log("选择框")
      this.getmyclassbyid();
    },
    changesearchname(){
      this.CurrentpageNum = 1;
      this.getmyclassbyname();
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
