<template>
    <div>
      <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="editdialogVisible" width="30%">
      <edit @edittable="edittable" :eid="eid"/>
    </el-dialog>

    <!--分配权限-->
    <el-dialog title="权限" :visible.sync="dialogVisible" width="30%">
      <tree ref="dialogTree" :roleId="roleId"/>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="SavePermission()">确 定</el-button>
      </span>
    </el-dialog>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="roleId"
        label="角色id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" @click="handlefp(scope.$index, scope.row)"
            >分配权限</el-button
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
    import edit from "@/views/Roles/editrole.vue";
    import tree from '../Menus/menutree.vue'
    export default {
      components:{
        edit,
        tree
    },
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
        edittable(val){
          this.editdialogVisible = !val
          this.getRole()
        },
        handleEdit(index, row) {
          this.editdialogVisible = true
          this.eid = row.roleId
        },
        handlefp(index, row){
          this.dialogVisible = true
          this.roleId = row.roleId
        },
        handleDelete(index, row) {
          let url = "api/Role/Delete?id=" + row.roleId;
          if (confirm("确定要删除么")) {
            this.$http.delete(url).then((res) => {
              if (res.data > 0) {
                this.$message.success("删除成功");
                this.getRole();
              }
            });
          }
        },
        getRole(){
            let url = 'api/Role/GetList'
            this.$http.get(url).then(res=>{
                this.tableData = res.data
            })
        },
        SavePermission(){
          var checkedId = this.$refs.dialogTree.$refs.menuTree.getCheckedNodes(true, true).map(m => m.value);
          var roleId = this.roleId;

          this.$http.post('api/Role/SavePermission', { menuId: checkedId, roleId: roleId }).then(m=>{})
          
          debugger
          console.log(this.$refs.dialogTree.getdata())
          this.dialogVisible = false;
        }
      },
      created(){
        this.getRole()
      }
    }
  </script>