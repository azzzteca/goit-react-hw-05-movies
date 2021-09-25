import { Navigation } from '../Navigation/Navigation';
import s from './AppBar.module.css';

export const AppBar = () => {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
};
