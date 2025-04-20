<script setup>
import {onMounted, ref} from 'vue'
import DataCard from '@/components/datacard/index.vue'
import {postAIData } from  '@/api/modules/user.js'
import VChart from 'vue-echarts' // 确保已安装 vue-echarts
import 'echarts' // 引入echarts核心库
import {PoemDatas,
  PoetDatas,
  SentenceDatas,
  UserDatas} from "@/api/modules/home.js"
// 图表配置（保持类型一致性）
const lineChart = ref({
  title: { text: '用户活跃图' },
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['用户']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: { feature: { saveAsImage: {} } },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['第一周', '第二周', '第三周', '第四周']
  },
  yAxis: { type: 'value' },
  series: [
    { name: '一月', type: 'line', stack: '总量', data: [120, 132, 101, 134, 90, 230, 210] },
    { name: '二月', type: 'line', stack: '总量', data: [120, 25, 15, 76, 68, 354, 65] },
    { name: '三月', type: 'line', stack: '总量', data: [59, 26, 56, 84, 74, 30, 145] },
    { name: '四月', type: 'line', stack: '总量', data: [66, 37, 84, 274, 69, 48, 145] }
  ]
})
//发送ai指令
let key = ref('')
let afterkey =ref('')
// 卡片数据（修正数据类型）
const cardlist = ref([
  { title: "注册人数", content: 35, icon: "UserFilled" },
  { title: "诗人数量", content: 45674, icon: "Avatar" },
  { title: "诗词数量", content: 89123, icon: "Management" },
  { title: "名句数量", content: 573544, icon: "Comment" }
])
console.log(cardlist.value[1].content) // 正确写法
const getcontents = async () =>{
  cardlist.value[2].content = await PoemDatas()
  cardlist.value[1].content = await PoetDatas()
  cardlist.value[3].content = await SentenceDatas()
  cardlist.value[0].content = await UserDatas()
}

// onMounted(() => {
//   getcontents();
// })

import { ElMessage } from 'element-plus'

// 修改后的请求方法
const postai = async () => {
  try {
    const params = {
      command: key.value
    }
    const { data } = await postAIData(params)
    afterkey.value = data.message
  } catch (error) {
    // 显示具体的错误信息
    const errorMsg = error.response?.data?.message ||
        error.message ||
        '请求服务失败，请检查网络连接'
    ElMessage.error(errorMsg)
    // 开发环境打印完整错误
    if (import.meta.env.MODE === 'development') {
      console.error('完整错误信息:', error)
    }
  }
}

</script>

<template>
  <div class="dashboard-container">
    <!-- 数据卡片 -->
    <DataCard :cardlist="cardlist" class="data-card-wrapper"/>
    <!--ai助手-->
    <div class="aichat">
      <el-card style="max-width: 480px" class="el-card">
        <el-input placeholder="请输入指令" v-model="key"  @keyup.enter="postai" autosize/>
      </el-card>
      <el-card style="max-width: 480px" class="el-card">
        <el-input placeholder="" v-model="afterkey" autosize/>
      </el-card>
    </div>
    <!-- 图表容器 -->
    <div class="chart-wrapper">
      <v-chart
          class="line-chart"
          :option="lineChart"
          autoresize
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  .aichat{
    width: calc(100% - $base-menu-width)/2;
    margin:0 auto;
    display: flex;
  }
}

.chart-wrapper {
  margin: 0 auto;
  width: 1200px;
  height: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.line-chart {
  width: 100%;
  height: 100%;
}

.data-card-wrapper {
  margin-top: 10px;
}

.el-card{
  border: 1px #ccc solid;
  height: 220px;
  width: 600px;

}


</style>