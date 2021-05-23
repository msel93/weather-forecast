import React from 'react';
import { APP_TITLE, FOOTER_TEXT } from '../../textConstants';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app custom-scrollbar">
      <header className="header">
        <h1 className="header__text">
          <span className="header__text-part">{APP_TITLE.WEATHER}</span>
          <span className="header__text-part">{APP_TITLE.FORECAST}</span>
        </h1>
      </header>
      <main className="content" />
      <footer className="footer">{FOOTER_TEXT}</footer>
    </div>
  );
};

export default App;