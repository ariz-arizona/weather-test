<script setup lang="ts">
import d2d from 'degrees-to-direction';
import type { Today } from '~/types/today';

let city = reactive({ lat: '', lon: '' })
let { error, pending, data: arr } = await useFetch<Today>('/api/today', { query: { lat: city.lat, lon: city.lon } })
let data = arr?.value?.today

const selectedCity = useCityStore()
selectedCity.$subscribe(
    async () => {
        console.log(selectedCity)
        city.lat = selectedCity.lat
        city.lon = selectedCity.lon
    }
)

const windDirection = d2d(data?.wind.deg)
type windTranslate = {
    [key: string]: 'север' | 'восток' | 'юг' | 'запад'
}
const translating: windTranslate = {
    'N': 'север',
    'E': 'восток',
    'S': 'юг',
    'W': 'запад',
}
const windDirectionFormat = [...windDirection].map((el) => translating[el]).join('-')

const rowJustify = "middle"
</script>
<template>
    <div v-if="pending">
        Loading...
    </div>
    <div v-else-if="error">
        Error...
    </div>
    <a-row :align="rowJustify" v-else>
        <a-col span="24">
            <a-typography-title :level="3">
                Погода на сегодня в {{ data?.name }}
            </a-typography-title>
        </a-col>
        <a-col span="10">
            <a-typography>
                <a-image :src="`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`" :width="100"
                    :preview="false" /> сегодня {{ data?.weather[0].description }}
            </a-typography>
        </a-col>
        <a-col span="14">
            <a-space direction="vertical">
                <a-typography>
                    <Icon name="wi:thermometer" /> Температура {{ data?.main.temp }}℃, ощущается
                    как {{ data?.main.feels_like }}℃
                </a-typography>
                <a-typography>
                    <Icon name="wi:humidity" /> Влажность {{ data?.main.humidity }}%
                </a-typography>
                <a-typography>
                    <Icon name="wi:cloudy-windy" /> Ветер {{ data?.wind.speed }} <sup>м</sup>/<sub>с</sub>
                    {{ windDirectionFormat }}, порывы до {{ data?.wind.gust }} <sup>м</sup>/<sub>с</sub>
                </a-typography>
            </a-space>
        </a-col>
    </a-row>
</template>

<style>
.icon {
    font-size: 2.4rem;
}
</style>