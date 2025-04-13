<script setup>
import {Lock, Message, User} from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { userGetCodeService, userRegisterService } from '@/api/modules/user'
import { useUserStore } from '@/store/modules/user.js'
const useUser =useUserStore()
import { ElMessage } from 'element-plus'

const router = useRouter() // 获取路由对象
const form = ref(null) // 表单引用
const countdown = ref(30) // 倒计时设置为30秒
const disabled = ref(false) // 按钮禁用状态
const ButtonText = ref('发送验证码') // 按钮文本

const formModel = ref({
  password: '',
  email: '',
  username: '',
  code: '',
})


const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
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


const startCountdown = () => {
  // 开始倒计时
  const countdownTimer = () => {
    // 倒计时函数
    if (countdown.value > 0) {
      ButtonText.value = `${countdown.value}秒后再次获取`
      countdown.value--
      disabled.value = true
      setTimeout(countdownTimer, 1000)
    } else {
      countdown.value = 30 // 重置倒计时为30秒
      disabled.value = false // 启用按钮
      ButtonText.value = '发送验证码' // 重置按钮文本
    }
  }
  countdownTimer()
}


const captch = async () => {
  await userGetCodeService(formModel.value.email)
  startCountdown()
  alert('验证码发送成功！')
}


const register = async () => {
  const res = await userRegisterService(
      formModel.value.username,
      formModel.value.password,
      formModel.value.email,
      formModel.value.code,
      )
  useUser.setUserInfo(res.data)
  ElMessage.success('登录成功')
  router.push('/')
}

</script>

<template>
  <div class="register_container">
    <el-row>
      <el-col :span="6" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form :model="formModel" :rules="rules" ref="form"  autocomplete="off" class="register_form">
          <h1>注册</h1>
            <el-form-item prop="username">
              <el-input
                  :prefix-icon="User"
                  v-model="formModel.username"
                  placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  :prefix-icon="Lock"
                  v-model="formModel.password"
                  type="password"
                  placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          <el-form-item prop="email" style="display: flex" class="item">
            <el-input v-model="formModel.email" :prefix-icon="Message" placeholder="请输入邮箱" style="width: 80%"></el-input>
            <el-button style="width: 20%" @click="captch" :disabled="disabled">{{ ButtonText }} </el-button>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="formModel.code" :prefix-icon="Lock" type="password" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                @click="register"
                class="login_btn"
                type="primary"
                auto-insert-space
                style="color: white; border-color: #cbcaca; margin: auto"
            >注册
            </el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/">返回登录</router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.register_container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  .register_form {
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
