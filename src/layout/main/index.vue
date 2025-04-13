<script setup>
import { watch, ref, nextTick } from "vue";
import useLayOutSettingStore from "@/store/modules/setting";
let layOutSettingStore = useLayOutSettingStore();
//控制当前组件是否销毁重建
let flag = ref(true);
//监听仓库内部数据是否发生变化,如果发生变化，说明用户点击过刷新按钮
watch(
    () => layOutSettingStore.refsh,
    () => {
      //点击刷新按钮:路由组件销毁
      flag.value = false;
      nextTick(() => {
        flag.value = true;
      });
    },
);
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss"></style>
