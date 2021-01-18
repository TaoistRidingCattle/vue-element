<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="javascript:;">发布口碑</a></el-breadcrumb-item
        >
      </el-breadcrumb>
      <div style="width: 400px" class="mt-3">
        <el-form
          :model="form"
          label-width="100px"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="来源" prop="comeFrom">
            <el-select v-model="form.comeFrom">
              <el-option label="同事" value="同事" selected></el-option>
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')"
              >立即创建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        tel: "",
        date: "",
        comeFrom: "",
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
            message: "请输入正确的手机号码", trigger: "blur"
          },
        ],
        date: [
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
        status: [
          { required: true, message: "请选择状态", trigger: "change" },
        ],
        introducer: [
          { required: true, message: "请填写推荐人", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/createKouBei",
            data: {
              ...this.form,
            },
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.form.name = "";
              this.form.tel = "";
              this.form.date = "";
              this.form.comeFrom = "";
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
};
</script>

<style lang="scss" scoped>
</style>