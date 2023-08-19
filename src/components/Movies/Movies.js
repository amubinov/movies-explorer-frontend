
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { searchMovie } from '../../utils/searchMovie';
import moviesApi from '../../utils/MoviesApi';
import Footer from '../Footer/Footer';
import Popup from "../Popup/Popup";

function Movies({ onClickSaveMovie, isLogged }) {

  const [isPreloader, setIsPreloader] = useState(false);
  const [isFiltered, setIsFiltered] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  function renderMovies() {
    setIsPreloader(false);
    const filtered = searchMovie();
    if (filtered.length === 0) {
      setIsRender(false);
      setIsPopupOpen(true);
      setPopupMessage("Ничего не найдено");
    }
    else {
      setIsFiltered(filtered);
      setIsRender(true);
    }
  };

  function onSubmitSearchMovies(searchText, shortFilmsTumbler) {
    setIsPreloader(true);
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('shortFilmsTumbler', shortFilmsTumbler);
    if (!localStorage.getItem('allMovies')) {
      moviesApi.getInitialMovies()
        .then((result) => {
          localStorage.setItem('allMovies', JSON.stringify(result));
          renderMovies();
        })
        .catch(() => {
          setIsPreloader(false);
        });
    } else renderMovies();
  };

  function onClickShortMovie(shortFilmsTumbler) {
    localStorage.setItem('shortFilmsTumbler', shortFilmsTumbler);
    if (localStorage.getItem('allMovies')) renderMovies();
  };

  useEffect(() => {
    if (localStorage.getItem('allMovies')) {
      setIsPreloader(true);
      setIsRender(true);
      renderMovies();
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  return (
    <>
      <Header isLogged={isLogged} />
      <main>
        <SearchForm
          mode={'all'}
          onSubmitSearchMovies={onSubmitSearchMovies}
          onClickShortMovie={onClickShortMovie}
        />
        {isPreloader ? <Preloader /> :
          isRender
            ?
            <MoviesCardList
              movies={isFiltered}
              mode={'all'}
              onClickMovie={onClickSaveMovie}
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

export default Movies;
