import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Balloon } from '../Balloon';
import { ICity } from '../../interfaces';
import './Select.scss';

interface IProps {
  items: ICity[];
  placeholder: string;
  onChange: (item: ICity) => void;
}

const Select: React.FC<IProps> = ({ items, placeholder, onChange }) => {
  const [selectedItem, setSelectedItem] = useState<ICity | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([...items]);

  const selectInputWrapperClass = classNames({
    filter: true,
    'select__input-wrapper': true,
    'select__input-wrapper_opened': isOpen,
    'select__input-wrapper_closed': !isOpen || !filteredItems.length
  });

  const selectInputClass = classNames({
    filter__input: true,
    select__input: true,
    select__input_filled: !!selectedItem?.name,
    select__input_invalid: !filteredItems.length
  });

  const selectButtonClass = classNames({
    select__button: true,
    select__button_opened: isOpen,
    select__button_closed: !isOpen || !filteredItems.length
  });

  useEffect(() => {
    const handleClickOutside = () => isOpen && setIsOpen(false);

    isOpen
      ? document.addEventListener('click', handleClickOutside)
      : document.removeEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    isOpen
      ? setFilteredItems([...items])
      : setSearchText(selectedItem?.name || '');
  }, [isOpen]);

  useEffect(() => {
    searchText
      ? setFilteredItems(items.filter(item => item.name.includes(searchText)))
      : setFilteredItems([...items]);
  }, [searchText]);

  const handleSelect = (item: ICity) => {
    setSelectedItem(item);
    setSearchText(item.name);
    onChange(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchText(e.target.value);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  };

  const handleButtonClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="select">
      <div className={selectInputWrapperClass}>
        <input
          className={selectInputClass}
          type="text"
          placeholder={placeholder}
          value={searchText}
          onChange={handleChange}
          onClick={handleInputClick}
        />
        <button className={selectButtonClass} onClick={handleButtonClick} />
      </div>
      {isOpen && !!filteredItems.length && (
        <div className="select__balloon">
          <Balloon items={filteredItems} onClick={handleSelect} />
        </div>
      )}
    </div>
  );
};

export default Select;
