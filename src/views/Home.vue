<template>
  <el-container>
    <el-header class="header">
      <el-menu
        class="el-menu-demo d-flex justify-content-between align-items-center bg-transparent head"
        mode="horizontal"
        menu-trigger="click"
        style="width: 100%"
      >
        <el-menu-item disabled style="cursor: default; opacity: 1">
          <h2 class="text-danger font-20 font-weight-bold">好代码</h2>
        </el-menu-item>
        <el-menu-item disabled style="cursor: default; opacity: 1">
          <h2 class="font-20 font-weight-bold" style="color: black">
            中博口碑管理系统
          </h2>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">{{ master }}</template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          :default-active="currentIndex"
          class="el-menu-vertical-demo"
          background-color="#2b4b6b"
          text-color="#fff"
          active-text-color="red"
          :router='true'
        >
          <el-menu-item index="/welcome">
            <i class="el-icon-menu iconfont icon-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="/articleList">
            <template slot="title">
              <i :class="articleCenter.icon"></i>
              <span>{{ articleCenter.menuName }}</span>
            </template>
            <el-menu-item
              :index="item1.path"
              v-for="item1 in articleCenter.subMenuList"
              :key="item1.id"
              >{{ item1.menuName }}</el-menu-item
            >
          </el-submenu>

          <el-menu-item
            :index="item.path"
            v-for="item in menuList"
            :key="item.id"
          >
            <i :class="item.icon"></i>
            <span>{{ item.menuName }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      master: "",
      value: true,
      currentIndex:'/welcome'
    };
  },
  created() {
    if(window.sessionStorage.getItem("token"))
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
  computed: {
    ...mapState(["menuList", "articleCenter"]),
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
  height: calc( 100vh - 60px );
  background-color: #2b4b6b;
}
.home::after {
  content: none;
}
.el-menu-item {
  width: 200px;
}
.head::after,
.head::before {
  content: none;
}
.el-submenu {
  width: 200px !important;
}
.logo:hover,
.title:hover {
  background: none;
}
</style>