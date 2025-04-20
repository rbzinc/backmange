<script setup>
import {User, Lock, Message} from "@element-plus/icons-vue";
import {onMounted, ref} from 'vue'
import { userLoginService,userGetCodeService,userLoginCodeService} from "@/api/modules/user.js";
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user.js'
const useUser =useUserStore()
import { ElMessage } from "element-plus"

const router = useRouter() // 获取路由对象
const countdown = ref(30) // 倒计时设置为30秒
const disabled = ref(false) // 按钮禁用状态
const ButtonText = ref('发送验证码') // 按钮文本
let imgSrc = ref('')
const loginFrom = ref({
  username: '',
  password: '',
  email: '',
  code:'',
  codeKey:''
})
let loginForms = ref();
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min: 8, max: 30, message: '邮箱不能为空', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      min: 2,
      max: 10,
      message: '验证码不能为空',
      trigger: 'blur',
    },
  ],
}

const login = async () => {
  try {
    const { data } = await userLoginService(
        loginFrom.value.username,
        loginFrom.value.password,
        loginFrom.value.code,
        loginFrom.value.codeKey,
       )
    useUser.setUserInfo(data)
    useUser.username = loginFrom.value.username
    ElMessage.success('登录成功')
    router.push('/home')
  } catch (error) {
    console.error(error) // 打印错误信息以方便调试
    ElMessage.error('用户名或密码错误')
  }
}

const resetPassword = async() => {
   const res = await userLoginCodeService()
   imgSrc.value = res.data.code
  loginFrom.value.codeKey = res.data.codeKey
   console.log(res.data)
}

onMounted(() => {
  resetPassword();
})

</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="6" :xs="0"></el-col>
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
          <el-form-item style="display: flex">
            <el-input
                :prefix-icon="Lock"
                v-model="loginFrom.code"
                type="password"
                show-password
                placeholder="请输入右侧图片里面的数字"
                style="width: 450px"
            ></el-input>
            <el-image style="width: 100px;margin-left: 10px" :src="imgSrc" :fit="scale-down" />
          </el-form-item>
          <el-form-item>
            <el-button
                :loading="loading"
                class="login_btn"
                type="primary"
                size="default"
                @click = "login"
            >登录</el-button>
          </el-form-item>
          <el-form-item >
            <router-link to="/register">注册</router-link>
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
  background-image: url('@/assets/images/微信图片_20250420142019.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
    margin-bottom: 20px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
