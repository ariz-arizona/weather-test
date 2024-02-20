<script setup>
import d2d from 'degrees-to-direction';
let { error, pending, today: data } = await $fetch('/api/today')

const selectedCity = useCityStore()
selectedCity.$subscribe(
    async () => {
        const d = await $fetch('/api/today', {
            query: {
                lan: selectedCity.lat,
                lon: selectedCity.lon,
            }
        })
        error = d.error
        pending = d.pending
        data = d.today
    }
)

const windDirection = d2d(data.wind.deg)
const translating = {
    'N': 'север',
    'E': 'восток',
    'S': 'юг',
    'W': 'запад',
}
const windDirectionFormat = [...windDirection].map(el => translating[el]).join('-')
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
                Погода на сегодня в {{ data.name }}
            </a-typography-title>
        </a-col>
        <a-col span="10">
            <a-typography>
                <a-image :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`" :width="100"
                    :preview="false" /> сегодня {{ data.weather[0].description }}
            </a-typography>
        </a-col>
        <a-col span="14">
            <a-space direction="vertical">
                <a-typography>
                    <Icon name="wi:thermometer" /> Температура {{ data.main.temp }}℃, ощущается как {{
                        data.main.feels_like }}℃
                </a-typography>
                <a-typography>
                    <Icon name="wi:humidity" /> Влажность {{ data.main.humidity }}%
                </a-typography>
                <a-typography>
                    <Icon name="wi:cloudy-windy" /> Ветер {{ data.wind.speed }} <sup>м</sup>/<sub>с</sub> {{
                        windDirectionFormat }},
                    порывы до {{
                        data.wind.gust }} <sup>м</sup>/<sub>с</sub>
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