export default defineEventHandler(async (event) => {
    const { OWM_KEY, DEF_LAT, DEF_LON } = process.env
    const query = getQuery(event)
    const { q } = query
    if (!q) {
        throw new Error('no name')
    }
    const data = await $fetch(`https://api.openweathermap.org/geo/1.0/direct`, {
        query: {
            appid: OWM_KEY,
            limit: 5,
            q
        }
    })

    return {
        city: data
    }
})