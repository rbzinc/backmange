<script setup>
import {computed, onMounted, ref,watch} from "vue";
import {reqPoetDeleteData, getPoetData, reqPoetSearchData, reqPoetAddData, reqPoetUpdateData} from "@/api/modules/poetry.js";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const attrArr = ref([])
let pageNo =ref(1)
let pageSize =ref(10)
//存储已有品牌数据总数
let total = ref(0);
//批量删除帖子的id
let deleteId = ref([])
//控制check栏
let checked  = ref(false)
//控制按钮文字
let changebom =ref(false)
//控制确认删除
let confirmVisible = ref(false)
const search = ref('')
//定义收集新增古诗数据
let poetDates = ref({
  id: '',
  name:'',
  detailIntro:'',
  simpleIntro:'',
})

//过滤搜索
watch(() => search.value, (newVal) => {
  if (newVal) {
    pageNo.value = 1; // 重置页码为1
    getPagesDate()
  }
}, { immediate: true })

//分页处理
// 修改后的分页请求方法
const getPagesDate = async (pager = pageNo.value) => {
  try {
    const params = {
      pageNum: pager,
      pageSize: pageSize.value,
    }
    const searchdata = search.value
    const result = search.value
        ? await reqPoetSearchData(searchdata)
        : await  getPoetData(params)
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

//发送修改增加请求
const postData = async () => {
  try {
    const params = {
      id: poetDates.value.id,
      name: poetDates.value.name,
      detailIntro: poetDates.value.detailIntro,
      simpleIntro: poetDates.value.simpleIntro
    }
    console.log(params)
    //转换为布尔值并进行判断
    const isEdit = !!params.id;
    const result = isEdit
        ? await reqPoetUpdateData(params)
        : await reqPoetAddData(params);
    if (result.code === 1) {
      ElMessage.success(isEdit ? '诗人修改成功' : '诗人添加成功');
      dialogFormVisible.value = false;
      await getPagesDate(pageNo.value);
    } else {
      ElMessage({
        type: 'error',
        message: isEdit ? '修改诗人失败' : '添加诗人失败'
      });
      dialogFormVisible.value = false;
    }
  } catch (error) {
    console.error('操作失败:', error);
    ElMessage.error(`操作失败: ${error.message}`);
  }
}


//点击修改按钮操作，使表单拥有数据
const updateTrademark = (row) => {
  dialogFormVisible.value = true
  Object.assign(poetDates, row)
}

//进行删除操作
// 处理多选变化
const handleSelectionChange = (selection) => {
  deleteId.value = selection.map(item => item.id)
}

// 批量删除方法
const batchDelete = async () => {
  try {
    await reqPoetDeleteData(deleteId.value)
    ElMessage.success('成功删除')
    deleteId.value = []
    await getPagesDate()
  } catch (error) {
    ElMessage.error('删除失败: ' + error.message)
  } finally {
    confirmVisible.value = false
  }
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

const dialogFormVisible = ref(false)

//添加按钮
const changedialog = () =>{
  dialogFormVisible.value = true
}

//取消按钮
const cancel = () =>{
  dialogFormVisible.value = false
}

//确认信息的填写
const confirm = () =>{
  dialogFormVisible.value = false
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
      <el-button type="info" size="default" icon="Plus" @click="changedialog">添加诗人</el-button>
      <el-input v-model="search" size="small" :prefix-icon="Search" style="width: 240px;margin-left: 30px"/>
    </div>
    <el-table border style="margin:10px 0px" :data="attrArr" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked" />
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="轶事典故" prop="detailIntro" show-overflow-tooltip></el-table-column>
      <el-table-column label="简要介绍" prop="simpleIntro" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template  #default="{ row }">
          <el-button link type="primary" size="small" icon="Edit" @click="updateTrademark(row)">
            修改
          </el-button>
          <el-button link type="primary" size="small" icon="Delete" @click="batchDelete()">删除</el-button>
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
  <el-dialog v-model="dialogFormVisible" title="添加诗人" width="840">
    <el-form style="width: 80%;">
      <el-form-item label="诗人">
        <el-input placeholder="请输入诗人" v-model="poetDates.name"></el-input>
      </el-form-item >
      <el-form-item label="轶事典故">
        <el-input placeholder="请输入轶事典故" v-model="poetDates.detailIntro"></el-input>
      </el-form-item>
      <el-form-item label="简要介绍">
        <el-input placeholder="请输入简要介绍" v-model="poetDates.simpleIntro"></el-input>
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
