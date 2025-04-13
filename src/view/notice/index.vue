<script setup>
import {ref} from 'vue'
const noticeParams = ref({
  title: '',
  content:'',
  logoUrl:''
})

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

const dialogFormVisible = ref(false)
const changedialog = () =>{
  dialogFormVisible.value = true

}

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
    <el-button type="info" size="default" icon="Plus" @click="changedialog">添加公告</el-button>
    <el-table border style="margin:10px 0px" :data="attrArr">
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title">
      </el-table-column>
      <el-table-column label="内容" prop="content">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" icon="Edit" @click="handleClick">
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
  <el-dialog v-model="dialogFormVisible" title="添加公告" width="840">
    <el-form style="width: 80%;">
      <el-form-item label="标题">
        <el-input placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="confirm">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-dialog>

</template>

<style scoped>

</style>
