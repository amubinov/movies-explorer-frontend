import { shortFilms } from './config';

export const searchMovie = () => {
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const searchText = localStorage.getItem('searchText').toLowerCase();
  const shortFilmsTumbler = localStorage.getItem('shortFilmsTumbler');

  const filtered = allMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0);
  if (shortFilmsTumbler === 'true') return filtered.filter((movie) => movie.duration < shortFilms);
  else return filtered;
};
export const searchSavedMovie = (movies) => {
  // console.log("Searching saved movies:", movies);
  if (!movies || !Array.isArray(movies)) {
    return []; // Возвращаем пустой массив, если movies не определена или не является массивом
  }

  const shortSavedMoviesTumbler = localStorage.getItem('shortSavedMoviesTumbler');
  const savedMovieSearchText = localStorage.getItem('savedMovieSearchText').toLowerCase();

  let filtered = movies.filter((movie) => movie.nameRU.toLowerCase().indexOf(savedMovieSearchText) >= 0);
  if (shortSavedMoviesTumbler === 'true') {
    filtered = filtered.filter((movie) => movie.duration < shortFilms);
  }

  if (filtered.length === 0) {
    return movies; // Возвращаем весь список фильмов, если фильтр не дал результатов
  }
  console.log("Filtered movies:", filtered);
  return filtered;
};
