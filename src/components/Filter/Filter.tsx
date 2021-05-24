import React, { useEffect, useState } from 'react';
import { Select } from '../Select';
import { Calendar } from '../Calendar';
import { DATE_FORMATS, formatDateToString, getCurrentDate, subtractDays } from '../../services';
import { ICity, IFilters } from '../../interfaces';
import { INPUT_PLACEHOLDERS } from '../../textConstants';
import CITIES from '../../cities';

interface IProps {
  hasFilter: {
    city?: boolean;
    date?: boolean;
  };
  onChange: (filters: IFilters | null) => void
}

const Filter: React.FC<IProps> = ({ hasFilter, onChange }) => {
  const items = CITIES;
  const [city, setCity] = useState<ICity | null>(null);
  const [date, setDate] = useState<string>();

  const maxDate = formatDateToString(subtractDays(getCurrentDate(), 1), DATE_FORMATS.ISO_DATE);

  useEffect(() => {
    const isCityValid = hasFilter.city ? city : true;
    const isDateValid = hasFilter.date ? date : true;
    if (isCityValid && isDateValid) {
      onChange({ city, date });
    }
  }, [city, date]);

  const handleSelectCity = (value: ICity | null) => setCity(value);

  const handleChangeDate = (value: string) => setDate(value);

  return (
    <form className="form">
      {hasFilter.city && (
        <div className="form__filter">
          <Select
            items={items}
            placeholder={INPUT_PLACEHOLDERS.SELECT_CITY}
            onChange={handleSelectCity}
          />
        </div>
      )}
      {hasFilter.date && (
        <div className='form__filter'>
          <Calendar
            placeholder={INPUT_PLACEHOLDERS.SELECT_DATE}
            maxDate={maxDate}
            onChange={handleChangeDate}
          />
        </div>
      )}
    </form>
  );
};

export default Filter;
