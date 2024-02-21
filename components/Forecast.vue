<script setup lang="ts">
import type { Forecast } from '~/types/forecast';

const selectedCity = useCityStore();

const { pending, error, data } = await useAsyncData<Forecast>(
    'forecast',
    () => {
        return $fetch('/api/forecast', {
            query: { lat: selectedCity.lat, lon: selectedCity.lon }
        })
    },
    { watch: [selectedCity] }
);

const dataSource: { [key: string]: any }[] = [{ title: 'Температура, ℃' }, { title: 'Ветер, м/с' }, { title: 'Влажность, %' }];
const columns = [{ title: '', dataIndex: 'title', key: 'title' }];

data.value?.list.map((el, i) => {
    const date = new Date(el.dt * 1000)
    const day = date.getUTCDate().toString()
    const time = date.toLocaleTimeString('ru-RU', { hour: "2-digit", minute: "2-digit" })
    if (!columns.find(el => el.dataIndex === day)) {
        columns.push({
            title: date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }),
            dataIndex: day,
            key: day,
        })
    }
    [el.main.temp, el.wind.speed, el.main.humidity].map((txt, i) => {
        if (!dataSource[i][day]) {
            dataSource[i][day] = { [time]: txt }
        } else {
            dataSource[i][day][time] = txt
        }
    })
})

</script>
<template>
    <div v-if="!selectedCity.lon || !selectedCity.lat">
        <a-alert type="info" message="Не указан город" />
    </div>
    <div v-else-if="pending">
        <a-alert type="success" message="Загрузка..." />
    </div>
    <div v-else-if="error">
        <a-alert type="warning" message="Произошла ошибка" />
    </div>
    <a-row align="middle" v-else>
        <a-col span="24">
            <a-typography-title :level="3">
                Погода на три дня в {{ data?.city.name }}, {{ data?.city.country }}
            </a-typography-title>
        </a-col>
        <a-col span="24">
            <a-table :dataSource="dataSource" :columns="columns" style="overflow: auto;"
                :pagination="{ hideOnSinglePage: true }">
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex !== 'title'">
                        <a-space direction="vertical" :size="1">
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