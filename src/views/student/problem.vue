<template>
  <div>
    <el-row style="background-color: #fff;">
      <el-col :span="24" class="question">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="3">
          <el-button type="text" round class="putquestion" @click="showquestioninfo">咨询老师</el-button>
        </el-col>
      </el-col>
      <el-col :span="24" class="main">
        <el-col :span="5">&nbsp;</el-col>
        <el-col :span="14">
          <el-table :data="tableData5" style="width: 100%" height="700px">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="问题详情">
                    <span>
                      <el-input
                        type="textarea"
                        v-model="props.row.desc"
                        rows="4"
                        resize="none"
                        class="el-input"
                      ></el-input>
                    </span>
                  </el-form-item>
                  <el-form-item label="回答">
                    <span>
                      <el-input
                        type="textarea"
                        v-model="props.row.shop"
                        rows="4"
                        resize="none"
                        class="el-input"
                      ></el-input>
                    </span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="提问时间" prop="id"></el-table-column>
            <el-table-column label="标题" prop="name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="info" @click="showdetails(scope.row)">详情</el-button>
                <el-button size="mini" type="danger" @click="delquestion(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5"></el-col>
      </el-col>
    </el-row>

    <el-dialog title="咨询老师" :visible.sync="questioninfo" width="30%">
      <el-form :model="questionform">
        <el-form-item label="我想问的老师">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="问题标题">
          <el-input type="text" v-model="questionform.title"></el-input>
        </el-form-item>
        <el-form-item label="问题详情">
          <el-input
            type="textarea"
            v-model="questionform.text"
            rows="6"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="questioninfo = false">取 消</el-button>
        <el-button type="primary" @click="questioninfo = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="问题详情" :visible.sync="details" width="30%">
      <el-form :model="detailsform">
        <el-form-item label="提问时间">
          <el-input type="text" v-model="detailsform.title"></el-input>
        </el-form-item>
        <el-form-item label="我咨询的老师">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="问题标题">
          <el-input type="text" v-model="detailsform.title"></el-input>
        </el-form-item>
        <el-form-item label="问题详情">
          <el-input
            type="textarea"
            v-model="detailsform.questiontext"
            rows="5"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="回答">
          <el-input
            type="textarea"
            v-model="detailsform.details"
            rows="5"
            resize="none"
            class="el-input"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="details = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questioninfo: false,
      details: false,
      questionform: {},
      detailsform: {},
      tableData5: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    delquestion(row) {
      console.log(row);
    },
    showdetails(row) {
      console.log(row);
      this.details = true;
    },
    showquestioninfo() {
      this.questioninfo = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.question {
  margin: 10px 0;
  .putquestion {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-weight: 300;
    font-size: 16px;
    color: #000000;
  }
}
.main {
  margin: 10px 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-dialog__body{
  padding: 10px 15px;
}
</style>
