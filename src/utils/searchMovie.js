import { shortFilms } from './config';

export const searchMovie = () => {
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const searchText = localStorage.getItem('searchText').toLowerCase();
  const shortFilmsTumbler = localStorage.getItem('shortFilmsTumbler');

  const filtered = allMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0);
  if (shortFilmsTumbler === 'true') return filtered.filter((movie) => movie.duration < shortFilms);
  else return filtered;
};

export const searchSavedMovie = (movie) => {
  if (!movie || !Array.isArray(movie)) {
    return []; // Возвращаем пустой массив, если movie не определена или не является массивом
  }

  const shortSavedMoviesTumbler = localStorage.getItem('shortSavedMoviesTumbler');
  const savedMovieSearchText = localStorage.getItem('savedMovieSearchText').toLowerCase();

  const filtered = movie.filter((movie) => movie.nameRU.toLowerCase().indexOf(savedMovieSearchText) >= 0);
  if (shortSavedMoviesTumbler === 'true') {
    return filtered.filter((movie) => movie.duration < shortFilms);
  } else {
    return filtered;
  }
};
