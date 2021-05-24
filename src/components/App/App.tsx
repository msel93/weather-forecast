import React from 'react';
import { Panel } from '../Panel';
import { TimePeriodForecastForm, DailyForecastInPastForm } from '../Forms';
import { APP_TITLE, FOOTER_TEXT, SECTION_TITLES } from '../../textConstants';
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
      <main className="content">
        <Panel title={SECTION_TITLES.FUTURE_WEATHER_FORECAST}>
          <TimePeriodForecastForm />
        </Panel>
        <Panel title={SECTION_TITLES.WEATHER_FORECAST_IN_THE_PAST}>
          <DailyForecastInPastForm />
        </Panel>
      </main>
      <footer className="footer">{FOOTER_TEXT}</footer>
    </div>
  );
};

export default App;
