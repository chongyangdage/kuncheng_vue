<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisiblePay" custom-class="diaWidth" >
      <el-table :data="  payList.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )  " >
        <el-table-column align="center" type="index" width="50">
        </el-table-column>
        <el-table-column align="center" label="姓名" prop="userName">
        </el-table-column>
        <el-table-column align="center" :formatter="formatterTime"  label="查询时间" prop="years">
        </el-table-column>

        <el-table-column align="center"  label="每日工资" prop="dayPrice">
        </el-table-column>

        <el-table-column align="center"  label="已工作天数" prop="day">
        </el-table-column>
        <el-table-column align="center"  label="应付/元" prop="accountsPayable">
        </el-table-column>

        <el-table-column align="center"  label="实付/元" prop="actualPayment">
        </el-table-column>
        <el-table-column align="center"  label="更新时间" prop="updateTime">
        </el-table-column>
        <el-table-column align="right">

          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>

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
import { getUser, deleUser, editUser, addUser, selectPay, addPay } from "@/api/user";
export default {
  data() {
    return {
      payList: [],
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      addFormUser: {},
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        work: [
          {
            required: true,
            message: "请选择工种",
            trigger: "change",
          },
        ],
      },
      ruleForm: {},
      form: { userName: "", size: 10, current: 1 },
      total: 0,
      dialogVisiblePay: false,
      tableData: [],
      search: "",
      title: "查看员工工资",
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    formatterTime(row,column){
	let data = row[column.property]
	return  /\d{4}-\d{1,2}/g.exec(data )
},

    //查询工资
    selectPay() {
      selectPay({ userId: this.userInfo.id }).then(res => {
        this.payList = res.data
        this.dialogVisiblePay = true
      })
    },
    //添加人员
    addUser() {
      this.title = "添加人员";
      this.ruleForm = { id: uuid.v1() };
      this.dialogVisible = true;
    },

    submitAddUser() {
      addUser(this.ruleForm).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });

          this.getUserList();
          this.dialogVisible = false;
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
    //修改人员
    editUser() {
      editUser(this.ruleForm).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.dialogVisible = false;
          this.getUserList();
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    //提交修改
    editSubmit(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          if (this.title == "修改人员") {
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
    handleEdit(index, row) {
      this.title = "修改人员";
      this.ruleForm = row;
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleUser(row).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getUserList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(index, row);
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