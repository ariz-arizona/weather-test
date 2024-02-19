<script setup lang="ts">
const items = [{
  label: 'Погода на сегодня',
  content: 'This is the content shown for Tab1'
}, {
  label: 'Погода на 3 дня',
  content: 'Finally, this is the content for Tab3'
}]
</script>

<template>
  <UContainer>
    <UTabs :items="items" />
  </UContainer>
</template>