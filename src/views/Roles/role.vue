<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="roleName"
        label="角色名"
        width="180">
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: []
        }
      },
      methods:{
        getRole(){
            let url = 'api/Role/GetList'
            this.$http.get(url).then(res=>{
                this.tableData = res.data
            })
        }
      },
      created(){
        this.getRole()
      }
    }
  </script>