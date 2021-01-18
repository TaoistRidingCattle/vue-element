<template>
  <div>
    <el-form :model="form" label-width="80px" ref="form" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容"  prop="content">
        <el-tiptap v-model="form.content" :extensions="extensions" />
      </el-form-item>
      <el-form-item label="时间"  prop="date">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  TrailingNode,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview,
  Print,
  Fullscreen,
  SelectAll,
  FontType,
  FontSize,
  CodeView,
} from "element-tiptap";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        date:''
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        date: [{ type: "date",required: true, message: "请输入日期", trigger: "blur" }]
      },
      extensions: [
        new Doc(),
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Link(),
        new Image(),
        new Iframe(),
        new CodeBlock(),
        new Blockquote(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new TextAlign(),
        new Indent(),
        new LineHeight(),
        new HorizontalRule(),
        new HardBreak(),
        new TrailingNode(),
        new History(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new FormatClear(),
        new TextColor(),
        new TextHighlight(),
        new Preview(),
        new Print(),
        new Fullscreen(),
        new SelectAll(),
        new FontType(),
        new FontSize(),
        new CodeView(),
      ],
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post("/editArticle", {
              id: this.$route.params.id,
              title: this.form.title,
              content: this.form.content,
              date:this.form.date
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.$router.back();
              }
            });
          this.form.title = "";
          this.form.content = "";
          this.form.date =''
        } else {
          return false;
        }
      });
    },
  },
  computed: {},
  created() {
    this.$http
      .post("/editArticle", {
        id: this.$route.params.id,
      })
      .then((res) => {
        this.form.title = res.data.editData[0].title;
        this.form.content = res.data.editData[0].content;
        this.form.date = res.data.editData[0].date;
      });
  },
};
</script>

<style lang="scss" scoped>
</style>