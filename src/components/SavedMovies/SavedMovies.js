import { useState, useContext, useEffect } from 'react';
import { CurrentSavedMoviesContext } from '../../contexts/CurrentSavedMoviesContext';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import Popup from "../Popup/Popup";
import moviesApi from '../../utils/MoviesApi';

import { searchSavedMovie } from '../../utils/searchMovie';

function SavedMovies({ isLogged }) {
  const [isPreloader, setIsPreloader] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [isFiltered, setIsFiltered] = useState([]);
  const savedMovies = useContext(CurrentSavedMoviesContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  function renderMovies() {
    console.log("Searching saved movies before filtering:", savedMovies);
    const uniqueSavedMovies = savedMovies.reduce((acc, currentMovie) => {
      if (!acc.some((movie) => movie.movieId === currentMovie.movieId)) {
        acc.push(currentMovie);
      }
      return acc;
    }, []);
    setIsPreloader(true);
    const filtered = searchSavedMovie(uniqueSavedMovies);
    console.log("Filtered movies:", filtered);
    if (filtered.length === 0) {
      setIsRender(false);
      setIsPreloader(false);
      setIsPopupOpen(true);
      setPopupMessage("Ничего не найдено");
    } else {
      setIsRender(true);
      setIsPreloader(false);
      setIsFiltered(filtered);
      localStorage.setItem('filteredMovies', JSON.stringify(filtered)); // Сохранение в локальное хранилище
    }
  }

  function onSubmitSearchMovies(searchText, shortSavedMoviesTumbler) {
    localStorage.setItem('savedMovieSearchText', searchText);
    localStorage.setItem('shortSavedMoviesTumbler', shortSavedMoviesTumbler);
    renderMovies();
  }

  function onClickShortMovie(shortSavedMoviesTumbler) {
    localStorage.setItem('shortSavedMoviesTumbler', shortSavedMoviesTumbler);
    renderMovies();
  };


  useEffect(() => {
    setIsPreloader(true);
    renderMovies();
  }, [savedMovies]);

  // console.log("isFiltered:", isFiltered);

  const handleCardDelete = (_id) => {
    moviesApi.deleteMovie(_id).then((result) => {
      if (result.message === 'Фильм удален') {
        setIsFiltered(prevFiltered => prevFiltered.filter((movie) => movie._id !== _id));
      }
    }).catch((error) => {
      console.log(`Ошибка при удалении фильма с _id ${_id}`, error);
    });
  }

  const closePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }


  return (
    <>
      <Header isLogged={isLogged} />
      <main>
        <SearchForm
          mode={'save'}
          onSubmitSearchMovies={onSubmitSearchMovies}
          onClickShortMovie={onClickShortMovie}
        />
        {
          isPreloader ? <Preloader /> :
            isRender ?
              <MoviesCardList
                movies={isFiltered}
                mode={'save'}
                onClickMovie={handleCardDelete}
              /> :
              isPopupOpen && <Popup
                isOpen={isPopupOpen}
                popupMessage={popupMessage}
                onClick={closePopup}
              />
        }
      </main>
      <Footer />

    </>
  );
};

export default SavedMovies;


