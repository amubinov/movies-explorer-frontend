import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import MovieMenu from '../Movies/MovieMenu/MovieMenu';

function Header({ isLogged }) {
  return (
    <header className={`header ${!isLogged ? 'header__dark' : 'header__light'}`}>

      <Link to='/' className='header__logo' />
      {!isLogged && <Navigation />}
      {isLogged && <MovieMenu />}
    </header>);
};

export default Header;
