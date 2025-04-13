<script setup>
import {ref,computed} from 'vue'
//批量删除帖子的id
let deleteId = ref([])
//控制check栏
let checked  = ref(false)
//控制按钮文字
let changebom =ref(false)
//控制确认删除
let confirmVisible = ref(false)
const noticeParams = ref({
  title: '',
  name:'',
  content:'',
  logoUrl:''
})

const attrArr = [
  {
    id:0,
    title:'2025-3-16',
    name:'李白',
    dynasty:'唐',
    content:'无',
    translation:'无',
    text:'无',
    set:'删除'
  }
]

// 处理多选变化
const handleSelectionChange = (selection) => {
  deleteId.value = selection.map(item => item.id)
}

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
// 批量删除方法
const batchDelete = async  () => {
  if (deleteId.value.length === 0) {
    ElMessage.warning('请至少选择一条要删除的记录')
    return
  }
  try{
    //调用删除接口
    ElMessage.success('删除成功')
    deleteId.value = [] // 清空选中
  } catch(error){
    ElMessage.error('删除失败')
  }
}

</script>

<template>
  <el-card class="box-card">
    <div style="margin-bottom: 16px">
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

    <el-table
        border style="margin:10px 0px"
        :data="attrArr"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked" />
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="注册时间" prop="title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button
              link type="primary"
              size="small"
              icon="Delete"
              @click="batchDelete([row.id])"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize3"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </el-card>
  <el-dialog
      v-model="confirmVisible"
      title="确认删除"
      width="30%">
    <span>确定要删除选中的 {{ deleteId.length }} 条记录吗？</span>
    <template #footer>
      <el-button @click="cancelDelete">取消</el-button>
      <el-button type="danger" @click="batchDelete">确定删除</el-button>
    </template>
  </el-dialog>

</template>

<style scoped>

</style>

