import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Calendar.scss';

interface IProps {
  placeholder: string;
  maxDate: string;
  onChange: (value: string) => void;
}

const Calendar: React.FC<IProps> = ({ placeholder, maxDate, onChange }) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const dateInputClass = classNames({
    filter__input: true,
    date__input: true,
    date__input_inactive: !value && !isActive,
    date__input_filled: value
  });

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value]);

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleInputBlur = () => setIsActive(false);

  return (
    <div className="date filter">
      <input
        className={dateInputClass}
        type="date"
        value={value}
        max={maxDate}
        onFocus={() => setIsActive(true)}
        onBlur={handleInputBlur}
        onInput={handleDateInput}
      />
      {!value && !isActive && (
        <span className="date__placeholder">{placeholder}</span>
      )}
    </div>
  );
};

export default Calendar;
