<template>
  <div>
    <el-table :data="students" stripestyle="width: 100%">
      <el-table-column prop="id" label="学生ID" width="180"></el-table-column>
      <el-table-column prop="name" label="学生姓名" width="180"></el-table-column>
      <el-table-column prop="sex" label="学生性别"></el-table-column>
      <el-table-column prop="age" label="学生年龄"></el-table-column>
      <!-- <el-table-column label="操作">
      </el-table-column> -->
    </el-table>

    <el-button type="primary" @click="addView()">添加学生信息</el-button>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, defineComponent } from 'vue'
import { getStudentList } from '../api/api_service.js'

export default {
  name: 'StudentView',

  setup(props) {

    let dialogFormVisible = false
    let dialogFormVisible1 = false
    let formLabelWidth = "120px"

    let student = {
      id: 0,
      name: "",
      sex: "",
      age: "",
    }
    let student1 = {
      id: " ",
      name: "",
      sex: "",
      age: "",
    }
    let students = ref([])
    let search = ""

    // 进入页面自动刷新
    const showStudentList = () => {
      let studentList = [{
          id: 1,
          name: '张的妹',
          sex: '女',
          age: '23',
        },
        {
          id: 2,
          name: '点进去',
          sex: '男',
          age: '24',
        },
        {
          id: 3,
          name: '使用了',
          sex: '女',
          age: '27',
        },]

        students.value = studentList
      // getStudentList().then(res => {
      //   let studentList = res.data
      //   console.log(studentList)
      //   students.value = studentList
      //   alert('好好好   打通了')
      // }).catch((error) => {
      //   alert(error)
      // })
    }

    onMounted(() => {
      nextTick(() => {
        showStudentList()
      })
    })

    return {
      dialogFormVisible,
      dialogFormVisible1,
      formLabelWidth,
      student,
      student1,
      students,
      search,

      showStudentList,
    }
  },
}
</script>

<style>
.imgSize {
  height: 545px;
  width: 1500;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
</style>
