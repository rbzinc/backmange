<script setup>
import {onMounted, ref} from 'vue'
import {postNotebookData,deleteNotebookData} from "@/api/modules/notebook.js";
import {ElMessage} from "element-plus";
//批量删除帖子的id
let deleteId = ref([])
//控制check栏
let checked  = ref(false)
//控制按钮文字
let changebom =ref(false)
//控制确认删除
let confirmVisible = ref(false)
let pageNo =ref(1)
let pageSize =ref(10)
//存储总数
let total = ref(0);
const attrArr = ref([])
//控制表单变量
const dialogFormVisible = ref(false)
//分页处理
const getPagesDate = async (pager = pageNo.value) => {
  try {
    const params = {
      pageNum: pager,
      pageSize: pageSize.value,
    }
    const result = await postNotebookData(params)
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


//切换批量删除的模式
const handleOk = () => {
  checked.value = true
  changebom.value = true
}

//确认删除
const handleCancel = () => {
  confirmVisible.value = true
}

//取消删除
const cancelDelete =() =>{
  checked.value = false
  changebom.value = false
  confirmVisible.value = false
}

//进行删除操作
// 处理多选变化
const handleSelectionChange = (selection) => {
  deleteId.value = selection.map(item => item.id)
  console.log('当前选中 ID 数组:', deleteId.value)
}

// 批量删除方法
const batchDelete = async () => {
  try {
    const idsString = deleteId.value.join(',')
    await deleteNotebookData(idsString)
    ElMessage.success('成功删除')
    checked.value = false
    changebom.value = false
    deleteId.value = []
    await getPagesDate()
  } catch (error) {
    ElMessage.error('删除失败: ' + error.message)
  } finally {
    confirmVisible.value = false
  }
}

// 删除单个方法
const aloneDelete = async (row) => {
  const res=  await deleteNotebookData(row.id)
  console.log(res)
  ElMessage.success('成功删除')
  deleteId.value = []
  await getPagesDate()
}

</script>

<template>
  <el-card class="box-card">
    <div style="margin-bottom: 16px;display:flex" >
      <el-button
          type="danger"
          @click="handleOk"
          v-show="!changebom">
        批量删除
      </el-button>
      <el-button
          type="danger"
          @click="handleCancel"
          v-show="changebom">
        批量删除 (已选 {{ deleteId.length }} 条)
      </el-button>
    </div>
    <el-table border style="margin:10px 0px" :data="attrArr" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked"/>
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="操作" prop="title"></el-table-column>
      <el-table-column label="时间" prop="time"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default = {row}>
          <el-button
              link
              type="primary"
              size="small"
              icon="Delete"
              @click="aloneDelete(row)"
          >
            删除
          </el-button>
        </template>
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
  <el-dialog
      v-model="confirmVisible"
      title="确认删除"
      width="30%"
      @closed="deleteId = []">
    <span>确定要删除选中的 {{ deleteId.length }} 条记录吗？</span>
    <template #footer>
      <el-button @click="cancelDelete">取消</el-button>
      <el-button type="danger" @click="batchDelete">确定删除</el-button>
    </template>
  </el-dialog>

</template>

<style scoped>

</style>
