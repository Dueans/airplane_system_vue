<template>
  <div class="container">

  </div>
</template>

<script lang="ts">
import { el, it } from 'element-plus/es/locale';
import { ref, onMounted, nextTick, defineComponent } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'PredictView',

  setup(props) {
    
    onMounted(() => {
      nextTick(() => {
        console.log('数据展示页');
      })
    })

    return {

    }
  },
})
</script>

<style scoped>
.container{
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #F39C12;
}
</style>
