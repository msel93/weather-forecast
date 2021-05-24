import React, { Fragment, useEffect, useState } from 'react';
import { Placeholder } from '../Placeholder';
import { Filter } from '../Filter';
import {
  IDailyForecast,
  IDailyForecastInPastRequest,
  IError,
  IFilters,
  ITimePeriodForecastRequest
} from '../../interfaces';

interface IProps {
  hasFilter: {
    city?: boolean;
    date?: boolean;
  };
  getRequestParamsCallback: (filters: IFilters) => ITimePeriodForecastRequest | IDailyForecastInPastRequest;
  requestForecastCallback: (params: ITimePeriodForecastRequest | IDailyForecastInPastRequest) => Promise<IDailyForecast[] | IError>;
  onChangeForecastData: (forecast: IDailyForecast[]) => void;
}

const Form: React.FC<IProps> = ({ hasFilter, getRequestParamsCallback, requestForecastCallback, onChangeForecastData, children }) => {
  const [filters, setFilters] = useState<IFilters | null>(null);
  const [forecastData, setForecastData] = useState<IDailyForecast[]>([]);
  const [error, setError] = useState<string>('');

  const updateForecastData = (data: IDailyForecast[]) => {
    setForecastData(data);
    onChangeForecastData(data);
  };

  useEffect((): () => void => {
    let isCancelled = false;
    if (filters) {
      const requestParams = getRequestParamsCallback(filters);
      requestForecastCallback(requestParams).then(
        data => {
          if (!isCancelled) {
            setError('');
            updateForecastData(data as IDailyForecast[]);
          }
        },
        (e: Error) => {
          if (!isCancelled) {
            setError(e.message);
            updateForecastData([]);
          }
        });
    }
    return () => (isCancelled = true);
  }, [filters]);

  const handleChangeFilters = (value: IFilters | null) => setFilters(value);

  return (
    <Fragment>
      <Filter hasFilter={hasFilter} onChange={handleChangeFilters} />
      {!!filters && !!forecastData?.length && !error
        ? <div className="forecast-block">{children}</div>
        : <Placeholder error={error} />
      }
    </Fragment>
  );
};

export default Form;
