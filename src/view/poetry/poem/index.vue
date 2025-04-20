<script setup>
import {ref,computed,onMounted,watch} from 'vue'
import {getPoemData,reqPoemUpdateData,reqPoemAddData,reqPoemDeleteData,reqPoemSearchData} from "@/api/modules/poetry.js";
import {Lock, Search} from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'

//搜索框输入
let search = ref('')
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
//获取的诗词信息
const attrArr = ref([])
//显示控制输入表单的按钮
const dialogFormVisible = ref(false)
//定义收集新增古诗数据
let poemDates = ref({
  id:'',
  title: '',
  dynasty:'',
  writer:'',
  content:'',
  type:'',
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
        ? await reqPoemSearchData(searchdata)
        : await getPoemData(params)
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
  if (type === 'size') {
    pageSize.value = val;
    pageNo.value = 1; // 切换每页数量时重置页码
    getPagesDate(1);  // 保持搜索状态
  } else {
    pageNo.value = val;
    getPagesDate(val);
  }
};

onMounted(() => {
  getPagesDate();
})

//发送修改增加请求
const postData = async () => {
  try {
    const params = {
      id: poemDates.value.id,
      title: poemDates.value.title,
      dynasty: poemDates.value.dynasty,
      writer: poemDates.value.writer,
      content: poemDates.value.content,
      type: poemDates.value.type,
    }
    console.log(params)
    //转换为布尔值并进行判断
    const isEdit = !!params.id;
    const result = isEdit
        ? await reqPoemUpdateData(params)
        : await reqPoemAddData(params);
    if (result.code === 1) {
      ElMessage.success(isEdit ? '诗词修改成功' : '诗词添加成功');
      dialogFormVisible.value = false;
      await getPagesDate(pageNo.value);
    } else {
      ElMessage({
        type: 'error',
        message: isEdit ? '修改诗词失败' : '添加诗词失败'
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
  Object.assign(poemDates.value, row);
  console.log(row)
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
    await reqPoemDeleteData(deleteId.value)
    ElMessage.success('成功删除')
    deleteId.value = []
    await getPagesDate()
  } catch (error) {
    ElMessage.error('删除失败: ' + error.message)
  } finally {
    confirmVisible.value = false
  }
}

//添加按钮
const changedialog = () =>{
  dialogFormVisible.value = true
}

//取消按钮
const cancel = () =>{
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
    <el-table border style="margin:10px 0px" :data="attrArr"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="checked" />
      <el-table-column label="序号" prop="id" label-width="80"></el-table-column>
      <el-table-column label="诗词名" prop="title" label-width="80">
      </el-table-column>
      <el-table-column label="朝代" prop="dynasty" label-width="80">

      </el-table-column>
      <el-table-column label="作者" prop="writer" label-width="80">
        <template #="{row,$index}">
          <pre>{{row.writer}}</pre>
        </template>
      </el-table-column>
      <el-table-column label="内容" prop="content" label-width="80" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="{ row }">
          <el-button
              link
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
          >
            修改
          </el-button>
          <el-button
              link
              type="primary"
              size="small"
              icon="Delete"
              @click="batchDelete()"
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
  <el-dialog v-model="dialogFormVisible" :title="poemDates.id ? '修改诗词' : '添加诗词'" width="840">
    <el-form style="width: 80%;">
      <el-form-item label="诗名">
        <el-input placeholder="请输入诗名" v-model="poemDates.title"></el-input>
      </el-form-item >
      <el-form-item label="作者">
        <el-input placeholder="请输入作者" v-model="poemDates.writer"></el-input>
      </el-form-item>
      <el-form-item label="朝代">
        <el-input placeholder="请输入朝代" v-model="poemDates.dynasty"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input placeholder="请输入内容" v-model="poemDates.content"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input placeholder="请输入类型" v-model="poemDates.type"></el-input>
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
