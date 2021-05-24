import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Card } from '../Card';
import { ReactComponent as LeftButtonSvg } from '../../assets/images/icons/24/chevron-left.svg';
import { ReactComponent as RightButtonSvg } from '../../assets/images/icons/24/chevron-right.svg';
import useResizeWindow from '../../utils/useResizeWindow';
import { IDailyForecast } from '../../interfaces';
import './Slider.scss';

interface IProps {
  items: IDailyForecast[];
}

const MAX_WIDTH_OF_MOBILE_SCREEN = 720;
const ITEMS_COUNT_FOR_DESKTOP = 3;

const Slider: React.FC<IProps> = ({ items }) => {
  const [displayedItems, setDisplayedItems] = useState<IDailyForecast[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedItemsCount, setDisplayedItemsCount] = useState(3);
  const windowWidth = useResizeWindow();

  const leftButtonClass = classNames({
    slider__button: true,
    slider__button_left: true,
    slider__button_disabled: currentIndex === 0
  });

  const rightButtonClass = classNames({
    slider__button: true,
    slider__button_right: true,
    slider__button_disabled: currentIndex === items.length - displayedItemsCount
  });

  useEffect(() => {
    const updatedCount = windowWidth > MAX_WIDTH_OF_MOBILE_SCREEN ? ITEMS_COUNT_FOR_DESKTOP : items.length;
    setDisplayedItemsCount(updatedCount);
  }, [windowWidth, items]);

  useEffect(() => {
    setDisplayedItems(items.slice(0, displayedItemsCount));
  }, [items]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [displayedItemsCount, items]);

  useEffect(() => {
    setDisplayedItems(items.slice(currentIndex, currentIndex + displayedItemsCount));
  }, [currentIndex, displayedItemsCount]);

  const handleLeftButtonClick = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(index => index - 1);
    }
  };

  const handleRightButtonClick = () => {
    if (currentIndex !== items.length - displayedItemsCount) {
      setCurrentIndex(index => index + 1);
    }
  };

  return (
    <div className="slider">
      <button className={leftButtonClass} onClick={handleLeftButtonClick}>
        <LeftButtonSvg />
      </button>
      <div className="slider__list-wrapper custom-scrollbar">
        <ul className="slider__list">
          {displayedItems.map(item => (
            <li className="slider__item" key={item.date}>
              <Card forecast={item} variant="small"/>
            </li>
          ))}
        </ul>
      </div>
      <button className={rightButtonClass} onClick={handleRightButtonClick}>
        <RightButtonSvg />
      </button>
    </div>
  );
};

export default Slider;
