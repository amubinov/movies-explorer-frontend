import React, { useState, useEffect, useContext } from "react";
import "./MoviesCard.css";
import { CurrentSavedMoviesContext } from '../../../contexts/CurrentSavedMoviesContext';


function MoviesCard({ movie, mode, onClickMovie }) {
  // function MoviesCard({ movie, mode, onClickSave, onClickDelete }) {
  const CurrentSavedMovies = useContext(CurrentSavedMoviesContext);
  const { nameRU, duration, image } = movie;
  const movieData = CurrentSavedMovies.filter((item) => item.movieId === movie.id);
  const isSaved = movieData.length > 0;

  function getFormattedTime(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  // const [isLiked, setIsLiked] = useState(isSaved);

  const [isLiked, setIsLiked] = useState(false);



  useEffect(() => {
    setIsLiked(isSaved);
  }, [isSaved]);


  const handleLikeClick = (e) => {
    e.preventDefault();
    // onClickMovie(movie, 'save', movieData[0]._id);
    onClickMovie(movie, 'save', null);
    // console.log("Deleting movie with _id:", movieData[0]._id);
    setIsLiked(!isLiked); // Инвертировать состояние лайка
    console.log("Updated like state:", !isLiked);
    // localStorage.setItem(`likedMovie_${movie._id}`, JSON.stringify(isLiked));
  };

  function handleDeleteClick(e) {
    e.preventDefault();
    onClickMovie(movie, 'delete', movieData[0]._id);
  }

  console.log("Movie _id:", movie._id);



  console.log("Movie data:", movie);
  console.log("Mode:", mode);
  console.log("Is liked:", isLiked);
  console.log("Movie data:", movieData);
  console.log("Movie data[0]:", movieData[0]);

  console.log("Movie data in MoviesCard:", movie);

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
                    className="movies-card__like movies-card__like_active"
                    onClick={() => onClickMovie(movie, 'delete', movieData[0]._id)}
                  ></button>
                  :
                  <button
                    type='button'
                    className="movies-card__like"
                    onClick={() => onClickMovie(movie, 'save', null)}

                  ></button>
                :
                <button
                  type='button'
                  className='movies-card__like movies-card__like_dislike'
                  onClick={() => onClickMovie(movie._id)}
                ></button>

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
