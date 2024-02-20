<script setup lang="ts">
import 'assets/main.scss';

import { ref } from 'vue';
const activeKey = ref('today');
</script>

<template>
  <div class="container">
    <a-space direction="vertical">
      <City />
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="today" tab="Погода сегодня" force-render>
          <Weather />
        </a-tab-pane>
        <a-tab-pane key="day3" tab="Погода на 3 дня">
          <Forecast />
        </a-tab-pane>
      </a-tabs>
    </a-space>
  </div>
</template>