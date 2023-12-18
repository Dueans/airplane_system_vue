<template>
  <el-container class="container">
    <!-- 头部 -->

    <el-header>
      <el-row class="header">
        <!-- 出发地 -->
        <el-col :span="5">
          <div class="search date">
            <div class="infos">{{ depart_time }}</div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="infos">{{ flight_id }}</div>

          </div>
        </el-col>
        <!-- 目的地 -->
        <el-col :offset="3" :span="7">
          <div class="search depart-dest">
            <div class="dur-time">{{ dur_time }}</div>
            <div class="citys">{{ depart_city }}&nbsp;&nbsp;&nbsp;</div>
            <img class="arrow" src="../pic/arr_arrow.png">
            <div class="citys">&nbsp;&nbsp;&nbsp; {{ des_city }}</div>
          </div>
        </el-col>
        <!-- 起飞时间 -->
        <el-col :offset="6" :span="3">
          <div class="search flight-id">
            <el-button @click="handleBack" style="width: 80px; height: 36px;" round>返回</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <div id="bar1" class="picture">
      </div>
      <div id="bar2" class="picture">
      </div>
    </el-main>

  </el-container>
</template>

<script lang="ts">
import * as echarts from "echarts";
import { el, it } from 'element-plus/es/locale';
import { ref, onMounted, nextTick, defineComponent } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'PredictView',

  setup(props) {
    const router = useRouter()

    const depart_city = ref('北京')
    const des_city = ref('上海')

    const depart_time = ref('2023-12-16')
    const flight_id = ref('HU8513')

    const dur_time = ref('5h30min')

    const showBar = () => {
      var chartDom = document.getElementById('bar1')!;
      var chartDom2 = document.getElementById('bar2')!;

      var myChart = echarts.init(chartDom);
      var myChart2 = echarts.init(chartDom2);


      const option = {
        title: [
          {
            left: 'center',
            bottom: '0%',
            text: '航班需求'
          },
        ],
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '预测值', '实际值',],
            ['所有舱位', 43.3, 85.8,],
            ['经济舱', 83.1, 73.4,],
            ['头等舱', 86.4, 65.2,],
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        grid: [
          {
            top: '15%',
            bottom: '13%'
          },
        ],
        series: [{ type: 'bar' }, { type: 'bar' }]
      };
      const option2 = {
        title: [
          {
            left: 'center',
            bottom: '0%',
            text: '航班价格'
          },
        ],
        legend: {
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '预测值', '实际值',],
            ['所有舱位', 43.3, 85.8,],
            ['经济舱', 83.1, 73.4,],
            ['头等舱', 86.4, 65.2,],
          ]
        },
        grid: [
          {
            top: '15%',
            bottom: '13%'
          },
        ],
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }]
      };

      option && myChart.setOption(option);
      option && myChart2.setOption(option2);

    }

    // 点击后失焦
    const outFocus = (target: any) => {
      console.log(target.nodeName);

      if (target.nodeName == "DIV") {
        target = target.parentNode.parentNode;
      }
      if (target.nodeName == "SPAN") {
        target = target.parentNode;
      }

      console.log(target);
      target.blur();
    }
    const handleBack = (evt: any) => {
      outFocus(evt.target)
      router.back()
    }


    onMounted(() => {
      nextTick(() => {
        console.log('需求价格预测页');
        showBar()
      })
    })

    return {
      depart_city,
      des_city,
      depart_time,
      flight_id,
      dur_time,

      showBar,
      handleBack,
    }
  },
})
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
}

.header {
  position: relative;
  height: 100%;
  width: 100%;
}

.citys {
  position: relative;
  float: left;
  margin-right: 10px;
  font-size: 22px;
}

.infos {
  position: relative;
  float: left;
  margin-right: 10px;
  font-size: 17px;
}

.search {
  position: relative;
  height: 100%;
  width: 100%;
  /* 垂直水平居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.picture {
  float: left;
  width: 50%;
  height: 100%;
}

.date {
  /* background-color: aquamarine; */
}

.depart-dest {
  /* background-color: blueviolet; */
}

.flight-id {
  /* background-color: coral; */
}

.arrow {
  position: relative;
  top: 6px;
  width: 70px;
  height: 40px;
}

.dur-time {
  position: absolute;
  top: 4px;
  left: 39%;
}
</style>
