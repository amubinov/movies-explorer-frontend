import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import movies from '../../utils/arrayMovies';
import Footer from '../Footer/Footer';

function Movies(isLogged) {
  const [showMore, setShowMore] = useState(true);

  const isPreloader = false;

  return (
    <>
      <Header isLogged={isLogged} />
      <SearchForm />
      {isPreloader ? <Preloader /> :
        <>
          <MoviesCardList movies={movies} showMore={showMore}
            setShowMore={setShowMore} />
        </>
      }
      <Footer />

    </>
  );
};

export default Movies;

