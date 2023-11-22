<template>
  <el-container style="height: 600px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <router-link :to="{ path: 'showStudent' }">学生信息</router-link>
    </el-aside>
    <el-container>
      <el-main>
        <!-- 子路由视图，显示后台业务数据 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, onMounted, nextTick, defineComponent} from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'LoginView',

  setup(props) {
    onMounted(() => {
      nextTick(() => {
        console.log('111');
      })
    })

    return {
    }
  },
})
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #D3DCE6;
  text-align: center;
  line-height: 200px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
