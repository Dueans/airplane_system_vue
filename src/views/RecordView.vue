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
              @change="depart_change" :options="depart_citys" />
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
      <el-table class="table" stripe :data="tableData" style="width: 100%" >
        <el-table-column type="expand">
          <template #default="scope">
            <div m="4">
              <el-table class="expand-table" :data="scope.row.predictAndReal" :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }">
                <el-table-column label="\" prop="preOrReal" />
                <el-table-column label="经济舱">
                  <el-table-column prop="eco_demand" label="需求"/>
                  <el-table-column prop="eco_price" label="价格"/>
                </el-table-column>

                <el-table-column label="商务舱">
                  <el-table-column prop="busi_demand" label="需求"/>
                  <el-table-column prop="busi_price" label="价格"/>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="序号" sortable width="150" />
        <el-table-column prop="depart" label="出发地" width="150" />
        <el-table-column prop="destin" label="目的地" width="150" />
        <el-table-column prop="flightId" label="航班号" width="150" />
        <el-table-column prop="departTime" label="出行时间" sortable width="230" />
        <el-table-column label="操作" >
          <template #default="scope">
            <el-button style="float: left;" type="info" :icon="Message" circle @click="getDetail" />
            <el-button style="float: left;" type="danger" :icon="Delete" circle @click="deleteRow($event, scope.row.id, scope.$index)"/>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination background layout="prev, pager, next, total" :total="tableData.length"
        @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" class="pagination">
      </el-pagination>
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
    const depart_change = () => {
      // 请求后端数据
      console.log('出发地更改');
    }

    const des_value = ref('')
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
    const dest_change = () => {
      // 请求后端数据
      console.log('目的地更改');
    }

    const date_value = ref('')
    const date_change = () => {
      // 请求后端数据
      console.log('日期更改');
    }

    const flight_search = ref('')
    const flight_id_change = () => {
      // 请求后端数据
      console.log('搜索航班号');
    }

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

    const currentPage = ref(1)
    const pageSize = ref(8)
    const handleCurrentChange = (page: any) => {
      currentPage.value = page;
    }

    const tableData = ref([{
      id: 1,
      depart: '北京',
      destin: '长沙',
      class: '商务舱',
      flightId: 'HU1786',
      departTime: '2023-12-15',
      demand: 100,
      price: 178,
      predictAndReal: [{
        preOrReal: '预测值',
        eco_demand: '288',
        eco_price: '$687',
        busi_demand: '88',
        busi_price: '$999',
      },
      {
        preOrReal: '实际值',
        eco_demand: '388',
        eco_price: '$787',
        busi_demand: '38',
        busi_price: '$1399',
      }]

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
    }])

    // 点击后失焦
    const outFocus = (target: any) => {
      console.log(target.nodeName);

      if (target.nodeName == "DIV" || target.nodeName == "svg") {
        target = target.parentNode.parentNode;
      }
      if (target.nodeName == "SPAN" || target.nodeName == "I") {
        target = target.parentNode;
      }
      if (target.nodeName == "path") {
        target = target.parentNode.parentNode.parentNode;
      }

      console.log(target);
      target.blur();
    }

    const deleteRow = (evt: any, id: any, index: any) => {
      console.log('删除记录');
      
      let tableIndex = 8 * (currentPage.value - 1) + index
      tableData.value.splice(tableIndex, 1)
      outFocus(evt.target)
    }

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
      currentPage,
      pageSize,

      getDetail,
      depart_change,
      dest_change,
      date_change,
      flight_id_change,
      deleteRow,
      handleCurrentChange,
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
}

.city {
  /* 垂直水平居中 */
  /* display: flex;
  align-items: center;
  justify-content: center; */

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

.table {
  position: relative;
  height: 430px;
  width: 100%;
  /* background-color: rgb(112, 13, 17); */
}

.expand-table {
  left: 10%;
  width: 80%;
}

.pagination {
  margin-top: 12px;
  text-align: center;
  justify-content: center;
}
</style>
