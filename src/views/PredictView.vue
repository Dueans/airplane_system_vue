<template>
  <el-container class="container">
    <!-- 头部 -->

    <el-header>
      <el-row class="header">
        <!-- 出发地 -->
        <el-col :span="5">
          <div class="search city">
            <div class="citys">出发地</div>
            <el-cascader style="width: 150px" class="citys-selector" placeholder="选择城市" v-model="depart_value"
              :options="depart_citys" />
          </div>
        </el-col>
        <!-- 目的地 -->
        <el-col :span="6">
          <div class="search city">
            <div class="citys">目的地</div>
            <el-cascader style="width: 150px" class="citys-selector" placeholder="选择城市" v-model="des_value"
              :options="dest_citys" />
          </div>
        </el-col>
        <!-- 起飞时间 -->
        <el-col :span="5">
          <div class="search date">
            <div class="citys">起飞时间</div>
            <el-date-picker style="width: 150px" v-model="date_value" type="date" placeholder="选择时间" size="default" />
          </div>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="6">
          <div class="search">
            <el-cascader style="width: 170px" class="citys-selector" placeholder="选择舱位" v-model="class_name"
              :options="class_options" />
          </div>
        </el-col>

        <el-col :span="2">
          <div class="search">
            <el-button class="predict-button" type="success" round>预测</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <div id="line1" class="picture">

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
    const des_value = ref('')
    const depart_value = ref('')
    const depart_citys = [
      {
        value: 'beijing',
        label: '北京',
      },
      {
        value: 'shanghai',
        label: '上海',
      },
      {
        value: 'shenzhen',
        label: '深圳',
      },
      {
        value: 'yunnan',
        label: '云南',
      },
    ]
    const dest_citys = [
      {
        value: 'beijing',
        label: '北京',
      },
      {
        value: 'shanghai',
        label: '上海',
      },
      {
        value: 'shenzhen',
        label: '深圳',
      },
      {
        value: 'yunnan',
        label: '云南',
      },
    ]

    const date_value = ref('')

    const class_name = ref('')
    const class_options = [
      {
        value: 'economy',
        label: '经济舱',
      },
      {
        value: 'business',
        label: '商务舱',
      },
      {
        value: 'all',
        label: '所有舱位',
      },
    ]

    const data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

    const dateList = data.map(function (item) {
      return item[0];
    });
    const valueList = data.map(function (item) {
      return item[1];
    });

    const showLine = () => {
      var chartDom = document.getElementById('line1')!;
      var myChart = echarts.init(chartDom);

      const option = {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            // dimension: 0,
            min: 0,
            // max: dateList.length - 1
            max: 400
          }
        ],

        title: [
          {
            left: '21%',
            bottom: '0%',
            text: '需求曲线'
          },
          {
            bottom: '0%',
            right: '21%',
            text: '价格曲线'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            data: dateList
          },
          {
            data: dateList,
            gridIndex: 1
          }
        ],
        yAxis: [
          {},
          {
            gridIndex: 1
          }
        ],
        grid: [
          {
            // bottom: '60%'
            right: '55%',
            left: '5%'
          },
          {
            // top: '60%'
            right: '5%',
            left: '55%'
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: valueList
          },
          {
            type: 'line',
            showSymbol: false,
            data: valueList,
            xAxisIndex: 1,
            yAxisIndex: 1
          }
        ]
      };
      option && myChart.setOption(option);
    }


    onMounted(() => {
      nextTick(() => {
        console.log('需求价格预测页');
        showLine()
      })
    })

    return {
      des_value,
      depart_value,
      depart_citys,
      dest_citys,
      date_value,
      class_name,
      class_options,

      showLine,
    }
  },
})
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  /* background-color: #F39C12; */
}

.header {
  position: relative;
  height: 100%;
  width: 100%;
  /* background-color: #ABEBC6; */
}

.citys {
  position: relative;
  float: left;
  margin-right: 10px;
  font-size: 15px;
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
  width: 100%;
  height: 100%;
  /* background-color: bisque; */
}
</style>
