
import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import moviesApi from '../../../utils/MoviesApi';
import {
  windowWidth_1280,
  windowWidth_984,
  windowWidth_600,
  totalCards_984,
  totalCards_600,
  totalCards_320,
  AddMovies_984,
  AddMovies_600,
  AddMovies_320,

} from '../../../utils/config';

function MoviesCardList({ movies, mode, onClickMovie }) {

  const [isTotalCards, setIsTotalCards] = useState(0);
  const [isAddMovies, setIsAddMovies] = useState(0);

  function setMovies(windowWidth) {
    switch (true) {
      case (windowWidth >= windowWidth_1280):
        setIsTotalCards(totalCards_984);
        setIsAddMovies(AddMovies_984);
        break;
      case (windowWidth > windowWidth_984):
        setIsTotalCards(totalCards_984);
        setIsAddMovies(AddMovies_984);
        break;
      case (windowWidth > windowWidth_600):
        setIsTotalCards(totalCards_600);
        setIsAddMovies(AddMovies_600);
        break;
      default:
        setIsTotalCards(totalCards_320);
        setIsAddMovies(AddMovies_320);
    }
  };

  function handleMore() {
    setIsTotalCards(isTotalCards + isAddMovies);
  }

  // Функция уменьшения частоты Resize
  function slowDownResize(callback) {
    let blockedCall = false;
    return function () {
      if (blockedCall) return;
      const context = this;
      const args = arguments;
      blockedCall = true;
      setTimeout(() => {
        callback.apply(context, args);
        blockedCall = false;
      }, 500);
    }
  }

  useEffect(() => {
    setMovies(window.innerWidth);
    window.addEventListener('resize',
      window.fn = slowDownResize((evt) => setMovies(evt.currentTarget.innerWidth))
    );
    return () => window.removeEventListener('resize', window.fn);
  }, []);


  return (
    <>
      <section className='movies-card-list'>
        <ul className='movies-card-list-wrapper'>
          {movies && Array.isArray(movies) && movies.length > 0 ? (
            // Проверяем, что movies определена, является массивом и содержит элементы
            mode === 'all' ? (
              // Если mode равен 'all', отображаем все фильмы
              movies.slice(0, isTotalCards).map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie.id}
                    mode='all'
                    // onClickSaveMovie={onClickSaveMovie}
                    onClickMovie={onClickMovie}
                  // updateSavedMovies={updateSavedMovies}
                  // handleMovieButtonClick={handleMovieButtonClick}
                  />
                );
              })
            ) : (
              // Иначе, отображаем фильмы без среза
              movies.map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie._id}
                    // onClickSaveMovie={onClickSaveMovie}
                    onClickMovie={onClickMovie}
                  // updateSavedMovies={updateSavedMovies}
                  // handleMovieButtonClick={handleMovieButtonClick}
                  />
                );
              })
            )
          ) : (
            // Если movies не определена или не содержит элементов, возвращаем null
            null
          )}
        </ul>
      </section>
      {movies?.length > isTotalCards && mode === 'all' ? (
        // Проверяем, что movies определена и количество фильмов больше значения счетчика
        <More handleMore={handleMore} /> // Отображаем кнопку "Показать еще"
      ) : (
        <More inVisible={true} /> // Скрываем кнопку "Показать еще"
      )}
    </>
  );
};

export default MoviesCardList;
