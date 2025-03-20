<script setup>
import {User,Lock} from "@element-plus/icons-vue";
import {ref} from 'vue'
const loginFrom = ref({
  username: '',
  password: ''
})
let loginForms = ref();
const rules = {
  username: [
    { required: true, message: '请输入用户名或者邮箱', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
            :model="loginFrom"
            :rules="rules"
            ref="loginForms"
            class="login_form">
          <h1>登录</h1>
          <el-form-item>
            <el-input
                :prefix-icon="User"
                v-model="loginFrom.username"
                placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
                :prefix-icon="Lock"
                v-model="loginFrom.password"
                type="password"
                show-password
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                :loading="loading"
                class="login_btn"
                type="primary"
                size="default"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background-size: cover;
    padding: 40px;
  }
  h1 {
    color: black;
    font-size: 40px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
