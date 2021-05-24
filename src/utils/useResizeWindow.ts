import React from 'react';

export default function useResizeWindow () {
  const [windowWidth, setWindowWidth] = React.useState(window?.innerWidth);
  const changeWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', changeWindowWidth);

    return () => window.removeEventListener('resize', changeWindowWidth);
  }, []);

  return windowWidth;
}
