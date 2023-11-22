<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="Lr">
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
  },
});
</script>
