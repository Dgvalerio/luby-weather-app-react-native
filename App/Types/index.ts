/* eslint-disable camelcase */
export interface IWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ICity {
  city: string;
  state: string;
  country: string;
}

export interface IResultAPI {
  components: {
    country: string;
    state: string;
    state_code: string;
    town?: string;
    hamlet?: string;
    city?: string;
  };
  geometry: {
    lat: number;
    lng: number;
  };
}

export interface IResponseAPI {
  results: IResultAPI[];
  status: {
    code: number;
    message: string;
  };
  total_results: 8;
}

export interface ISearchStore {
  history: IResultAPI[];
}
