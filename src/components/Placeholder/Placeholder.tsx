import React from 'react';
import classNames from 'classnames';
import { ReactComponent as PlaceholderSvg } from '../../assets/images/placeholder/Academy-Weather-bg160.svg';
import { FORECAST_PLACEHOLDER } from '../../textConstants';
import './Placeholder.scss';

interface IProps {
  error?: string;
}

const Placeholder: React.FC<IProps> = ({ error }) => {
  const placeholderText = classNames({
    placeholder__text: true,
    placeholder__text_error: error
  });

  return (
    <div className="placeholder">
      <PlaceholderSvg className="placeholder__img" />
      <p className={placeholderText}>{error || FORECAST_PLACEHOLDER}</p>
    </div>
  );
};

export default Placeholder;
