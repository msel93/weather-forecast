export interface ICity {
  name: string;
  latitude: number;
  longitude: number;
}

export interface IDailyForecast {
  date: string;
  temperature: number;
  weatherIcon: {
    code: string;
    description: string;
  };
}

export interface IFilters {
  city?: ICity | null;
  date?: string;
}
