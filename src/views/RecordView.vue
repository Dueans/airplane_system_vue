<template>
  <el-container class="container">
    <!-- 头部 -->

    <el-header>
      <el-row class="header">
        <!-- 出发地 -->
        <el-col :span="6">
          <div class="search city">
            <div class="citys">出发地</div>
            <el-cascader style="width: 180px" class="citys-selector" placeholder="选择城市" v-model="depart_value"
              :options="depart_citys" />
          </div>
        </el-col>
        <!-- 目的地 -->
        <el-col :span="6">
          <div class="search city">
            <div class="citys">目的地</div>
            <el-cascader style="width: 180px" class="citys-selector" placeholder="选择城市" v-model="des_value"
              :options="dest_citys" />
          </div>
        </el-col>
        <!-- 起飞时间 -->
        <el-col :span="6">
          <div class="search date">
            <div class="citys">起飞时间</div>
            <el-date-picker style="width: 180px" v-model="date_value" type="date" placeholder="选择时间" size="default" />
          </div>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="6">
          <div class="search">
            <el-input class="search-flight" v-model="flight_search" placeholder="搜索航班号" :prefix-icon="Search" />
          </div>
        </el-col>
        <!-- 排序框 -->
        <!-- <el-col :span="4">
          <div class="search order">
            <el-select v-model="class_name" class="order-selector" placeholder="所有舱位">
              <el-option v-for="item in class_options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col> -->
      </el-row>
    </el-header>

    <el-main>
      <el-table class="table" stripe :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" sortable width="100" />
        <el-table-column prop="depart" label="出发地" width="110" />
        <el-table-column prop="destin" label="目的地" width="110" />
        <el-table-column prop="class" label="舱位" width="110" />
        <!-- <el-table-column prop="class" label="舱位" width="140" 
        :filters="[
          { text: '商务舱', value: 'business' },
          { text: '经济舱', value: 'economy' },
        ]" column-key="id" :filter-method="filterHandler" 
        /> -->
        <el-table-column prop="flightId" label="航班号" width="100" />
        <el-table-column prop="departTime" label="出行时间" sortable width="140" />
        <el-table-column prop="demand" sortable label="预测需求" width="120" />
        <el-table-column prop="price" sortable label="预测价格" width="120" />
        <el-table-column fixed="right" label="操作">
          <el-button style="float: left;" type="info" :icon="Message" circle @click="getDetail" />
          <el-button style="float: left;" type="danger" :icon="Delete" circle />
        </el-table-column>

      </el-table>
    </el-main>

  </el-container>
</template>

<script lang="ts">
import { el, it } from 'element-plus/es/locale';
import { ref, onMounted, nextTick, defineComponent } from 'vue'
import { Message, Search, Delete } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import type { TableColumnCtx, TableInstance } from 'element-plus'
import router from '@/router';

export default defineComponent({
  name: 'RecordView',

  setup(props) {
    interface Flight {
      id: string,
      depart: string,
      destin: string,
      class: string,
      flightId: string,
      departTime: string,
      price: number,
    }

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
    const flight_search = ref('')
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

    const tableData = [{
      id: 1,
      depart: '北京',
      destin: '长沙',
      class: '商务舱',
      flightId: 'HU1786',
      departTime: '2023-12-15',
      demand: 100,
      price: 178,
    },
    {
      id: 2,
      depart: '北京',
      destin: '长沙',
      class: '经济舱',
      flightId: 'HU1786',
      departTime: '2023-12-14',
      demand: 120,
      price: 180,
    },
    {
      id: 3,
      depart: '北京',
      destin: '长沙',
      class: '商务舱',
      flightId: 'HU1786',
      departTime: '2023-12-16',
      demand: 90,
      price: 176,
    }]

    const getDetail = () => {
      console.log('进入详情页')
      router.push('/detail')
    }


    onMounted(() => {
      nextTick(() => {
        console.log('预测记录页');
      })
    })

    return {
      des_value,
      depart_value,
      depart_citys,
      dest_citys,
      date_value,
      flight_search,
      Search,
      Delete,
      Message,
      class_name,
      class_options,
      tableData,

      getDetail,
      // filterHandler,
    }
  },
})
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  /* background-color: cadetblue; */
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

.city {
  /* 垂直水平居中 */
  /* display: flex;
  align-items: center;
  justify-content: center; */

}

.date {}

.order {
  /* background-color: #b36b90; */
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

.citys-selector {
  position: relative;
  float: left;
  /* max-width: 100px; */
}

.search-flight {
  width: 180px;
  height: 33px;
}

.el-select {
  width: 170px;
  height: 34px;

  .el-input__inner {
    height: 34px;
  }

  .el-input__prefix,
  .el-input__suffix {
    height: 34px;
  }

  /* 下面设置右侧按钮居中 */
  .el-input__suffix {
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: flex-start;
  }

  /* 输入框加上上下边是 32px + 2px =34px */
  .el-input__icon {
    line-height: 34px;
  }
}

.table {
  position: relative;
  height: 100%;
  width: 100%;
  /* background-color: rgb(112, 13, 17); */
}
</style>
