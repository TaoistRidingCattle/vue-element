<template>
  <el-container class="body">
    <el-main class="main shadow">
      <div class="text-center font-22 font-weight-bold text-muted">
        <router-link to="/login" class="head router-link-active"
          >登录</router-link
        >
        <span class="mx-2" style="color: #999">·</span>
        <router-link to="/register" class="head">注册</router-link>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="0"
        class="mt-4"
        :rules="loginRules"
      >
        <el-form-item prop="name">
          <el-input
            v-model="loginForm.name"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item class="text-center">
          <el-button
            type="primary"
            @click="onSubmit('loginForm')"
            style="width: 100%"
            class="d-block"
            >立即登录</el-button
          >
        </el-form-item>
        <el-form-item label="没有账号？" label-width="100px" class="text-left">
          <router-link to="./register">立即注册</router-link>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import request from "@/api/request.js";

export default {
  data() {
    return {
      active: false,
      loginForm: {
        name: "admin",
        password: "123123",
      },
      loginRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request
            .post("/login", {
              ...this.loginForm,
            })
            .then(async (res) => {
              if (res.data.code == 200) {
                window.localStorage.setItem("token", res.data.token);
                window.localStorage.setItem("name", this.loginForm.name);
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                setTimeout(() => {
                  this.$router.push("/home");
                }, 2000);
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
  },
  
};
</script>

<style lang="scss" scoped>
.body {
  background-color: #eee;
  width: 100vw;
  height: 100vh;
}
.main {
  width: 400px;
  min-height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  box-shadow: 0 0 6px 1px #263e57;
  .head {
    text-align: center;
    letter-spacing: 4px;
    user-select: none;
    cursor: pointer;
    color: #999;
  }
  a.router-link-active {
    color: red;
  }
}
</style>