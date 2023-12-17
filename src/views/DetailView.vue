<template>
  <el-container class="container">
    <!-- 头部 -->

    <el-header>
      <el-row class="header">
        <!-- 出发地 -->
        <el-col :span="5">
          <div class="search city">
            <div class="citys">出发地：{{ depart_city }}</div>

          </div>
        </el-col>
        <!-- 目的地 -->
        <el-col :span="6">
          <div class="search city">
            <div class="citys">目的地：{{ des_city }}</div>

          </div>
        </el-col>
        <!-- 起飞时间 -->
        <el-col :span="5">
          <div class="search date">
            <div class="citys">起飞时间：{{ depart_time }}</div>
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
    const depart_city = ref('北京')
    const des_city = ref('上海')

    const depart_time = ref('2023-12-16')

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

      showBar,
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
  font-size: 17px;
  /* margin-top: 4px; */
}

.search {
  position: relative;
  height: 100%;
  width: 100%;
  /* 垂直水平居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #0f4a27; */
}

.search-flight {
  width: 180px;
  height: 33px;
}

.predict-button {
  width: 90px;
}

.picture {
  float: left;
  width: 50%;
  height: 100%;
  /* background-color: bisque; */
}
</style>
