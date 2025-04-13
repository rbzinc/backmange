<script setup>
import {computed, ref} from "vue";
import {getPoemData} from "@/api/index.js";
import {Search} from "@element-plus/icons-vue";

const attrArr = [
  {
    id:0,
    title:'静夜思',
    name:'李白',
    dynasty:'唐',
    content:'无',
    translation:'无',
    text:'无',
    set:'删除'
  }
]
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
  pageNo.value = pager;1
  const result = await getPoemData(pageNo.value, pageSize.value);
//   console.log("00",result)
  if (result.code == 200) {
    //存储已有品牌总个数
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
}


//获取数据
const getPoets = async () => {
  try {
    const res = await getPoemData()
  } catch (error) {
    console.error('获取随机数据失败:', error)
  }
}

//弹出框内容信息
const poemParams = ref({
  title: '',
  name:'',
  dynasty:'',
  content:'',
  translation:'',
  text:'',
})

//定义收集新增古诗数据
let poemDates = ref({
  title: '',
  writer:'',
  dynasty:'',
  content:'',
  type:'',
})

//发送修改增加请求
const postData = async () => {
  let result  = await reqAddOrUpdateTrademark(poemDates);
  //添加|修改已有品牌
  if (result.code == 200) {
    dialogFormVisible.value = false;
    ElMessage({
      type: 'success',
      message: poemDates.id ? '修改品牌成功' : '添加品牌成功'
    });
    getPoems(poemDates.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: 'error',
      message: poemDates.id ? '修改品牌失败' : '添加品牌失败'
    });
    dialogFormVisible.value = false;
  }
}

//点击修改按钮操作
const updateTrademark = (row) => {
  dialogFormVisible.value = true
  Object.assign(poemDates, row)
}

//进行删除操作
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
      <el-button type="info" size="default" icon="Plus" @click="changedialog">添加诗词</el-button>
      <el-input v-model="search" size="small" :prefix-icon="Search" style="width: 240px;margin-left: 30px"/>
    </div>
    <el-table border style="margin:10px 0px" :data="attrArr" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked" />
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="朝代" prop="dynasty"></el-table-column>
      <el-table-column label="简要介绍" prop=""></el-table-column>
      <el-table-column label="人物生平" prop=""></el-table-column>
      <el-table-column label="人物成就" prop=""></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" icon="Edit" @click="changedialog">
            修改
          </el-button>
          <el-button link type="primary" size="small" icon="Delete">删除</el-button>
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
  <el-dialog v-model="dialogFormVisible" title="添加诗人" width="840">
    <el-form style="width: 80%;">
      <el-form-item label="诗名">
        <el-input placeholder="请输入诗名"></el-input>
      </el-form-item >
      <el-form-item label="作者">
        <el-input placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="朝代">
        <el-input placeholder="请输入朝代"></el-input>
      </el-form-item>
      <el-form-item label="简要介绍">
        <el-input placeholder="请输入简要介绍"></el-input>
      </el-form-item>
      <el-form-item label="人物生平">
        <el-input placeholder="请输入人物生平"></el-input>
      </el-form-item>
      <el-form-item label="人物成就">
        <el-input placeholder="请输入人物成就"></el-input>
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
