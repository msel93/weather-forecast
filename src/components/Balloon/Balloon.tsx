import React from 'react';
import { ICity } from '../../interfaces';
import './Balloon.scss';

interface IProps {
  items: ICity[];
  onClick: (item: ICity) => void;
}

const Balloon: React.FC<IProps> = ({ items, onClick }) => {
  return (
    <ul className="list custom-scrollbar">
      {items.map(item => (
        <li
          key={item.name}
          className="list__item"
          onClick={() => onClick(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Balloon;
