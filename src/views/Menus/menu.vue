<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    <el-tree
      :data="tableData"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>

    <!--添加弹框-->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
      <add :key="new Date().getTime()" @reloadtable="reloadtable" />
    </el-dialog>

    <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="editdialogVisible" width="30%">
      <edit @editreloadtable="editreloadtable" :formdate="form" />
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="menuId" label="菜单ID" sortable width="180">
      </el-table-column>
      <el-table-column prop="menuName" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="linkUrl" label="菜单链接" sortable width="180">
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
import add from "@/views/Menus/addmenu.vue";
import edit from "@/views/Menus/editmenu.vue";
export default {
  components: {
    add,
    edit,
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "MenuName",
      },
      tableData: [],
      dialogVisible: false,
      editdialogVisible: false,
      form: {
        tableData: [],
        menuId: "",
        menuName: "",
        linkUrl: "",
      },
    };
  },
  methods: {
    reloadtable(val) {
      this.dialogVisible = !val;
      this.getMenu();
    },
    editreloadtable(val) {
      this.editdialogVisible = !val;
      this.getMenu();
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleEdit(index, row) {
      this.form.tableData = this.tableData;
      this.form = row;
      this.editdialogVisible = true;
    },
    handleDelete(index, row) {
      let url = "api/Menu/DeleteMenu?id=" + row.menuId;
      if(row.children.length>0){
        this.$message.error("该节点有子节点，不能直接删除");
        return
      }
      if (confirm("确定要删除么")) {
        this.$http.delete(url).then((res) => {
          if (res.data > 0) {
            this.$message.success("删除成功");
            this.getMenu();
          }
        });
      }
    },
    getMenu() {
      let url = "api/Menu/GetAll";
      this.$http.get(url).then((res) => {
        this.tableData = res.data;
      });
    },
    add() {
      this.$router.push("/addmenu");
    },
  },
  created() {
    this.getMenu();
  },
};
</script>