<template>
  <!-- 视图显示部分-->
  <div>
    <h2>登录页面</h2>
    <div id="inputStyle" class="inputClass">
      <el-form :model="ruleForm2" status-icon :rules="rules2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input type="text" v-model="ruleForm2.code"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
          <el-button type="text"><router-link to="/">回到首页</router-link></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script>

import { ref, onMounted, nextTick, defineComponent} from 'vue'
import { useRouter } from "vue-router";

// 编写js行为
export default defineComponent({
  name: 'LoginView',

  setup(props) {
    let test = ref("")
    let ruleForm2 = ref({
      uname: '',
      pass: '',
      code: ''
    })

    const router = useRouter()

    const submitForm = (formName) => {
      let loginInfo = ruleForm2.value

      
      if (loginInfo.uname == 'admin') {//登录成功
        // 导航到后台主页
        alert(loginInfo.uname + loginInfo.code)
        router.push("/main");//使用编程式动态路由
      } else {
        // this.$router.push("/");
      }
    }
    const resetForm = (formName) => {
      this.$refs[formName].resetFields();
    }

    onMounted(() => {
      nextTick(() => {
        console.log(111);
      })
    })

    return {
      ruleForm2,
      test,

      submitForm,
      resetForm,

    }
  },
})
</script>
  
<style scoped>
.inputClass {
  padding: 20px;
  width: 300px;
  height: 250px;
  margin: 0 auto;
}
</style>
  