<template>
  <div>
    <el-dialog v-if="dialogVisibleAdd" :title="title" :visible.sync="dialogVisibleAdd">
      <el-form :rules="rules" :model="ruleFormPay" ref="ruleFormPay" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="userName">
          <el-input disabled v-model="ruleFormPay.userName"></el-input>
        </el-form-item>
        <el-form-item label="查询时间" prop="years">
          <el-date-picker :picker-options="disabledDate" @change="yearsChange()" :formatter="formatterTime"
            v-model="ruleFormPay.years" type="month" placeholder="选择月">
          </el-date-picker>
          <!-- <el-input v-model="ruleFormPay.years"></el-input> -->
        </el-form-item>
        <el-form-item label="每日工资" prop="dayPrice">
          <el-input v-model="ruleFormPay.dayPrice"></el-input>
        </el-form-item>
        <el-form-item label="已工作天数" prop="day">
          <el-input v-model="ruleFormPay.day"></el-input>
        </el-form-item>
        <el-form-item label="应付/元" prop="accountsPayable">
          <el-input v-model="ruleFormPay.accountsPayable"></el-input>
        </el-form-item>
        <el-form-item label="实付/元" prop="actualPayment">
          <el-input v-model="ruleFormPay.actualPayment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit('ruleFormPay')">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="查看" :visible.sync="dialogVisiblePay" custom-class="diaWidth">
      <el-button type="primary" @click="addDate">添加</el-button>
      <el-table :data="payList.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )">
        <el-table-column align="center" type="index" width="50">
        </el-table-column>
        <el-table-column align="center" label="姓名" prop="userName">
        </el-table-column>
        <el-table-column align="center" :formatter="formatterTime" label="查询时间" prop="years">
        </el-table-column>

        <el-table-column align="center" label="每日工资" prop="dayPrice">
        </el-table-column>

        <el-table-column align="center" label="已工作天数" prop="day">
        </el-table-column>
        <el-table-column align="center" label="应付/元" prop="accountsPayable">
        </el-table-column>

        <el-table-column align="center" label="实付/元" prop="actualPayment">
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateTime">
        </el-table-column>
        <el-table-column align="right">

          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePay = false">取 消</el-button>

      </span>
    </el-dialog>
    <el-table :data="tableData.filter(
      (data) =>
        !search || data.name.toLowerCase().includes(search.toLowerCase())
    )
      " style="width: 100%">
      <el-table-column align="center" type="index" width="50">
      </el-table-column>
      <el-table-column align="center" width="140" label="姓名" prop="userName">
      </el-table-column>
      <el-table-column align="center" width="140" label="性别" prop="sex">
      </el-table-column>

      <el-table-column align="center" width="140" label="工种" prop="work">
      </el-table-column>

      <el-table-column align="center" width="160" label="手机号" prop="phone">
      </el-table-column>
      <el-table-column align="center" width="267" label="更新时间" prop="updateTime">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <div style="display: flex; width: 310px">
            <el-input style="" v-model="form.userName" size="mini" placeholder="姓名关键字搜索" />
            <el-button size="mini" @click="serchUser" type="primary">搜索</el-button>

            <!-- <el-button
              style="margin-left: 50px"
              size="mini"
              @click="addUser"
              type="success"
              >添加人员</el-button
            > -->
          </div>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="selectPay(scope.row)">查询工资</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-container" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="form.current" :page-size="form.size" layout="total,  prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import { getUser, deleUser, editUser, addUser, selectPay, addPay, editPay, delePay } from "@/api/user";
export default {
  data() {
    let that = this;
    return {
      disabledDate: {
        // 限制收货时间不让选择今天以前的
        disabledDate(time) {
          let a = false
          that.dateArrList.forEach(element => {

            if (that.convertToYYMMDD(time) == element.slice(0, -12)) {
              a = true
            }

          });
          return a;
        },
      },
      nowData: {},
      ruleFormPay: {},
      dialogVisibleAdd: false,
      payList: [],
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      addFormUser: {},
      rules: {

        years: [{ required: true, message: "请选择月份", trigger: "change" }],
        dayPrice: [
          {
            required: true,
            message: "请输入每日工资",
            trigger: "blur",
          },
        ],
        day: [
          {
            required: true,
            message: "请输入已工作天数",
            trigger: "blur",
          },
        ],

        accountsPayable: [
          {
            required: true,
            message: "请输入应付/元",
            trigger: "blur",
          },
        ],


        actualPayment: [
          {
            required: true,
            message: "请输入实付/元",
            trigger: "blur",
          },
        ],
      },
      ruleForm: {},
      form: { userName: "", size: 10, current: 1 },
      total: 0,
      dialogVisiblePay: false,
      tableData: [],
      search: "",
      title: "添加",
    };
  },
  created() {
    this.getUserList();
  },
  methods: {


    //标准时间转格式
    convertToYYMMDD(date) {
      var year = date.getFullYear().toString(); //获取年份并转为字符串类型
      var month = (date.getMonth() + 1).toString().padStart(2, '0'); //获取月份（注意要加上1）并补零到两位数
      return year + "-" + month; //返回最后两位年份+月份+天数组成的字符串
    },
    yearsChange(e) {
      this.ruleFormPay.years = this.convertToYYMMDD(this.ruleFormPay.years)
    },
    //添加月份
    addDate() {

      this.ruleFormPay = {}
      this.ruleFormPay.userName = this.nowData.userName
      this.ruleFormPay.userId = this.nowData.id
      this.dialogVisibleAdd = true;
    },
    //时间格式化
    formatterTime(row, column) {
      let data = row[column.property]
      return /\d{4}-\d{1,2}/g.exec(data)
    },

    //查询工资
    selectPay(row) {
      if (row) {
        this.nowData = row
      }
      selectPay({ userId: this.nowData.id }).then(res => {
        this.dateArrList = [];
        res.data.forEach(element => {

          this.dateArrList.push(element.years)
        });

        this.payList = res.data
        this.dialogVisiblePay = true
      })
    },
    //添加人员
    addUser() {
      this.title = "添加";
      this.ruleForm = { id: uuid.v1() };
      this.dialogVisible = true;
    },
    //添加月
    submitAddUser() {
      addPay(this.ruleFormPay).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });

          this.selectPay();
          this.dialogVisibleAdd = false;
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    //搜索姓名
    serchUser() {
      this.form.size = 10;
      this.form.current = 1;
      this.getUserList();
    },
    //修改月份
    editUser() {
      editPay(this.ruleFormPay).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.selectPay();
          this.dialogVisibleAdd = false;
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    //提交修改
    editSubmit(e) {
      this.$refs[e].validate((valid) => {

        if (valid) {
          if (this.title == "修改") {
            this.editUser();
          } else {
            this.submitAddUser();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //获取用户信息
    getUserList() {
      getUser(this.form).then((res) => {
        this.tableData = res.data;
        this.total = res.total;
      });
    },
    handleEdit(row) {
      this.title = '修改';
      this.ruleFormPay = row;
      this.dialogVisibleAdd = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将删除该月份工资, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delePay(row).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.selectPay();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.form.current = val;
      this.getUserList();
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped>
.pagination-container {
  position: fixed;
  bottom: 40px;
}
</style>