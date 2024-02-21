<script lang="ts" setup>
import { ref } from 'vue';

import type { SelectProps } from 'ant-design-vue';

import { useCityStore } from '~/stores/city';
import type { City, CityElement } from '~/types/city';

const selectedCity = useCityStore()

let currentValue = '';
const value = ref();
const options = ref<SelectProps['options']>([]);

const handleSearch = async (value: string) => {
    currentValue = value;
    if (value.length < 3) {
        return
    }
    const { city: data } = await $fetch<City>(`/api/city`, { query: { q: value } })
    if (currentValue !== value) {
        return false
    }
    let optionsArray: SelectProps['options'] = []
    data.forEach((r: CityElement) => {
        optionsArray?.push({
            value: JSON.stringify({ lat: r.lat, lon: r.lon, name: r.name }),
            label: [r.name, r.state, r.country].filter(Boolean).join(', '),
        });
    });
    options.value = optionsArray
}

const handleChange = (value: SelectProps['value']) => {
    if (value) {
        const v = JSON.parse(value.toString())

        selectedCity.lat = v.lat
        selectedCity.lon = v.lon
        selectedCity.name = v.name
    } else {
        selectedCity.lat = undefined
        selectedCity.lon = undefined
        selectedCity.name = undefined
    }
};

</script>
<template>
    <a-space direction="vertical">
        <a-typography-title :level="3">
            Выберите город
        </a-typography-title>
        <a-select ref="select" v-model:value="value" show-search placeholder="Введите название города" style="width: 100%"
            :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null"
            :options="options" @search="handleSearch" @change="handleChange" :allowClear="true" />
    </a-space>
</template>