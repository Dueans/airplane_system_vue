<template>
  <el-container class="flight">
    <el-header class="header-style">
      <el-row :gutter="10">
        <el-col :span="3">
          <div class="other-date">
            <el-date-picker style="width: 170px;" v-model="dateValue" type="date" placeholder="选择其他时间" size="large"
              :disabled-date="disabledDate" :shortcuts="shortcuts" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
              @change="changeDate" />
          </div>
        </el-col>
        <el-col :offset="7" :span="1">
          <div class="grid-content">
            <span class="city-name"> {{ depart_city }} </span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <img class="arrow" src="../pic/arrow_right.png">
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content">
            <span class="city-name"> {{ desti_city }} </span>
          </div>
        </el-col>
        <el-col :span="2" :offset="8">
          <el-button class="back-button" size="medium" @click="back" round>返回</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 日期选择 -->
      <el-aside class="date-selector" width="200px">
        <el-menu v-for="(item, index) in dateInfo" :key="index" :default-active="active">
          <el-menu-item class="menu-item" @click="dateSelectHandler" :index="item.index">
            <span>{{ item.month }}月{{ item.day }}日</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主展示页面 -->
      <el-main class="scrollbar" style="height: 616px;">
        <el-scrollbar height="100%">
          <el-card v-for="item in airInfo" :key="item" class="box-card">
            <img class='company-icon' :src="item.src" alt="error" />
            <div class="flight-info">
              <div>{{ item.airId }}</div>
              <div>{{ item.companyName }}</div>
            </div>
            <div class="time-info">
              <div class="time depart">{{ item.departTime }}</div>
              <div class="port" style="left: 93px;">{{ item.departPort }}</div>
              <img class="arr-arrow" src="../pic/arr_arrow.png">
              <div class="port" style="top: 2px; left: 233px;">{{ item.totalTime }}</div>
              <div class="time arr">{{ item.arrTime }}</div>
              <div class="port" style="left: 388px;">{{ item.arrPort }}</div>
            </div>
            <div class="number-price">
              <!-- 舱位数量 -->
              <div class="class-style">
                <div class="class-span" style="top: 10px;">商务舱：{{ item.busi }}</div>
                <div class="class-span" style="top: 15px;">经济舱：{{ item.eco }}</div>
              </div>

              <!-- 价格显示 -->
              <div class="price-style">
                <div class="price">￥{{ item.price }}</div>
              </div>
            </div>
            <el-button class="book-button" @click="book">预订</el-button>
          </el-card>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { el, it } from 'element-plus/es/locale';
import { ref, onMounted, nextTick, defineComponent } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'FlightView',

  setup(props) {
    const router = useRouter()

    const depart_city = ref('长沙')
    const desti_city = ref('北京')
    const disabledDate = (time: any) => {
      return time.getTime() < Date.now() - 3600 * 1000 * 24
    }

    const shortcuts = [
      {
        text: 'Today',
        value: new Date(),
      }
    ]

    const dateValue = ref('')
    const year = ref(0)
    const month = ref(0)
    const day = ref(0)
    // 获取日期为YYYY-MM-DD格式
    const dateToString = (year: number, month: number, day: number) => {
      let monthString = ''
      let DateString = ''
      if (month < 10) {
        monthString = `0${month}` // 如果月份是个位数，在前面补0
      } else {
        monthString = month.toString()
      }
      if (day < 10) {
        DateString = `0${day}` // 如果日是个位数，在前面补0
      } else {
        DateString = day.toString()
      }
      let ans = year.toString() + '-' + monthString + '-' + DateString
      console.log(ans)
      return ans
    }
    const monthAndDate = (month: number, day: number) => {
      return month.toString() + '月' + day.toString() + '日'
    }
    // 得到当天的日期
    const getToday = () => {
      let date = new Date()

      year.value = date.getFullYear()
      month.value = date.getMonth() + 1
      day.value = date.getDate()

      dateValue.value = dateToString(year.value, month.value, day.value)
      refreshDateList()
    }

    // 日期静态信息，一共十一个
    const dateInfo = ref([
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '1',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '2',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '3',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '4',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '5',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '6',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '7',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '8',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '9',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '10',
      },
      {
        year: 2023,
        month: 5,
        day: 25,
        index: '11',
      },

    ])
    // 刷新左侧日期列表
    const getDateAdd = (day: number, nowDate: any) => {
      if (nowDate.day + 1 <= day) {
        nowDate.day = nowDate.day + 1
      } else {
        nowDate.day = 1
        if (nowDate.month + 1 <= 12) {
          nowDate.month = nowDate.month + 1
        } else {
          nowDate.month = 1
          nowDate.year = nowDate.year + 1
        }
      }
      return { day: nowDate.day, month: nowDate.month, year: nowDate.year }
    }
    const refreshDateList = () => {
      let date = {
        year: year.value,
        month: month.value,
        day: day.value
      }

      for (let i = 0; i < 11; i++) {
        dateInfo.value[i].year = date.year
        dateInfo.value[i].month = date.month
        dateInfo.value[i].day = date.day
        if (date.month <= 7) {
          if (date.month == 2) {
            if (date.year % 4 == 0) date = getDateAdd(29, date)
            else date = getDateAdd(28, date)
          } else {
            if (date.month % 2 != 0) date = getDateAdd(31, date)
            else date = getDateAdd(30, date)
          }
        } else {
          if (date.month % 2 != 0) date = getDateAdd(30, date)
          else date = getDateAdd(31, date)
        }
      }
    }
    const changeDate = () => {
      year.value = parseInt(dateValue.value.split('-')[0])
      month.value = parseInt(dateValue.value.split('-')[1])
      day.value = parseInt(dateValue.value.split('-')[2])

      refreshDateList()
    }

    // 返回按钮处理事件
    const back = (evt: any) => {
      outFocus(evt.target)
      router.push("/");
    }

    const date_ = () => {
      return '1'
    }

    // 预订按钮处理事件
    const book = (evt: any) => {
      outFocus(evt.target)
      router.push({
        path: '/book',
        query: {
          year: dateInfo.value[parseInt(active.value) - 1].year,
          month: dateInfo.value[parseInt(active.value) - 1].month,
          day: dateInfo.value[parseInt(active.value) - 1].day
        }
      });
    }

    const active = ref('6')
    const dateSelectHandler = (evt: any) => {
      console.log('点击')
      console.log(evt.index)
      active.value = evt.index
    }

    const outFocus = (target: any) => {
      console.log(target);

      if (target.nodeName == "SPAN") {
        target = target.parentNode;
      }

      console.log(target);
      target.blur();
    }

    // 机票静态信息
    const airInfo = ref([
      {
        airId: 'HU8172',
        companyName: '海南航空',
        src: require('../pic/hainan_air.webp'),
        departTime: '22:00',
        arrTime: '22:55',
        departPort: '黄花机场',
        arrPort: '大兴机场',
        totalTime: '5h31min',
        busi: '5',
        eco: '22',
        price: '588',
      },
      {
        airId: 'HU8172',
        companyName: '海南航空',
        src: require('../pic/hainan_air.webp'),
        departTime: '22:00',
        arrTime: '22:55',
        departPort: '黄花机场',
        arrPort: '大兴机场',
        totalTime: '5h31min',
        busi: '5',
        eco: '22',
        price: '588',
      }, {
        airId: 'HU8172',
        companyName: '海南航空',
        src: require('../pic/hainan_air.webp'),
        departTime: '22:00',
        arrTime: '22:55',
        departPort: '黄花机场',
        arrPort: '大兴机场',
        totalTime: '5h31min',
        busi: '5',
        eco: '22',
        price: '588',
      }, {
        airId: 'HU8172',
        companyName: '海南航空',
        src: require('../pic/hainan_air.webp'),
        departTime: '22:00',
        arrTime: '22:55',
        departPort: '黄花机场',
        arrPort: '大兴机场',
        totalTime: '5h31min',
        busi: '5',
        eco: '22',
        price: '588',
      },
      {
        airId: 'HU8172',
        companyName: '海南航空',
        src: require('../pic/hainan_air.webp'),
        departTime: '22:00',
        arrTime: '22:55',
        departPort: '黄花机场',
        arrPort: '大兴机场',
        totalTime: '5h31min',
        busi: '5',
        eco: '22',
        price: '588',
      },
    ])


    onMounted(() => {
      nextTick(() => {
        console.log('展示航班页');
        getToday()
      })
    })

    return {
      depart_city,
      desti_city,
      shortcuts,
      airInfo,
      dateInfo,
      active,
      dateValue,

      disabledDate,
      back,
      book,
      dateSelectHandler,
      changeDate,
    }
  },
})
</script>

<style scoped>
/* .el-main{
  height: 616px;
} */
.flight {
  position: absolute;
  width: 80%;
  margin-left: 10%;
  margin-right: 0.5%;
  height: 676px;
  background-color: #EBF5FB;
  border-radius: 1cm;
}

.city-name {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  color: #2E4053;
  /* 与高度相同，使文字垂直居中 */
  /* font-family: "PingFang SC"; */
}

.arrow {
  position: absolute;
  top: 15px;
  height: 30px;
  width: 45px;
}

.grid-content {
  border-radius: 4px;
  min-height: 60px;
  display: flex;
  justify-content: center;
}

.header-style {
  background-color: #AED6F1;
  border-top-left-radius: 1cm;
  border-top-right-radius: 1cm;
}

.back-button {
  position: relative;
  top: 10px;
  min-height: 40px;
  min-width: 90px;
  color: #566573;
}

.menu-item {

  display: flex;
  justify-content: center;
  color: #566573;
}

.date-selector {
  height: 616px;
  border-bottom-left-radius: 1cm;
}

.el-menu {
  background-color: #D6EAF8;
  /* border-width: 2px; */
  border-left: 2px;
  /* border-color: black; */
}

.box-card {
  position: relative;
  left: 5%;
  width: 90%;
  height: 100px;
  margin-bottom: 15px;

  /* vertical-align: middle; */
  /* text-align: center; */
}

.other-date {
  margin-top: 10px;
  top: 10px;
  width: 50px;
}

.scrollbar {
  left: 5%;
  width: 90%;
}

.book-button {
  position: relative;
  float: right;
  width: 100px;
  height: 50px;
  top: 5px;
  background-color: #2196F3;
  color: #ffffff;
  border-radius: 30px;
}

.company-icon {
  position: relative;
  float: left;
  top: 5px;
  width: 50px;
  height: 50px;
}

.flight-info {
  position: relative;
  float: left;
  /* vertical-align: middle; */
  top: 10px;
  left: 10px;
  width: 100px;
}

.time-info {
  position: relative;
  float: left;
  left: 10px;
  top: 0px;
  width: 55%;
  height: 60px;
  /* background-color: #2E4053; */
}

.number-price {
  position: relative;
  float: left;
  width: 18%;
  /* left: 3%; */
  height: 60px;
  /* background-color: brown; */
}

.time {
  position: relative;
  font-size: 32px;
  float: left;
  /* top: 5px; */
}

.depart {
  position: relative;
  float: left;
  left: 80px;
}

.arr {
  position: relative;
  float: right;
  right: 80px;
}

.arr-arrow {
  position: relative;
  float: left;
  left: 26%;
  top: 15px;
  width: 90px;
  height: 40px;
  transform: scale(1.1);
}

.port {
  position: absolute;
  font-size: 14px;
  top: 35px;
}

.class-style {
  position: relative;
  float: left;
  width: 45%;
  height: 100%;
  font-size: 14px;
}

.class-span {
  text-align: left;
  position: relative;
  left: 0;
}

.price-style {
  position: relative;
  float: left;
  width: 55%;
  height: 100%;
  /* background-color: blueviolet; */
  font-size: 25px;
}

.price {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(40, 125, 250);
}
</style>
