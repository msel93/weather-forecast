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

export interface IWeatherIcon {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IForecastRequest {
  latitude: number;
  longitude: number;
  units: string;
}

export interface IError {
  cod: string;
  message: string;
}

export interface ITimePeriodForecastRequest extends IForecastRequest {
  excludeData: string[];
}

export interface IDailyForecastInPastRequest extends IForecastRequest {
  time: number;
}

interface IForecastDataForADayResponse {
  dt: number;
  weather: IWeatherIcon[];
}

export interface IDailyForecastInFuture extends IForecastDataForADayResponse {
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
}

export interface IForecastForTheDayInPast extends IForecastDataForADayResponse {
  temp: number;
}
