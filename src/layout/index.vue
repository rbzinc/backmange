<script setup>
import Tabbar from './tabbar/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import useUserStore from '@/store/modules/user.js'
const userStore = useUserStore()
import useLayOutSettingStore from "@/store/modules/setting"
let LayOutSettingStore = useLayOutSettingStore()
</script>

<template>
<div class="layout-container">
  <div class="layout-slider">
    <img src="@/assets/images/微信图片_20241014231849.jpg" width="240px" height="80px">
    <el-menu background-color="#f6f6f6">
      <Menu :menuList="userStore.menuRoutes"></Menu>
    </el-menu>
  </div>
  <div class="layout-tabbar">
    <Tabbar></Tabbar>
  </div>
  <div class="layout-main"
       :class="{ fold: LayOutSettingStore.fold ? true : false }">

    <Main></Main>
  </div>
</div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  background: $color;
  .layout-slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    box-shadow: 0 15px 0 0 rgba(0, 0, 0, 0.5);
  }
  .layout-tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
  }
  .layout-main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
