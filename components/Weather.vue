<script setup lang="ts">
import d2d from 'degrees-to-direction';
import type { Today } from '~/types/today';

const selectedCity = useCityStore();

const { pending, error, data } = await useAsyncData<Today>(
    'today',
    () => {
        return $fetch('/api/today', {
            query: { lat: selectedCity.lat, lon: selectedCity.lon }
        })
    },
    { watch: [selectedCity] }
);

const windDirection = data.value?.wind ? d2d(data.value.wind.deg) : 'N'
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
                Погода на сегодня в {{ data?.name }}, {{ data?.sys.country }}
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