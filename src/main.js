import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import persist from 'pinia-plugin-persistedstate'
import gloablComponent from "@/components/index.js"
import router from '@/router/index.js'
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia'
import VChart from 'vue-echarts';
import * as echarts from 'echarts' // 导入 ECharts
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/styles/index.scss'
const pinia =createPinia()
const app = createApp(App)
app.use(pinia)
app.use(pinia.use(persist))
app.use(gloablComponent)
app.use(router)
app.config.globalProperties.$echarts = echarts
app.component('v-chart', VChart);
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')


