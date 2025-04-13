<script setup>
import {computed, onMounted, ref} from "vue";
import {getSentenceData,reqSentenceUpdateData,reqSentenceAddData,reqSentenceDeleteData} from "@/api/modules/poetry.js"
import {Search} from "@element-plus/icons-vue";


//获取的诗词信息
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

//搜索框搜索
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

//分页处理
const getPagesDate = async (pager = 1) => {
  //当前页码
  pageNo.value = pager
  const result = await getSentenceData(pageNo.value, pageSize.value);
  if (result.code == 200) {
    total.value = result.data.total
    attrArr.value = result.data.records
    console.log(attrArr.value)
  }
}

onMounted(() => {
  getPagesDate();
  console.log(attrArr.value)
})

//定义收集新增古诗数据
let sentenceDates = ref({
  id:'',
  fromm: '',
  name:'',
})

//发送修改增加请求
const postData = async () => {
  if(sentenceDates.id){
    //发送修改请求
    let result  = await reqSentenceUpdateData(sentenceDates);
  }
  //发送增加请求
  else{
    let result  = await reqSentenceAddData(sentenceDates);
  }
  if (result.code == 200) {
    dialogFormVisible.value = false;
    ElMessage({
      type: 'success',
      message: sentenceDates.id ? '修改品牌成功' : '添加品牌成功'
    });
    getPoems(sentenceDates.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: 'error',
      message: sentenceDates.id ? '修改品牌失败' : '添加品牌失败'
    });
    dialogFormVisible.value = false;
  }
}

//点击修改按钮操作
const updateTrademark = (row) => {
  dialogFormVisible.value = true
  Object.assign(sentenceDates, row)
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
    reqSentenceDeleteData(deleteId)
    ElMessage.success('删除成功')
    deleteId.value = [] // 清空选中
  } catch(error){
    ElMessage.error('删除失败')
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
      <el-button type="info" size="default" icon="Plus" @click="changedialog">添加诗词</el-button>
      <el-input v-model="search" size="small" :prefix-icon="Search" style="width: 240px;margin-left: 30px"/>
    </div>
    <el-table border style="margin:10px 0px" :data="attrArr" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked" />
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="名句" prop="name"></el-table-column>
      <el-table-column label="作者-诗名" prop=" fromm"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" icon="Edit" @click="updateTrademark">
            修改
          </el-button>
          <el-button link type="primary" size="small" icon="Delete" @click="batchDelete([row.id])">删除</el-button>
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
  <el-dialog v-model="dialogFormVisible" title="添加名句" width="840">
    <el-form style="width: 80%;">
      <el-form-item label="名句">
        <el-input placeholder="请输入名句" v-model="sentenceDates.fromm"></el-input>
      </el-form-item >
      <el-form-item label="名句信息">
        <el-input placeholder="请输入名句信息" v-model="sentenceDates.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="confirm">确定</el-button>
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
