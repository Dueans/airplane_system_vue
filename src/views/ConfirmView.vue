<template>
  <el-container class="container">
    <el-header class="header-style">
      <el-row>
        <el-col :offset="10" :span="4">
          <div class="grid-content">
            <span class="city-name"> 订单提交页 </span>
          </div>
        </el-col>
        <el-col :offset="8" :span="2">
          <el-button class="back-button" size="medium" @click="back" round>返回</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="main">
      <div style="width: 100%;">
        <!-- 出发地和目的地 -->
        <el-row></el-row>
        <!-- 时间确认 -->
        <el-row></el-row>
        <!-- 舱位与价格确认 -->
        <el-row></el-row>
        <!-- 填写乘机人信息 -->
        <el-row></el-row>
        <!-- 总价和提交订单按钮 -->
        <el-row></el-row>
      </div>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { ref, onMounted, nextTick, defineComponent } from 'vue'
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: 'BookView',

  setup(props) {
    const router = useRouter()
    const route = useRoute()

    const depart_city = ref('长沙')

    const dest_city = ref('北京')

    const outFocus = (target: any) => {
      console.log(target);

      if (target.nodeName == "SPAN") {
        target = target.parentNode;
      }

      console.log(target);
      target.blur();
    }
    // 返回按钮处理事件
    const back = (evt: any) => {
      outFocus(evt.target)
      router.back()
    }

    onMounted(() => {
      nextTick(() => {
        console.log('航班预订页');
      })
    })

    return {
      depart_city,
      dest_city,

      back,
    }
  },
})
</script>

<style scoped>
.container {
  position: absolute;
  width: 80%;
  margin-left: 10%;

  height: 676px;
  background-color: #AED6F1;
  border-radius: 1cm;
}

.header-style {
  background-color: #AED6F1;
  border-top-left-radius: 1cm;
  border-top-right-radius: 1cm;
}

.grid-content {
  /* border-radius: 4px; */
  min-height: 60px;
  display: flex;
  justify-content: center;
}

.back-button {
  position: relative;
  top: 10px;
  min-height: 40px;
  min-width: 90px;
  color: #566573;
}

.city-name {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  color: #2E4053;
}

.arrow {
  position: absolute;
  top: 15px;
  height: 30px;
  width: 45px;
}

.main {
  position: relative;
  margin-left: 5%;
  width: 90%;
  height: 80%;
  background-color: #EBF5FB;
  border-top-left-radius: 0.5cm;
  border-top-right-radius: 0.5cm;
}
</style>
