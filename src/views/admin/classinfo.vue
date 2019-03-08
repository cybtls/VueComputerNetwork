<template>
  <div style="background-color: #fff;">
    <el-row>
      <el-col :span="24" class="search">
        <el-col :span="10">&nbsp;</el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="6" class="searchinput">
          <el-input
            v-model="classname"
            placeholder="请输入要查询的班级"
            prefix-icon="el-icon-search"
            @keyup.enter.native="getclasslist"
            @blur="getclasslist"
          ></el-input>
          <el-button class="searchbutton" icon="el-icon-search" circle @click="getclasslist"></el-button>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            round
            @click="showaddclassform"
          >新增班级</el-button>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="16">
          <el-table :data="classinfo" border style="width:100%" stripe :sortable="true">
            <el-table-column type="index" label="序号" width="100px"></el-table-column>
            <el-table-column prop="className" label="班级名称" width></el-table-column>
            <el-table-column prop="classId" label="班级号"></el-table-column>
            <el-table-column prop="studentnum" label="班级人数"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300px">
              <template slot-scope="scope">
                <el-button @click="editclass(scope.row)" type="primary" size="small">
                  修改班级名称
                  <i class="el-icon-edit el-icon--right"></i>
                </el-button>
                <el-button @click="delclass(scope.row)" type="danger" size="small">
                  删除
                  <i class="el-icon-delete el-icon--right"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5"></el-col>
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

    <!-- 修改班级名称 -->
    <el-dialog title="修改班级名称" :visible.sync="showclassname" width="20%">
      <el-input v-model="newclassinfo.classname" :placeholder="oldclassname"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showclassname = false">取 消</el-button>
        <el-button type="primary" @click="updateclassname">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加班级 -->
    <el-dialog title="添加班级" :visible.sync="showaddclass" width="15%">
      <el-input v-model="addclassname" placeholder="请输入新的班级名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showaddclass = false">取 消</el-button>
        <el-button type="primary" @click="addclass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { admin } from "../../api/api.js";
export default {
  data() {
    return {
      showclassname: false,
      showaddclass: false,
      newclassinfo: {},
      oldclassname: "",
      classname: "",
      classinfo: [],
      total: 1,
      user: {},
      CurrentpageNum: 1,
      addclassname: ""
    };
  },
  mounted() {
    this.getclasslist();
  },
  methods: {
    //获取当前页码
    getCurrentChange(value) {
      this.CurrentpageNum = value;
      var params = {
        CurrentpageNum: this.CurrentpageNum
      };
      admin.getclasslist(params).then(res => {
        this.classinfo = res.data.classinfo;
        this.total = res.data.count;
      });
    },
    //打开编辑页面
    editclass(row) {
      this.oldclassname = row.className;
      this.newclassinfo = {
        classid: row.classId
      };
      this.showclassname = true;
    },
    //删除班级
    delclass(row) {
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            classid: row.classId
          };
          admin.delclass(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getclasslist();
            } else if (res.data.code == 201) {
              this.$message({
                type: "warning",
                message: "请确保该班级下无学生"
              });
            } else {
              this.$message({
                type: "error",
                message: "删除错误，请联系程序员"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加班级
    addclass() {
      var addname = this.addclassname;
      if (addname == null || addname.length <= 0 || addname > 12) {
        this.$message({
          type: "warning",
          message: "请正确输入班级名称"
        });
      } else {
        this.$confirm("是否添加新的班级?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            var params = {
              classname: addname
            };
            admin.addclass(params).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.getclasslist();
                this.addclassname = '';
                this.showaddclass = false;
              } else if (res.data.code == 201) {
                this.$message({
                  type: "warning",
                  message: "班级已经存在!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败，请联系程序员!"
                });
                this.showaddclass = false;
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消添加"
            });
          });
      }
    },
    // 更新班级名称
    updateclassname() {
      var name = this.newclassinfo.classname;
      if (name == null || name.length <= 0 || name.length > 12) {
        this.$message({
          type: "warning",
          message: "请正确输入班级名称"
        });
      } else {
        admin.updateclassname(this.newclassinfo).then(res => {
          if (res.data.code == 201) {
            this.$message({
              type: "warning",
              message: "班级名已经存在，请重新命名"
            });
          } else {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "更新成功"
              });
              this.newclassinfo.className = "";
              this.getclasslist();
            } else {
              this.$message({
                type: "error",
                message: "更新失败，请查看代码"
              });
            }
            this.showclassname = false;
          }
        });
      }
    },
    // 数据初始化
    getclasslist() {
      if (this.classname != null && this.classname.length > 0) {
        var params = {
          CurrentpageNum: this.CurrentpageNum,
          classname: this.classname
        };
      } else {
        var params = {
          CurrentpageNum: this.CurrentpageNum
        };
      }
      admin.getclasslist(params).then(res => {
        this.classinfo = res.data.classinfo;
        this.total = res.data.count;
      });
    },
    showaddclassform() {
      this.showaddclass = true;
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
