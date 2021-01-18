<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="javascript:;">口碑管理</a></el-breadcrumb-item
        >
      </el-breadcrumb>
      <el-form
        :model="publicPraise"
        label-width="100px"
        class="demo-ruleForm mt-3"
      >
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="publicPraise.status">
            <el-radio label="全部"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="口碑来源">
          <el-select v-model="publicPraise.from">
            <el-option label="同事" value="同事" selected></el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="朋友" value="朋友"></el-option>
            <el-option label="亲人" value="亲人"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card mt-2">
      <h4>
        根据筛选结果查询<span>{{ total }}</span
        >条结果
      </h4>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="编号" type="index" width="50">
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="100">
        </el-table-column>
        <el-table-column label="电话" prop="tel"> </el-table-column>
        <el-table-column label="时间" prop="date">
          <template slot-scope="scope">
            {{ scope.row.date | dateFormate }}
          </template>
        </el-table-column>
        <el-table-column label="来源" prop="comeFrom"> </el-table-column>
        <el-table-column label="介绍人" prop="introducer"> </el-table-column>
        <el-table-column label="状态" prop="status"> </el-table-column>
        <el-table-column label="操作" width="144" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="value">
          <el-date-picker
            v-model="form.value"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="来源" prop="from">
          <el-select v-model="form.from">
            <el-option label="同事" value="同事"></el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="朋友" value="朋友"></el-option>
            <el-option label="亲人" value="亲人"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="介绍人" prop="introducer">
          <el-input v-model="form.introducer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditChange('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
      pageSize: 5,
      publicPraise: {
        status: "全部", //string
        from: "", //string
      },
      value1: "", //数组
      tableData: [],
      total: 0,
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        tel: "",
        value: "",
        from: "",
        status: "",
        introducer: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        value: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        comeFrom: [
          {
            type: "string",
            required: true,
            message: "请选择一个来源",
            trigger: "change",
          },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        introducer: [
          { required: true, message: "请填写推荐人", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getList() {
      if (this.value1) {
        let time = new Date(this.value1[0]);
        let time1 = new Date(this.value1[1]);
        this.value1[0] = parseInt(time.getTime());
        this.value1[1] = parseInt(time1.getTime());
      }
      console.log(this.value1);
      this.$http({
        method: "get",
        url: "/publicpraise",
        params: {
          time: this.value1,
          currentIndex: this.currentIndex,
          pageSize: this.pageSize,
          status: this.publicPraise.status,
          from: this.publicPraise.from,
        },
      }).then((res) => {
        let { list, total } = res.data;
        (this.tableData = list), (this.total = total);
      });
    },
    submitForm() {
      this.getList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentIndex = val;
      console.log(`当前页: ${val}`);
      this.getList();
    },
    handleDelete(index, row) {
      this.$http
        .delete(`/deleteKouBeiList`, { params: { id: row.id } })
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList(this.pagesize, this.currentPage);
          return;
        });
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.tel = row.tel;
      this.form.value = row.date;
      this.form.from = row.comeFrom;
      this.form.status = row.status;
      this.form.introducer = row.introducer;
    },
    EditChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.$http
            .put(`/changeKouBeiList`, {
              id: this.form.id,
              name: this.form.name,
              tel: this.form.tel,
              date: this.form.value,
              comeFrom: this.form.from,
              status: this.form.status,
              introducer: this.form.introducer,
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                this.getList(this.pagesize, this.currentPage);
                this.form.id = "";
                this.form.name = "";
                this.form.tel = "";
                this.form.value = "";
                this.form.from = "";
                this.form.status = "";
                this.form.introducer = "";
              }
            });
        } else {
          return false;
        }
      });
    },
  },
  filters: {
    dateFormate: function (value) {
      let time = new Date(value);
      let str =
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
      return str;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
</style>