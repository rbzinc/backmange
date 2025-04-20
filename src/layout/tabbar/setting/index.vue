<script setup>
import imgUrl from '@/assets/images/微信图片_20250409145830.jpg'
import useUserStore from "@/store/modules/user.js"
import router from "@/router/index.js";
const useUser = useUserStore()
const logout = () => {
  useUser.clearUserInfo()
  useUser.username = ''
  router.push('/')
}
const username = useUser.username
</script>

<template>
<!--  <el-button size="small" icon="Refresh" circle ></el-button>-->
<!--  <el-button size="small" icon="FullScreen" circle ></el-button>-->
  <img :src="imgUrl" style="width: 24px;height: 24px;margin:0px 10px;border-radius: 50%;">
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
        {{username}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>
