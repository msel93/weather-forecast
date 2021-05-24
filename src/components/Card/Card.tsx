import React from 'react';
import classNames from 'classnames';
import { IDailyForecast } from '../../interfaces';
import './Card.scss';

interface IProps {
  forecast: IDailyForecast;
  variant: 'small' | 'medium';
}

const Card: React.FC<IProps> = ({ forecast, variant }) => {
  const getWeatherIconUrl = (code: string): string => {
    return code ? `https://openweathermap.org/img/wn/${forecast.weatherIcon.code}@2x.png` : '';
  };

  const cardIconClass = classNames({
    card__icon: true,
    card__icon_size_small: variant === 'small',
    card__icon_size_medium: variant === 'medium'
  });

  return (
    <div className="card">
      <time className="card__date">{forecast.date?.toLowerCase()}</time>
      <img
        className={cardIconClass}
        src={getWeatherIconUrl(forecast.weatherIcon.code)}
        alt={forecast.weatherIcon.description}
      />
      <span className="card__text">
        {forecast.temperature > 0 ? '+' : ''}{forecast.temperature}&#176;
      </span>
    </div>
  );
};

export default Card;
