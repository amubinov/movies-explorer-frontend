import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const [select, setSelect] = useState(false);
  const location = useLocation();
  const isSavedMovies = location.pathname === '/saved-movies';

  function handleSelect() {
    setSelect(!select);
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
        <a className="movies-card__content" href="#" target="_blank" rel="noreferrer">
          <img className='movies-card__image' src={movie.image} alt={movie.name} onClick={handleSelect} />
        </a>
        {isSavedMovies ? (
          <button className={`movies-card__like movies-card__like_dislike`} type="button">

          </button>
        ) : (
          <button
            className={`movies-card__like ${select ? 'movies-card__like_active' : ''}`}
            type="button"
            onClick={handleSelect}
          >
            {movie.saved ? '' : ''}
          </button>
        )}

      </div>

      <div className='movies-card__description'>
        <h2 className='movies-card__title'>{movie.name}</h2>
        <p className='movies-card__subtitle'>{movie.duration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;

