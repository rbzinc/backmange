<script setup>
import {onMounted, ref} from 'vue'
import {
  addNoticeData,
  deleteNoticeData,
  getNoticeData,
  changeNoticeData,
} from "@/api/modules/notice.js";
import {ElMessage} from "element-plus";
import {Search} from "@element-plus/icons-vue";


//定义收集新增公告数据
let noticeDates = ref({
  id:'',
  name: '',
  contents:'',
  createtime:''
})

let pageNo =ref(1)
let pageSize =ref(10)
//存储总数
let total = ref(0);
//批量删除的id
let deleteId = ref([])
//控制check栏
let checked  = ref(false)
//控制按钮文字
let changebom =ref(false)
//控制确认删除
let confirmVisible = ref(false)
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
    const result = await getNoticeData(params)
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

//添加修改公告
const postData = async () => {
  try {
    const params = {
      id: noticeDates.value.id,
      name: noticeDates.value.name,
      contents: noticeDates.value.contents
    }
    console.log(params)
    //转换为布尔值并进行判断
    const isEdit = !!params.id;
    const result = isEdit
        ? await changeNoticeData(params)
        : await addNoticeData(params);
    if (result.code === 1) {
      ElMessage.success(isEdit ? '公告修改成功' : '公告添加成功');
      dialogFormVisible.value = false;
      await getPagesDate(pageNo.value);
    } else {
      ElMessage({
        type: 'error',
        message: isEdit ? '修改公告失败' : '添加公告失败'
      });
      dialogFormVisible.value = false;
    }
  } catch (error) {
    console.error('操作失败:', error);
    ElMessage.error(`操作失败: ${error.message}`);
  }
}

//点击修改按钮操作
const updateTrademark = (row) => {
  dialogFormVisible.value = true
  Object.assign(noticeDates.value, row);
  console.log(row)
}


const changedialog = () =>{
  dialogFormVisible.value = true

}

const cancel = () =>{
  dialogFormVisible.value = false
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

//进行删除操作
// 处理多选变化
const handleSelectionChange = (selection) => {
  deleteId.value = selection.map(item => item.id)
  console.log('当前选中 ID 数组:', deleteId.value)
}

// 批量删除方法
const batchDelete = async () => {
  try {
    console.log(deleteId.value)
    console.log(Array.isArray(deleteId.value))
    await deleteNoticeData(deleteId.value)
    ElMessage.success('成功删除')
    deleteId.value = []
    await getPagesDate()
  } catch (error) {
    ElMessage.error('删除失败: ' + error.message)
  } finally {
    confirmVisible.value = false
  }
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
      <el-button type="info" size="default" icon="Plus" @click="changedialog">添加公告</el-button>
      <el-input v-model="search" size="small" :prefix-icon="Search" style="width: 240px;margin-left: 30px"/>
    </div>
    <el-table border style="margin:10px 0px" :data="attrArr" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked"/>
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="标题" prop="name">
      </el-table-column>
      <el-table-column label="内容" prop="contents">
      </el-table-column>
      <el-table-column label="时间" prop="createtime">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" icon="Edit" @click="updateTrademark">
            修改
          </el-button>
          <el-button link type="primary" size="small" icon="Delete"  @click="batchDelete()">删除</el-button>
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
  <el-dialog v-model="dialogFormVisible" title="添加公告" width="840">
    <el-form style="width: 80%;">
      <el-form-item label="标题">
        <el-input placeholder="请输入标题" v-model="noticeDates.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input placeholder="请输入内容" v-model="noticeDates.contents"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="postData">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-dialog>
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
