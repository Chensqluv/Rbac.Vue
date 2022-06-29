<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册用户</span>
        
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      let url = "api/Admin/Register";
      this.$http.post(url, this.ruleForm).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("注册成功");
          this.$router.push('/login')
        }
        if (res.data.code == 1) {
          this.$message.error("该用户已注册");
          return;
        }
      });
    },
  },
};
</script>

<style>
.el-card {
  margin: 0 auto;
  margin-top: 15em;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>