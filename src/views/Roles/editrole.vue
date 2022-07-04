<template>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="角色名称">
    <el-input v-model="form.roleName"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">修改</el-button>
  </el-form-item>
</el-form>
</template>


<script>
  export default {
    props:['eid'],
    data() {
      return {
        form: {
          roleName: '',
        }
      }
    },
    watch:{
        eid(val){
            this.backData()
        }
    },
    methods: {
      onSubmit() {
        let url = "api/Role/Update"
        this.$http.post(url,this.form).then(res=>{
            if (res.data > 0) {
                this.$message.success("修改成功");
                this.$emit("edittable",true)
              }
        })
        
      },
      backData(){
        let id = this.eid
        let url = 'api/Role/Find?id='+id
        this.$http.get(url).then(res=>{
            this.form = res.data
        })
      }
    },
    created(){
        this.backData()
    }
  }
</script>