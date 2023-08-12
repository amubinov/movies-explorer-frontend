import { useState, useContext, useEffect } from 'react';
import { CurrentSavedMoviesContext } from '../../contexts/CurrentSavedMoviesContext';
import Header from '../Header/Header';
import Preloader from '../Movies/Preloader/Preloader';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import Popup from "../Popup/Popup";
import moviesApi from '../../utils/MoviesApi';

import { searchSavedMovie } from '../../utils/searchMovie';

function SavedMovies({ onClickDeleteMovie, isLogged }) {
  const [isPreloader, setIsPreloader] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [isFiltered, setIsFiltered] = useState([]);
  const savedMovies = useContext(CurrentSavedMoviesContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [movies, setMovies] = useState([]);

  const handleCardDelete = (_id) => {
    moviesApi.deleteMovie(_id)
      .then((res) => {

        setMovies(savedMovies.filter((movie) => movie._id !== _id));

      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function renderMovies() {
    setIsPreloader(true);
    const filtered = searchSavedMovie(savedMovies);
    if (filtered.length === 0) {
      setIsRender(false);
      setIsPreloader(false);
      setIsPopupOpen(true);
      setPopupMessage("Ничего не найдено");
    }
    else {
      setIsRender(true);
      setIsPreloader(false);
      setIsFiltered(filtered);
    }
  };

  function onSubmitSearchMovies(searchText, shortSavedMoviesTumbler) {
    localStorage.setItem('savedMovieSearchText', searchText);
    localStorage.setItem('shortSavedMoviesTumbler', shortSavedMoviesTumbler);
    renderMovies();
  };

  function onClickShortMovie(shortSavedMoviesTumbler) {
    localStorage.setItem('shortSavedMoviesTumbler', shortSavedMoviesTumbler);
    renderMovies();
  };

  useEffect(() => {
    setIsPreloader(true);
    renderMovies();
  }, [savedMovies]);


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
        {isPreloader ? <Preloader /> :
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


