import { useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';
import MovieMenu from '../Movies/MovieMenu/MovieMenu';

function Navigation({ isLogged }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <nav className='navigation'>
      {isLogged ? (
        <MovieMenu />
      ) : (
        <ul className="navigation__list">
          <li className="navigation__link-wrapper">
            <button
              onClick={() => handleClick('/signup')}
              className={`navigation__link ${pathname === '/' ? 'navigation__link_register' : ''}`}
              type="button"
            >
              Регистрация
            </button>
          </li>
          <li className="navigation__link-wrapper">
            <button
              onClick={() => handleClick('/signin')}
              className="navigation__link navigation__link_login"
              type="button"
            >
              Войти
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
