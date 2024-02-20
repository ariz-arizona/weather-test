export type T_city = {
    "name": string
    "local_names": object
    "lat": number
    "lon": number
    "country": string
    "state": string
}

export type T_cities = {
    city: T_city[]
}
