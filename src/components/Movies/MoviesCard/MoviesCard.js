import React, { useState, useContext } from "react";
import "./MoviesCard.css";
import { CurrentSavedMoviesContext } from '../../../contexts/CurrentSavedMoviesContext';

function MoviesCard({ movie, mode, onClickMovie }) {
  const CurrentSavedMovies = useContext(CurrentSavedMoviesContext);
  const { nameRU, duration, image } = movie;
  const movieData = CurrentSavedMovies.filter((item) => item.movieId === movie.id);
  const isSaved = movieData.length > 0;


  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  function getFormattedTime(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };



  return (
    <li className='movies-card'>
      <div className="movies-card__container">
        <div className="movie__title-duration">
          <a className='movies-card__content' href={movie.trailerLink} target={'_blank'} rel='noreferrer'>
            <img
              className='movies-card__image'
              src={mode === 'all' ? `https://api.nomoreparties.co${image.url}` : movie.image}
              alt={nameRU}
            />
          </a>

          <div className="movies-card__like-wrapper">
            {
              mode === 'all'
                ? isSaved
                  ?
                  <button
                    type='button'
                    className="movie__save-button movies-card__like movies-card__like_active"

                    onClick={() => onClickMovie(movie, 'delete', movieData[0]._id)}
                  // onClick={() => {

                  ></button>
                  :
                  <button
                    type='button'
                    className="movie__save-button movies-card__like"
                    onClick={() => onClickMovie(movie, 'save', null)}
                  // className={
                  //   `movie__save-button movies-card__like${isDisLiked ? ' movies-card__like_active' : ''
                  //   }`
                  // }
                  // onClick={() => {
                  //   onClickMovie(movie, 'save', null);
                  //   setIsDisLiked(false);
                  // }}
                  ></button>
                :
                <button
                  type='button'
                  className='movies-card__like movies-card__like_dislike'
                  onClick={() => onClickMovie(movie._id)}
                // onClick={() => {
                //   onClickMovie(movie._id);
                //   setIsDisLiked(true);
                // }}

                ></button>
            }
          </div>
        </div>
      </div>
      <div className="movies-card__description">
        <h2 className="movies-card__title">{movie.nameEN}</h2>
        <p className='movies-card__subtitle'>{getFormattedTime(duration)}</p>
      </div>
    </li >
  );
};

export default MoviesCard;
