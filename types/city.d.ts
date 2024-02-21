export interface City {
    city: CityElement[];
}

export interface CityElement {
    name:        string;
    local_names: LocalNames;
    lat:         number;
    lon:         number;
    country:     string;
    state:       string;
}

export interface LocalNames {
    cs?:           string;
    et?:           string;
    ko?:           string;
    feature_name?: string;
    en?:           string;
    fr?:           string;
    ku?:           string;
    es?:           string;
    it?:           string;
    el?:           string;
    ml?:           string;
    sk?:           string;
    ru:            string;
    pl?:           string;
    hr?:           string;
    nl?:           string;
    he?:           string;
    tr?:           string;
    ascii?:        string;
    ca?:           string;
    hu?:           string;
    uk?:           string;
    zh?:           string;
    lt:            string;
    be?:           string;
    mk?:           string;
    de?:           string;
    sr?:           string;
    ja?:           string;
    kk?:           string;
}
