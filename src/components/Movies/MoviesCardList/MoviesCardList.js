import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/arrayMovies';

function MoviesCardList({ showMore }) {


  return (
    <section className="movies-card-list">
      <ul className='movies-card-list-wrapper'>
        {movies.map((movie, i) => (
          <MoviesCard key={i} movie={movie} />
        ))}
      </ul>
      {showMore ? (
        <button className="movies-card-list__more" type="button">Ещё</button>
      ) : (
        <button className="movies-card-list__more_invisible"></button>
      )}
    </section>
  );
};

export default MoviesCardList;
