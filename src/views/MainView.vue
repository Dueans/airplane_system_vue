<template>
  <el-container class="container">
    <!-- 头部 -->

    <el-header>
      <el-row class="header">
        <!-- 出发地 -->
        <el-col :span="6">
          <div class="search">
            <div class="citys">出发地</div>
            <el-cascader style="width: 180px" class="citys-selector" placeholder="选择城市" v-model="depart_value"
            @change="depart_change" :options="depart_citys" />
          </div>
        </el-col>
        <!-- 目的地 -->
        <el-col :span="6">
          <div class="search">
            <div class="citys">目的地</div>
            <el-cascader style="width: 180px" class="citys-selector" placeholder="选择城市" v-model="des_value"
            @change="dest_change" :options="dest_citys" />
          </div>
        </el-col>
        <!-- 起飞时间 -->
        <el-col :span="6">
          <div class="search">
            <div class="citys">起飞时间</div>
            <el-date-picker style="width: 180px" v-model="date_value" type="date" 
            @change="date_change" placeholder="选择时间" size="default" />
          </div>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="6">
          <div class="search">
            <el-input class="search-flight" v-model="flight_search" placeholder="搜索航班号" 
            @change="flight_id_change" :prefix-icon="Search" />
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table class="table" stripe :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
        <el-table-column prop="id" label="序号" sortable width="100" />
        <el-table-column prop="depart" label="出发地" width="140" />
        <el-table-column prop="destin" label="目的地" width="140" />
        <el-table-column prop="class" label="舱位" width="140" :filters="[
          { text: '商务舱', value: '商务舱' },
          { text: '经济舱', value: '经济舱' },
        ]" column-key="id" :filter-method="filterHandler" />
        <el-table-column prop="flightId" label="航班号" width="140" />
        <el-table-column prop="departTime" label="出行时间" sortable width="180" />
        <el-table-column prop="price" sortable label="价格" width="150" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button type="danger" :icon="Delete" circle @click.prevent="handleDelete(scope.row.id, scope.$index)" />
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
import { Search, Delete } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import type { TableColumnCtx, TableInstance } from 'element-plus'

export default defineComponent({
  name: 'MainView',

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

    const query_data = ref({
      depart: 'all',
      dest: 'all',
      time: 'all',
      flight_id: 'all'
    })
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

    const tableData = ref([
      {
        id: 1,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-15',
        price: 178,
      },
      {
        id: 2,
        depart: '北京',
        destin: '长沙',
        class: '经济舱',
        flightId: 'HU1786',
        departTime: '2023-12-14',
        price: 180,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
      },
      {
        id: 3,
        depart: '北京',
        destin: '长沙',
        class: '商务舱',
        flightId: 'HU1786',
        departTime: '2023-12-16',
        price: 176,
    }])


    const currentPage = ref(1)
    const pageSize = ref(8)
    const handleCurrentChange = (page: any) => {
      currentPage.value = page;
    }
    const filterHandler = (value: any, row: any) => {
      return row.class === value
    }

    const handleDelete = (id: any, index: any) => {
      console.log('删除记录');
      
      let tableIndex = 8 * (currentPage.value - 1) + index
      tableData.value.splice(tableIndex, 1)
    }

    onMounted(() => {
      nextTick(() => {
        console.log('数据展示页');
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
      class_name,
      class_options,
      tableData,
      currentPage,
      pageSize,

      handleCurrentChange,
      filterHandler,
      handleDelete,
      depart_change,
      dest_change,
      date_change,
      flight_id_change,
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

.search {
  position: relative;
  height: 100%;
  width: 100%;
  /* 垂直水平居中 */
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 15px;
}

.citys-selector {
  position: relative;
  float: left;
}

.search-flight {
  width: 180px;
  height: 33px;
}

.table {
  position: relative;
  height: 430px;
  width: 100%;
}

.pagination {
  text-align: center;
  justify-content: center;
}

.el-pagination {
  text-align: center;
  margin-top: 12px;
}
</style>
