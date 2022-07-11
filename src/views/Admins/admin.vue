<template>
    <div>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="adminId"
        label="管理员id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="isLock"
        label="是否锁定"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [],
          editdialogVisible:false,
          eid:0,
          dialogVisible:false,
          roleId:0
        }
      },
      methods:{
        handleEdit(index, row) {
          
        },
        handleDelete(index, row) {
          
        },
        getAdmin(){
            let url = 'api/Admin/Page'
            this.$http.get(url).then(res=>{
                this.tableData = res.data
            })
        }
      },
      created(){
        this.getAdmin()
      }
    }
  </script>