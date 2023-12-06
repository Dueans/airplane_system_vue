<template>
  <div class="home">

    <!-- 选择城市和时间模块  -->
    <div class="func">

      <!-- 出发地和目的地选择 -->
      <div class="departure">
        <el-cascader placeholder="选择城市" v-model="dep_value" :options="options" />
        <div class="citys">出发地</div>
      </div>

      <el-button class="el-icon-devops" circle @click="changeCitys">
        <div class="switch-icon"></div>
      </el-button>

      <!-- <div class="date-style">{{ depart_date }}</div> -->

      <div class="destination">
        <el-cascader placeholder="选择城市" v-model="des_value" :options="options" />
        <div class="citys">目的地</div>
      </div>

      <!-- 时间选择和舱位选择 -->
      <div class="date-class">

        <!-- 时间选择 -->
        <div class="date-selector">
          <el-date-picker v-model="date_value" type="date" placeholder="选择时间" :disabled-date="disabledDate"
            :shortcuts="shortcuts" size="default" />
        </div>

        <!-- 舱位选择 -->
        <div class="class-selector">
          <el-select style="width: 150px" v-model="class_value" class="m-2" placeholder="选择舱位">
            <el-option v-for="item in class_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <!-- 搜索按钮 -->
        <el-button style="width: 16%;" class="search-button" @click="searchFlight">
          搜索
        </el-button>

      </div>
    </div>

    <!-- 轮播图模块 -->
    <div class="pictures">
      <el-carousel class="picture-view" trigger="click" height="100%">
        <el-carousel-item v-for="item in pictures_url" :key="item">
          <!-- <el-img :src="item.url" alt="" /> -->
          <img :src="item.url" alt="" />
          <span>{{ item.url }}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, nextTick, defineComponent } from 'vue'
import { useRouter } from "vue-router";
import utils from '../utils/utils'
import moment from 'moment';
// import image1 from '../pic/beijing.png'

export default defineComponent({
  name: 'HomeView',
  components: {
  },

  setup(props) {

    const router = useRouter()

    // 城市选择部分
    const dep_value = ref([])
    const des_value = ref([])

    // 城市列表数据
    const options = [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency',
              },
              {
                value: 'feedback',
                label: 'Feedback',
              },
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'side nav',
                label: 'Side Navigation',
              },
              {
                value: 'top nav',
                label: 'Top Navigation',
              },
            ],
          },
        ],
      },
      {
        value: 'component',
        label: 'Component',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout',
              },
              {
                value: 'color',
                label: 'Color',
              },
              {
                value: 'typography',
                label: 'Typography',
              },
              {
                value: 'icon',
                label: 'Icon',
              },
              {
                value: 'button',
                label: 'Button',
              },
            ],
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio',
              },
              {
                value: 'checkbox',
                label: 'Checkbox',
              },
              {
                value: 'input',
                label: 'Input',
              },
              {
                value: 'input-number',
                label: 'InputNumber',
              },
              {
                value: 'select',
                label: 'Select',
              },
              {
                value: 'cascader',
                label: 'Cascader',
              },
              {
                value: 'switch',
                label: 'Switch',
              },
              {
                value: 'slider',
                label: 'Slider',
              },
              {
                value: 'time-picker',
                label: 'TimePicker',
              },
              {
                value: 'date-picker',
                label: 'DatePicker',
              },
              {
                value: 'datetime-picker',
                label: 'DateTimePicker',
              },
              {
                value: 'upload',
                label: 'Upload',
              },
              {
                value: 'rate',
                label: 'Rate',
              },
              {
                value: 'form',
                label: 'Form',
              },
            ],
          },
          {
            value: 'data',
            label: 'Data',
            children: [
              {
                value: 'table',
                label: 'Table',
              },
              {
                value: 'tag',
                label: 'Tag',
              },
              {
                value: 'progress',
                label: 'Progress',
              },
              {
                value: 'tree',
                label: 'Tree',
              },
              {
                value: 'pagination',
                label: 'Pagination',
              },
              {
                value: 'badge',
                label: 'Badge',
              },
            ],
          },
          {
            value: 'notice',
            label: 'Notice',
            children: [
              {
                value: 'alert',
                label: 'Alert',
              },
              {
                value: 'loading',
                label: 'Loading',
              },
              {
                value: 'message',
                label: 'Message',
              },
              {
                value: 'message-box',
                label: 'MessageBox',
              },
              {
                value: 'notification',
                label: 'Notification',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'menu',
                label: 'Menu',
              },
              {
                value: 'tabs',
                label: 'Tabs',
              },
              {
                value: 'breadcrumb',
                label: 'Breadcrumb',
              },
              {
                value: 'dropdown',
                label: 'Dropdown',
              },
              {
                value: 'steps',
                label: 'Steps',
              },
            ],
          },
          {
            value: 'others',
            label: 'Others',
            children: [
              {
                value: 'dialog',
                label: 'Dialog',
              },
              {
                value: 'tooltip',
                label: 'Tooltip',
              },
              {
                value: 'popover',
                label: 'Popover',
              },
              {
                value: 'card',
                label: 'Card',
              },
              {
                value: 'carousel',
                label: 'Carousel',
              },
              {
                value: 'collapse',
                label: 'Collapse',
              },
            ],
          },
        ],
      },
      {
        value: 'resource',
        label: 'Resource',
        children: [
          {
            value: 'axure',
            label: 'Axure Components',
          },
          {
            value: 'sketch',
            label: 'Sketch Templates',
          },
          {
            value: 'docs',
            label: 'Design Documentation',
          },
        ],
      },
    ]

    // 交换城市按钮
    const changeCitys = (evt: any) => {
      const temp = dep_value.value
      dep_value.value = des_value.value
      des_value.value = temp
      outFocus(evt.target)
    }
    // 点击后失焦
    const outFocus = (target: any) => {
      console.log(target.nodeName);
      
      if (target.nodeName == "DIV") {
        target = target.parentNode.parentNode;
      }

      console.log(target);
      target.blur();
    }

    // const depart_date = ref("5月18日")

    // const handleChange = (value: any) => {
    //   console.log(value)
    // }

    // 日期部分
    const date_value = ref('')
    // 不可见的日期范围
    const disabledDate = (time: Date) => {
      return time.getTime() < Date.now() - 3600 * 1000 * 24
    }

    const shortcuts = [
      {
        text: 'Today',
        value: new Date(),
      },
    ]

    // 舱位部分
    // 舱位种类
    const class_value = ref('')
    const class_options = [
      {
        value: 'economy',
        label: '经济舱',
      },
      {
        value: 'business',
        label: '商务舱',
      },
    ]

    // 轮播图部分
    // 轮播图图片
    const pictures_url = ref([
      { url: require('../pic/beijing.jpg') },
      { url: require('../pic/hangzhou.jpg') },
      { url: require('../pic/yunnan.jpg') },
      { url: require('../pic/changsha.jpg') },
    ])

    // 提交部分
    const searchFlight = () => {
      console.log(1);
      router.push("/main");
    }

    onMounted(() => {
      nextTick(() => {
        console.log('首页');
        // console.log(moment());
      })
    })

    return {
      dep_value,
      des_value,
      options,
      // depart_date,
      date_value,
      shortcuts,
      class_value,
      class_options,
      pictures_url,

      disabledDate,
      changeCitys,
      // handleChange,
      searchFlight,
    }
  },
});
</script>
<style scoped>
.home {
  position: absolute;
  width: 98%;
  height: 700px;
  margin-left: 0.5%;
  margin-right: 0.5%;
  display: flex;
  justify-content: center;
}

.func {
  position: absolute;
  width: 80%;
  height: 35%;
  display: flex;
  justify-content: center;
  background: url('../pic/sky.webp') center no-repeat;
  background-size: cover;
  border-radius: 2cm;
}

.pictures {
  position: absolute;
  width: 80%;
  height: 60%;
  top: 40%;
  background-color: darkgoldenrod;
  border-radius: 2cm;
}

.departure {
  position: absolute;
  width: 13%;
  left: 32%;
  top: 25%;
}

.destination {
  position: absolute;
  width: 13%;
  left: 55%;
  top: 25%;
}

.citys {
  position: relative;
  margin-top: 4px;
}

.date-style {
  position: absolute;
  top: 40%;
}

.date-class {
  position: absolute;
  top: 50%;
  width: 36%;
  height: 30%;
}

.date-selector {
  position: absolute;
  width: 5%;
  top: 20%;
}

.date-selector>>>.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
}

.date-input>>>.el-input__inner {
  width: 190px;
  height: 40px;
}

.class-selector {
  position: absolute;
  top: 20%;
  left: 45%;
}

.search-button {
  position: absolute;
  top: 20%;
  left: 82%;
  size: "mini";
}

::v-deep .el-icon-devops {
  position: absolute;
  top: 20%;
  margin: auto;
  min-height: 50px;
  min-width: 50px;
  size: "mini";
  background-color: #2471A3;
  display: flex;
  justify-content: center;
  border-color: #2471A3;
}

::v-deep .switch-icon {
  min-height: 30px;
  min-width: 30px;
  background: url('../pic/switch.png') center no-repeat;
  background-size: cover;
}

.el-icon-devops:hover {
    background: #7FB3D5 !important;
    border-color: #7FB3D5 !important;
  }

.picture-view {
  height: 100%;
  width: 100%;
  border-radius: 2cm;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 100%;
  margin: 0;
  text-align: center;
  border-radius: 2cm;
}
</style>