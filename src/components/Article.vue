<template>
  <div class="border shadow p-4">
    <el-table :data="list" style="width: 100%" border max-height="500">
      <el-table-column type="index" label="编号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="200" align="center">
        <template slot-scope="scope">
            {{ scope.row.date | dateFormate }}
          </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"  align="center">
      </el-table-column>
      <!-- <el-table-column prop="content" label="内容" class="mycontent">
      </el-table-column> -->
      <el-table-column label="操作" width="144" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pt-2"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      pagesize: 5,
      currentPage: 1,
      total: 0,
      list: [],

      form: {
        title: "",
        content: "",
      },

      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        date: [{ type: "date",required: true, message: "请输入日期", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleDelete(index, row) {
      this.$http
        .delete(`/deleteList`, { params: { id: row.id } })
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList(this.pagesize, this.currentPage);
          return;
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
      this.getList(this.pagesize, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.getList(this.pagesize, this.currentPage);
    },
    handleEdit(index, row) {
      console.log(row.id);
     this.$router.push({name:'editArticlePage',params:{id:row.id}})
    },

    Delete(index, item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(index, item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList(pagesize, currentPage) {
      this.$http
        .get("/articlelist", {
          params: {
            pagesize: pagesize,
            currentPage: currentPage,
          },
        })
        .then((res) => {
          this.list = res.data.list;
          this.total = res.data.total;
        });
    }
  },
  created() {
    this.getList(this.pagesize, this.currentPage);
  },
  filters: {
    dateFormate: function (value) {
      let time = new Date(value);
      let str =
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table__header .has-gutter > tr:first-of-type > th:nth-of-type(2) {
  text-align: center !important;
}
</style>