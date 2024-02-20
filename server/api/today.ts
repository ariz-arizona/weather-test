export default defineEventHandler(async (event) => {
    const { OWM_KEY, DEF_LAT, DEF_LON } = process.env
    const query = getQuery(event)
    const { lat = DEF_LAT, lon = DEF_LON } = query
    const data = await $fetch(`https://api.openweathermap.org/data/2.5/weather`, {
        query: {
            lat,
            lon,
            units: 'metric',
            lang: 'ru',
            appid: OWM_KEY,
        }
    })

    return {
        today: data
    }
})