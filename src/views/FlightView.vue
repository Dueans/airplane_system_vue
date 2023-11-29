<template>
  <!-- <div class="flight">

  </div> -->
  <el-container class="flight">
    <el-header style="background-color: aquamarine;">
      <el-row :gutter="20">
        <el-col :span="9">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>

      <!-- <span class="city-name">长沙</span>
      <div>
        <img class="arrow" src="../pic/arrow_right.png">
      </div>
      <span class="city-name">广东</span> -->
    </el-header>

    <el-container>
      <!-- 日期选择 -->
      <el-aside class="date-selector" style="background-color: gray;" width="200px">Aside</el-aside>


      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, onMounted, nextTick, defineComponent } from 'vue'
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

<style scoped>
.flight {
  position: absolute;
  width: 90%;
  margin-left: 5%;
  margin-right: 0.5%;
  height: 700px;
  background-color: yellowgreen;
  border-radius: 1cm;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.city-name {
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  /* 与高度相同，使文字垂直居中 */
  /* font-family: "PingFang SC"; */
}

.arrow {
  height: 30px;
  width: 30px;
}

.grid-content {
  border-radius: 4px;
  min-height: 50px;
}</style>
