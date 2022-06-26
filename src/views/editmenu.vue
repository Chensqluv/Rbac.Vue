<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-cascader
      v-model="form.parentId"
      :options="options"
      :props="{ checkStrictly: true }"
      clearable
      placeholder="父菜单等级"
      ref="getParentId"
    ></el-cascader>
    <el-form-item label="菜单名称">
      <el-input v-model="form.menuName"></el-input>
    </el-form-item>
    <el-form-item label="链接名称">
      <el-input v-model="form.linkUrl"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props:["formdate"],
  data() {
    return {
      form: {
        menuId:'',
        menuName: "",
        linkUrl: "",
        parentId: "",
      },
      options: [],
    };
  },
  methods: {
    getMenu(){
        this.form.menuId=this.formdate.menuId;
        this.form.menuName=this.formdate.menuName;
        this.form.linkUrl=this.formdate.linkUrl;
        this.form.parentId=this.formdate.menuId;
    },
    getList() {
      this.$http.get("api/Menu/GetList").then((res) => {
        var reg = new RegExp('\\,"children":\\[]', "g");
        this.options = JSON.parse(JSON.stringify(res.data).replace(reg, ""));
      });
    },
    onSubmit() {
      this.form.parentId=this.$refs["getParentId"].checkedValue[this.$refs["getParentId"].checkedValue.length-1];
     this.form
     debugger
      this.$http.post("api/Menu/UpdateMenu", this.form).then((res) => {
        if (res.data > 0) {
          this.$message.success("修改成功");
          this.$emit("editreloadtable",true)
        }
      });
    },
    
  },
  watch:{
    formdate(){
      this.getList()
      this.getMenu()
    }
  },
  created() {
    this.getList();
    this.getMenu();
  },
};
</script>