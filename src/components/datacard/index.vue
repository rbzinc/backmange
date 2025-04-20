<script setup>
import { defineProps } from "vue"
import Cartoon from "@/components/cartoon/cartoon.vue"

defineProps({
  cardlist: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <div class="cards-container">
    <el-card
        v-for="(item, index) in cardlist"
        :key="index"
        class="data-card"
        shadow="always"
    >
      <template #header>
        <div class="card-header">
          <h3>{{ item.title }}</h3>
        </div>
      </template>
      <div class="card-content">
        <el-icon class="card-icon">
          <component :is="item.icon" />
        </el-icon>
        <cartoon :datas="item.content" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.data-card {
  border-radius: 10px;
  flex: 1 1 300px; /* 最小宽度300px，自动换行 */
  max-width: 400px;
  min-height: 180px;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.2em;
}

.card-icon {
  font-size: 2em;
  color: #409eff;
}
</style>