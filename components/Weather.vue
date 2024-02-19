<script setup>
const { error, pending, today: data } = await $fetch('/api/today')
</script>
<template>
    <div v-if="pending">
        Loading...
    </div>
    <div v-else-if="error">
        Error...
    </div>
    <ul v-else>
        <li>
            <Icon name="wi:thermometer" /> {{ data.main.temp }}
        </li>
        <li>
            <Icon name="wi:humidity" /> {{ data.main.humidity }}
        </li>
        <li>
            <Icon name="wi:cloudy-windy" /> {{ data.wind.speed }}
        </li>
    </ul>
</template>