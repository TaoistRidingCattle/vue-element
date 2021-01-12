<template>
  <el-container class="body">
    <el-main class="main shadow ">
     <div class="text-center font-22 font-weight-bold text-muted" >
        <router-link
          to="/login"
          class="head"
          >登录</router-link
        >
        <span class="mx-2 " style="color:#999;">·</span>
        <router-link  to="/register" class="head router-link-active"
          >注册</router-link
        >
      </div>
      <el-form
        ref="registerForm"
        :model="registerForm"
        label-width="0"
        class="mt-4"
        :rules="rules"
      >
        <el-form-item prop="name">
          <el-input
            v-model="registerForm.name"
            placeholder="请输入用户名"
            prefix-icon = "el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            type="password"
            prefix-icon = "el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input
            v-model="registerForm.passwordAgain"
            placeholder="请确认密码"
            type="password"
            prefix-icon = "el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        
        <el-form-item class="text-center">
          <el-button
            type="success"
            @click="onSubmit('registerForm')"
            style="width: 100%"
            class="d-block"
            >立即注册</el-button
          >
        </el-form-item>
        <el-form-item label-width="0px" class="text-left">
          <el-checkbox v-model="checked" style="color:#bbb;"
            >我已同意用户协议和隐私政策</el-checkbox
          >
        </el-form-item>
        <!-- <el-form-item label="已有账号？" label-width="100px" class="text-left">
          <router-link to="./login">立即登录</router-link>
        </el-form-item> -->
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import request from "@/api/request.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.passwordAgain !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateName = async (rule, value, callback) => {
      let status = await request.get("/register?name=" + value);
      console.log(status.data.code);
      if (status.data.code === 200) {
        callback();
      } else {
        callback(status.data.msg);
      }
    };
    return {
      checked: false,
      registerForm: {
        name: "",
        password: "",
        passwordAgain: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
          { validator: validateName, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        passwordAgain: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.checked) {
            request
              .post("/register", {
                ...this.loginForm
              })
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message: res.data.msg,
                    type: "success",
                  });
                  setTimeout(()=>{
                    this.$router.push('/login')
                  },2000)
                }
              });
          } else {
            this.$message.error("您还没有同意协议");
          }
        } else {
          return false;
        }
      });
    },
  }
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
  
  .head {
    text-align: center;
    letter-spacing: 4px;
    user-select: none;
    cursor: pointer;
    color:#999;
  }
  a.router-link-active{
      color:red;
    }
}
</style>