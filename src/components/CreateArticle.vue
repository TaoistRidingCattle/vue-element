<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$store.commit("add", {
            id: this.num,
            title: this.form.title,
            content: this.form.content,
          });
          this.form.title = "";
          this.form.content = "";
        } else {
          return false;
        }
      });
    },
    
  },
  computed: {
    num() {
      return this.$store.state.articleList.length + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>