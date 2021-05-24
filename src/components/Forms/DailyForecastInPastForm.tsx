import React, { useState } from 'react';
import { Card } from '../Card';
import Form from './Form';
import { getDateInUnixForRequest, requestDailyForecastInPast } from '../../services';
import { IDailyForecast, IDailyForecastInPastRequest, IFilters, ITimePeriodForecastRequest } from '../../interfaces';
import './Form.scss';

const DailyForecastInPastForm: React.FC = () => {
  const [forecastData, setForecastData] = useState<IDailyForecast[]>([]);
  const hasFilters = { city: true, date: true };

  const getRequestParamsCallback = ({ city, date }: IFilters) => {
    return {
      longitude: city?.longitude,
      latitude: city?.latitude,
      time: date ? getDateInUnixForRequest(date) : '',
      units: 'metric'
    } as IDailyForecastInPastRequest;
  };

  const requestForecastCallback = (requestParams: ITimePeriodForecastRequest | IDailyForecastInPastRequest) => {
    return requestDailyForecastInPast(requestParams as IDailyForecastInPastRequest);
  };

  const handleChangeForecastData = (data: IDailyForecast[]) => setForecastData(data);

  return (
    <Form
      hasFilter={hasFilters}
      getRequestParamsCallback={getRequestParamsCallback}
      requestForecastCallback={requestForecastCallback}
      onChangeForecastData={handleChangeForecastData}
    >
      <div className="forecast-block__wrapper">
        {!!forecastData?.[0] && <Card forecast={forecastData[0]} variant="medium" />}
      </div>
    </Form>
  );
};

export default DailyForecastInPastForm;
