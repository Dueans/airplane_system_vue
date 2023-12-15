<template>
  <el-container class="flight">
    <el-header class="header-style">
      <el-row>
        <el-col :offset="10" :span="4">
          <div class="grid-content">
            <span class="title">PODS系统</span>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 日期选择 -->
      <el-aside class="date-selector" width="200px">
        <el-menu v-for="(item, index) in dateInfo" :key="index" :default-active="active">
          <el-menu-item class="menu-item" @click="dateSelectHandler(item.url, $event)" :index="item.index">
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主展示页面 -->
      <el-main class="scrollbar" style="height: 616px;">
        <router-view />
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

    // 日期静态信息，一共十一个
    const dateInfo = ref([
      {
        label: '数据查询',
        index: '1',
        url: '/'
      },
      {
        label: '需求价格预测',
        index: '2',
        url: '/predict'
      },
      {
        label: '预测记录',
        index: '3',
        url: '/record'
      },
    ])


    const active = ref('1')
    const dateSelectHandler = (url: string, evt: any) => {
      console.log('点击')
      console.log(evt.index)
      active.value = evt.index
      router.push(url)
    }


    onMounted(() => {
      nextTick(() => {
        console.log('首页');
      })
    })

    return {
      dateInfo,
      active,

      dateSelectHandler,
    }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* 与高度相同，使文字垂直居中 */
  text-align: center;
  /* 文字水平居中 */
  font-size: 20px;
  font-weight: 600;
}

.flight {
  position: absolute;
  width: 80%;
  margin-top: 2.5%;
  margin-left: 10%;
  margin-right: 0.5%;
  height: 676px;
  background-color: #EBF5FB;
  border-radius: 1cm;
}

.header-style {
  background-color: #AED6F1;
  border-top-left-radius: 1cm;
  border-top-right-radius: 1cm;
}

.date-selector {
  background-color: #D6EAF8;
  height: 616px;
  border-bottom-left-radius: 1cm;
}

.scrollbar {
  left: 5%;
  width: 90%;
}

.menu-item {
  display: flex;
  justify-content: center;
  color: #566573;
}

.el-menu {
  background-color: #D6EAF8;
}

.grid-content {
  /* background-color: bisque; */
  min-height: 60px;
  display: flex;
  justify-content: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  color: #2E4053;
  /* 与高度相同，使文字垂直居中 */
  /* font-family: "PingFang SC"; */
}
</style>