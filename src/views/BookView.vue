<template>
  <el-container class="container">
    <el-header class="header-style">
      <el-row>
        <el-col :offset="10" :span="4">
          <div class="grid-content">
            <span class="city-name"> 预订页 </span>
          </div>
        </el-col>
        <el-col :offset="8" :span="2" >
          <el-button class="back-button" size="medium" @click="back" round>返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="main">
      <div style="width: 100%;">
        <!-- 日期 -->
        <el-row class="date-row">
          <el-col :offset="1" :span="5">
            <div class="center date-font"> {{ date }}</div>
          </el-col>
        </el-row>
        <!-- 时间 -->
        <el-row class="time-row">
          <el-col :offset="9" :span="6">
            <div class="center time-font"> {{ depart_time }}
              <span style="font-size: 25px;">&nbsp;&nbsp;&nbsp;{{ depart_city }}&nbsp; · &nbsp;{{ depart_port }}</span>
            </div>
          </el-col>
        </el-row>
        <!-- 箭头 -->
        <el-row class="arrow-row">
          <el-col :offset="9" :span="6">
            <div class="center">
              <div style="font-size: 20px;">{{ companyName }} <br /> {{ flightId }}</div>
              <img class="arrow-down" src="../pic/arrow_down.png" />
              <div style="font-size: 22px;">{{ totalTime }}</div>
            </div>
          </el-col>
        </el-row>
        <!-- 时间 -->
        <el-row class="time-row">
          <el-col :offset="9" :span="6">
            <div class="center time-font"> {{ dest_time }}
              <span style="font-size: 25px;">&nbsp;&nbsp;&nbsp;{{ dest_city }}&nbsp; · &nbsp;{{ dest_port }}</span>
            </div>
          </el-col>
        </el-row>
        <!-- 舱位选择 -->
        <el-row class="class-row">
          <el-col :offset="17" :span="3">
            <div class="center test">
              <el-select v-model="classValue" size="large">
                <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="center">
              余量：{{ rest }}
            </div>
          </el-col>
        </el-row>
        <!-- 价格显示 -->
        <el-row class="price-row">
          <el-col :offset="19" :span="1">
            <div class="center price">
              ￥{{ price }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="center">
              <el-button class="book-button" size="large" @click="book" 
              round>预订</el-button>
            </div>
          </el-col>
        </el-row>
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
    const depart_time = ref('22:00')
    const depart_port = ref('黄花机场')

    const dest_city = ref('北京')
    const dest_time = ref('22:55')
    const dest_port = ref('大兴机场')

    const flightId = ref('HU1578')
    const companyName = ref('海南航空')
    const totalTime = ref('55min')

    const classValue = ref('经济舱')
    const classOptions = ref([{
      value: 'econo',
      label: '经济舱'
    },
    {
      value: 'busi',
      label: '商务舱'
    }])

    const rest = ref(12)
    const price = ref(551)

    const outFocus = (target: any) => {
      console.log(target);

      if (target.nodeName == "SPAN") {
        target = target.parentNode;
      }

      console.log(target);
      target.blur();
    }

    const book = (evt: any) => {
      router.push('/confirm')
      outFocus(evt.target)
    }
    const date = ref('')

    // 返回按钮处理事件
    const back = (evt: any) => {
      outFocus(evt.target)
      router.back()
    }

    onMounted(() => {
      nextTick(() => {
        date.value = route.query.year + '年' + route.query.month + '月' + route.query.day + '日'
        console.log(date.value);

        console.log('航班预订页');
      })
    })

    return {
      depart_city,
      depart_time,
      depart_port,
      dest_city,
      dest_time,
      dest_port,
      date,
      totalTime,
      companyName,
      flightId,
      classValue,
      classOptions,
      rest,
      price,

      back,
      book,
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
  border-radius: 4px;
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

.date-row {
  position: relative;
  height: 15%;
}

.time-row {
  height: 15%;
}

.arrow-row {
  height: 15%;
}

.class-row {
  margin-top: 6%;
  height: 10%;
}

.price-row {
  height: 10%;
}

.center {
  width: 100%;
  height: 100%;
  /* 垂直水平居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-font {
  width: 100%;
  height: 100%;
  font-size: 30px;
}

.time-font {
  width: 100%;
  height: 100%;
  font-size: 28px;
}

.arrow-down {
  height: 90px;
}

.price {
  font-size: 26px;
  font-weight: bold;
}

.book-button {
  background-color: #2196F3;
  color: #ffffff;
  border-radius: 30px;
  min-height: 45px;
  min-width: 100px;
}
</style>
