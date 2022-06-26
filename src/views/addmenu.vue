<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-cascader
    :options="options"
    :props="{ checkStrictly: true }"
    clearable
    ref="tree"
    ></el-cascader>
  <el-form-item label="菜单名称">
    <el-input v-model="form.menuName"></el-input>
  </el-form-item>
  <el-form-item label="链接名称">
    <el-input v-model="form.linkUrl"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">添加</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          menuName: '',
          linkUrl: '',
          parentId: ''
        },
        options: []
      }
    },
    methods: {
      onSubmit() {
        this.form.parentId = this.$refs["tree"].getCheckedNodes()[0].value
        debugger
        this.$http.post("api/Menu/AddMenu",this.form).then(res=>{
            if(res.data>0){
                this.$message.success("添加成功")
                this.$emit("reloadtable",true)
                //this.$router.push('/menu')
            }
        })
      },
      getList(){
        this.$http.get("api/Menu/GetList").then(res=>{
            var reg = new RegExp('\\,"children":\\[]',"g")
            this.options = JSON.parse(JSON.stringify(res.data).replace(reg,""))
        })
      }
    },
    created(){
        this.getList()
    }
  }
</script>