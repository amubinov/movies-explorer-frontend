import './MovieMenu.css';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const location = useLocation();
  const handleClosePopup = () => setIsOpenPopup(!isOpenPopup);

  return (
    <nav className="movie-menu ">
      <button className="movie-menu__burger" type="button" onClick={handleClosePopup}></button>
      <div className={`movie-menu__popup ${isOpenPopup ? 'movie-menu__popup_visible' : ''}`}>
        <div className="movie-menu__overlay">
          <div className="movie-menu__list-container">
            <button className="movie-menu__close" type="button" onClick={handleClosePopup}></button>
            <ul className="movie-menu__list">
              <li className="movie-menu__link-wrapper movie-menu__link-wrapper-main">
                <NavLink to="/"
                  className={`movie-menu__link ${location.pathname === '/' ? 'movie-menu__link-wrapper-main_active ' : ''}`}>Главная</NavLink>
              </li>
              <li className="movie-menu__link-wrapper">
                <NavLink to="/movies"
                  className={`movie-menu__link ${location.pathname === '/movies' ? 'movie-menu__link_active' : ''}`}
                >Фильмы</NavLink>
              </li>
              <li className="movie-menu__link-wrapper">
                <NavLink to="/saved-movies"
                  className={`movie-menu__link ${location.pathname === '/saved-movies' ? 'movie-menu__link_active' : ''}`}
                >Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/profile"
            className={`movie-menu__link movie-menu__account ${location.pathname === '/profile' ? 'active' : ''}`}
          >Аккаунт</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
