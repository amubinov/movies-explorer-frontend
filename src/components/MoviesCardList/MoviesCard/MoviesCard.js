
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

  const handleLikeClick = () => {
    if (isLiked) {
      // Вызов функции для удаления фильма
      onClickMovie(movie, 'delete', movieData[0]._id);
    }
    else {
      // Вызов функции для сохранения фильма
      onClickMovie(movie, 'save', null);
    }
    setIsLiked(!isLiked); // Инвертировать состояние лайка
    // localStorage.setItem(`likedMovie_${movie._id}`, JSON.stringify(isLiked));
  };

  // const handleLikeClick = () => {
  //   setIsLiked(prevIsLiked => !prevIsLiked); // Инвертировать состояние лайка
  //   localStorage.setItem(`likedMovie_${movie.id}`, JSON.stringify(!isLiked));
  //   // Вызываем функцию для сохранения/удаления фильма в зависимости от состояния лайка
  //   const action = isLiked ? 'delete' : 'save';
  //   onClickMovie(movie, action);
  // };

  // const handleLikeClick = () => {
  //   setIsLiked(prevIsLiked => !prevIsLiked); // Инвертировать состояние лайка
  //   localStorage.setItem(`likedMovie_${movie.id}`, JSON.stringify(!isLiked));

  //   // Вызываем функцию для сохранения/удаления фильма в зависимости от состояния лайка
  //   const action = isLiked ? 'delete' : 'save';
  //   const idToDelete = action === 'delete' ? movieData[0]._id : null;

  //   onClickMovie(movie, action, idToDelete);
  // };

  // const handleLikeClick = () => {

  //   setIsLiked(prevIsLiked => !prevIsLiked); // Инвертировать состояние лайка
  //   localStorage.setItem(`likedMovie_${movie.id}`, JSON.stringify(!isLiked));

  //   // Вызываем функцию для сохранения/удаления фильма в зависимости от состояния лайка

  //   const action = isLiked ? 'delete' : 'save';
  //   onClickMovie(movie, action);
  // };


  // useEffect(() => {
  //   // При монтировании компонента, проверяем состояние лайка в localStorage
  //   const likedStatus = localStorage.getItem(`likedMovie_${movie.id}`);
  //   setIsLiked(likedStatus === 'true');
  // }, [movie.id]);



  // useEffect(() => {
  //   // При изменении состояния лайка, обновляем его в localStorage

  //   localStorage.setItem(`likedMovie_${movie._id}`, isLiked.toString());
  // }, [isLiked, movie._id]);





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
              // mode === 'all'
              //   ? isSaved
              //     ?
              //     <button
              //       type='button'
              //       className="movies-card__like movies-card__like_active"
              //       // className={
              //       //   `movies-card__like${isDisLiked ? 'movies-card__like_active' : ''
              //       //   }`
              //       // }

              //       onClick={() => onClickMovie(movie, 'delete', movieData[0]._id)}
              //     // onClick={() => {

              //     ></button>
              //     :
              //     <button
              //       type='button'
              //       className="movies-card__like"
              //       // onClick={() => onClickMovie(movie, 'save', null)}
              //       // className={
              //       //   `movies-card__like${isDisLiked ? ' movies-card__like_active' : ''
              //       //   }`
              //       // }
              //       onClick={() => {
              //         onClickMovie(movie, 'save', null);
              //         setIsDisLiked(false);
              //       }}
              //     ></button>
              //   :
              //   <button
              //     type='button'
              //     className='movies-card__like movies-card__like_dislike'
              //     onClick={() => onClickMovie(movie._id)}
              //   // onClick={handleDeleteClick}
              //   ></button>

            }
            {mode === 'all' ? (
              <button
                type='button'
                className={`movies-card__like ${isLiked ? 'movies-card__like_active' : ''}`}
                onClick={handleLikeClick}
              ></button>
            ) : (
              <button
                type='button'
                className='movies-card__like movies-card__like_dislike'
                onClick={() => onClickMovie(movie._id)}
              ></button>
            )}

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
