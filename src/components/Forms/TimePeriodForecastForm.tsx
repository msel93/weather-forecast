import React, { useState } from 'react';
import { Slider } from '../Slider';
import Form from './Form';
import { requestTimePeriodForecast } from '../../services';
import { IDailyForecast, IDailyForecastInPastRequest, IFilters, ITimePeriodForecastRequest } from '../../interfaces';
import './Form.scss';

const TimePeriodForecastForm: React.FC = () => {
  const [forecastData, setForecastData] = useState<IDailyForecast[]>([]);
  const hasFilters = { city: true };

  const getRequestParamsCallback = ({ city }: IFilters) => {
    return {
      longitude: city?.longitude,
      latitude: city?.latitude,
      excludeData: ['current', 'minutely', 'hourly', 'alerts'],
      units: 'metric'
    } as ITimePeriodForecastRequest;
  };

  const requestForecastCallback = (requestParams: ITimePeriodForecastRequest | IDailyForecastInPastRequest) => {
    return requestTimePeriodForecast(requestParams as ITimePeriodForecastRequest);
  };

  const handleChangeForecastData = (data: IDailyForecast[]) => setForecastData(data);

  return (
    <Form
      hasFilter={hasFilters}
      getRequestParamsCallback={getRequestParamsCallback}
      requestForecastCallback={requestForecastCallback}
      onChangeForecastData={handleChangeForecastData}
    >
      <Slider items={forecastData} />
    </Form>
  );
};

export default TimePeriodForecastForm;
