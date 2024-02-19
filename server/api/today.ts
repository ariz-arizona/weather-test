export default defineEventHandler(async (event) => {
    const { OWM_KEY, DEF_LAT, DEF_LON } = process.env
    const data = await $fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${DEF_LAT}&lon=${DEF_LON}&appid=${OWM_KEY}`)

    return {
        today: data
    }
})