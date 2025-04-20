<script setup>
import {ref,computed,onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { getAllusersData } from '@/api/modules/user.js'
let pageNo =ref(1)
let pageSize =ref(10)
//存储已有品牌数据总数
let total = ref(0);
//控制check栏
let checked  = ref(false)


const attrArr = ref([])

//分页处理
// 修改后的分页请求方法
const getPagesDate = async (pager = pageNo.value) => {
  try {
    const params = {
      pageNum: pager,
      pageSize: pageSize.value,
    }
    const result = await getAllusersData(params)
    total.value = result.data.total
    attrArr.value = result.data.records
    if(attrArr.value.length === 0 && pageNo.value > 1){
      pageNo.value--
      await getPagesDate(pageNo.value)
    }
  } catch (error) {
    ElMessage.error(`数据加载失败: ${error.message}`)
  }
}

// 统一分页事件处理
const handlePagination = (type, val) => {
  if(type === 'size'){
    pageSize.value = val
    pageNo.value = 1 // 切换每页数量时重置页码
    getPagesDate(1)
  } else {
    getPagesDate(val)
  }
}

onMounted(() => {
  getPagesDate();
})


</script>

<template>
  <el-card class="box-card">

    <el-table
        border style="margin:10px 0px"
        :data="attrArr"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked" />
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="注册时间" prop="createTime">
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="val => handlePagination('size', val)"
        @current-change="val => handlePagination('page', val)"
    />
  </el-card>


</template>

<style scoped>

</style>

