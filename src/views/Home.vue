<template>
  <el-container>
    <el-header class="header">
      后台管理页面
      <div class="d-flex align-item-center">
        <span class="mr-2">您好！ {{ master }}</span>
        <el-button size="mini" @click="exit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2b4b6b"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">用户管理</template>
              <el-menu-item index="1-1-1">选项1</el-menu-item>
              <el-menu-item index="1-1-2">选项2</el-menu-item>
              <el-menu-item index="1-1-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      master: "",
      value: true,
    };
  },
  created() {
    this.master = JSON.parse(window.sessionStorage.getItem("token")).name;
  },
  methods: {
    exit() {
      this.$confirm("此操作将退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          setTimeout(() => {
            window.sessionStorage.removeItem("token");
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background-color: #2b4b6b;
  color: #eee;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.aside {
  height: 100vh;
  background-color: #2b4b6b;
}
</style>