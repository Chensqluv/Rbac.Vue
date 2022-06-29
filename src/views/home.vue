<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" :router="true">
        <!--
        <el-submenu index="1">
          <el-menu-item-group>
          <el-menu-item index="/menu">菜单显示</el-menu-item>
          <el-menu-item index="/addmenu">添加菜单</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
         -->
        <el-submenu index="1" v-for="i in MenuFil" :key="i.menuId">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span>{{ i.menuName }}</span>
          </template>


          
          <el-menu-item-group>
            <el-menu-item
              v-for="item in Menu.filter((a) => a.parentId == i.menuId)"
              :key="item.menuId"
            >
              <el-menu-item :index="it.linkUrl"
                v-for="it in Menu.filter(
                  (m) => m.parentId == item.menuId
                )"
                :key="it.menuId"
              >
                <span>{{ it.menuName }}</span>
              </el-menu-item>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
       
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px"> </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      Menu: [],
    };
  },
  methods: {
    getMenu() {
      let url = "api/Menu/ShowMenus";
      this.$http.get(url).then((res) => {
        this.Menu = res.data;
      });
    },
  },
  created() {
    this.getMenu();
  },
  computed: {
    MenuFil() {
      return this.Menu.filter((s) => s.parentId == 0);
    },
  },
};
</script>