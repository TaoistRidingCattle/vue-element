<template>
  <div class="border shadow p-4">
    <el-table :data="list" style="width: 100%" border max-height="500" >
      <el-table-column prop="id" label="编号" width="180" align="center"> </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center"> </el-table-column>
      <el-table-column prop="content" label="内容" class="mycontent"> </el-table-column>
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
    };
  },
  methods: {
    ...mapMutations(["handleDelete"]),
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    
    Delete(index,item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete({
            index,item
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {},
  computed: {
    ...mapState(["articleList"]),
    total() {
      return this.$store.state.articleList.length;
    },
    list() {
      console.log();
      console.log();
      return this.$store.state.articleList.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table__header .has-gutter>tr:first-of-type>th:nth-of-type(2){
  text-align: center!important;
}
</style>