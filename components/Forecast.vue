<script setup lang="jsx">
const { error, pending, forecast: data } = await $fetch('/api/forecast')

const dataSource = [{ title: 'Температура, ℃' }, { title: 'Ветер, м/с' }, { title: 'Влажность, %' }]
const columns = [{ title: '', dataIndex: 'title', key: 'title' }]
data.list.map((el, i) => {
    const date = new Date(el.dt * 1000)
    const day = date.getUTCDate()
    const time = date.toLocaleTimeString('ru-RU', { hour: "2-digit", minute: "2-digit" })
    if (!columns.find(el => el.dataIndex === day)) {
        columns.push({
            title: date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }),
            dataIndex: day,
            key: day,
        })
    }
    [el.main.temp, el.wind.speed, el.main.humidity].map((txt, i) => {
        if (!dataSource[i][day]) dataSource[i][day] = {}
        dataSource[i][day][time] = txt
    })
})
</script>
<template>
    <div v-if="pending">
        Loading...
    </div>
    <div v-else-if="error">
        Error...
    </div>
    <a-row align="middle" v-else>
        <a-col span="24">
            <a-typography-title :level="3">
                Погода на три дня в {{ data.city.name }}
            </a-typography-title>
        </a-col>
        <a-col span="24">
            <a-table :dataSource="dataSource" :columns="columns" style="overflow: auto;"
                :pagination="{ hideOnSinglePage: true }">
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex !== 'title'">
                        <a-space direction="vertical" size="1">
                            <a-typography-text v-for="(value, key) in text">
                                {{ key }}: <strong>{{ value }}</strong>
                            </a-typography-text>
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-col>
    </a-row>
</template>