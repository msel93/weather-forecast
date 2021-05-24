import {
  IDailyForecast, IDailyForecastInPastRequest,
  ITimePeriodForecastRequest,
  IDailyForecastInFuture, IForecastForTheDayInPast, IError
} from '../interfaces';
import { DATE_FORMATS, formatDateToString } from './dateService';

const API_KEY = 'bd67fa72bd832d24ed1e4dae7481c7e3';
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/';

function getIDailyForecastFromIDailyForecastInFuture (response: IDailyForecastInFuture): IDailyForecast {
  return {
    date: formatDateToString(new Date(response.dt * 1000), DATE_FORMATS.DATE_FORMAT),
    temperature: Math.round(response.temp.max),
    weatherIcon: {
      code: response.weather?.[0]?.icon,
      description: response.weather?.[0]?.description
    }
  };
}

function getIDailyForecastFromIForecastForTheDayInPast (response: IForecastForTheDayInPast): IDailyForecast {
  return {
    date: formatDateToString(new Date(response?.dt * 1000), DATE_FORMATS.DATE_FORMAT),
    temperature: Math.round(response?.temp),
    weatherIcon: {
      code: response?.weather?.[0]?.icon,
      description: response?.weather?.[0]?.description
    }
  };
}

export async function requestTimePeriodForecast (
  request: ITimePeriodForecastRequest
): Promise<IDailyForecast[] | IError> {
  const queryParams = `lat=${request.latitude}&lon=${request.longitude}&exclude=${request.excludeData}&units=${request.units}&appid=${API_KEY}`;
  const response = await fetch(`${OPEN_WEATHER_URL}data/2.5/onecall?${queryParams}`);
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.daily.map((item: IDailyForecastInFuture) => getIDailyForecastFromIDailyForecastInFuture(item));
}

export async function requestDailyForecastInPast (
  request: IDailyForecastInPastRequest
): Promise<IDailyForecast[] | IError> {
  const queryParams = `lat=${request.latitude}&lon=${request.longitude}&dt=${request.time}&units=${request.units}&appid=${API_KEY}`;
  const response = await fetch(`${OPEN_WEATHER_URL}data/2.5/onecall/timemachine?${queryParams}`);
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  const forecastData = getIDailyForecastFromIForecastForTheDayInPast(body.current);
  return [forecastData];
}
