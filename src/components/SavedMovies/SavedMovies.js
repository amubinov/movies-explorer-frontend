import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import movies from '../../utils/arrayMovies';
import Footer from '../Footer/Footer';

function SavedMovies(isLogged) {
  const [savedMovies, setSavedMovies] = useState(movies.filter((movie) => movie.saved));
  const isPreloader = false;
  const showMore = false;

  return (
    <>
      <header>
        <Header isLogged={isLogged} />
      </header>
      <main>
        <SearchForm />
        {isPreloader ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList
              movies={savedMovies}
              showMore={showMore}
            />
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default SavedMovies;
