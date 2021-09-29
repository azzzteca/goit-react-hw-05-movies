import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav>
      <ul className={s.list}>
        <li>
          <NavLink
            exact
            to="/"
            className={s.link}
            activeClassName={s.activeLink}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/movies"
            className={s.link}
            activeClassName={s.activeLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
