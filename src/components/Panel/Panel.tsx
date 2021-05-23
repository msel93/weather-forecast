import React from 'react';
import './Panel.scss';

interface IProps {
  title: string;
}

const Panel: React.FC<IProps> = ({ title, children }) => {
  return (
    <section className="panel">
      <header className="panel__header">
        <h2 className="panel__title">{title}</h2>
      </header>
      {children}
    </section>
  );
};

export default Panel;
