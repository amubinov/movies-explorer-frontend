import { useEffect, useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSubmitSearchMovies, onClickShortMovie, mode }) {

  const [isValue, setIsValue] = useState('');
  const [isShortsTumbler, setIsShortsTumbler] = useState(false);
  const [isValidationError, setIsValidationError] = useState('');
  const [isValid, setIsValid] = useState(true);

  function onChange(evt) {
    setIsValidationError(evt.target.validationMessage);
    setIsValue(evt.target.value);
    setIsValid(evt.target.closest("form").checkValidity());
  };

  function onSubmitSearch(evt) {
    evt.preventDefault();
    if (!isValid) return;
    onSubmitSearchMovies(isValue, isShortsTumbler);
    setIsValid(false);
  };

  function onChangeShortTumbler() {
    onClickShortMovie(!isShortsTumbler);
    setIsShortsTumbler(!isShortsTumbler);
  };

  useEffect(() => {
    if (mode === 'all') {
      const searchText = localStorage.getItem('searchText');
      const shortFilmsTumbler = localStorage.getItem('shortFilmsTumbler');
      if (searchText && shortFilmsTumbler) {
        setIsValue(searchText);
        shortFilmsTumbler === 'true' ? setIsShortsTumbler(true) : setIsShortsTumbler(false);
      }
    } else {
      localStorage.setItem('savedMovieSearchText', '');
      localStorage.setItem('shortSavedMoviesTumbler', 'false');
      setIsShortsTumbler(false);
    }
  }, [mode]);


  return (
    <section className='search'>
      <form
        className={`search__form ${isValidationError && 'search__form-error'}`}
        onSubmit={onSubmitSearch}
        noValidate>
        <div className='search__container'>
          <input
            className='search__input'
            type='text'
            placeholder='Фильм'
            required
            value={isValue}
            onChange={onChange} />
          <button
            className={`search__button ${isValid ? "search__button" : "search__button search__button_disabled"}`}
            onClick={onSubmitSearch}
            type='submit'></button>
        </div>
        <div className='search__checkbox-wrapper'>
          <label className='search__label-wrapper'>
            <input
              className='search__checkbox-default'
              checked={isShortsTumbler ? true : false}
              type='checkbox'
              value='shortMovieSwitch'
              onChange={onChangeShortTumbler}
            />
            <span className='search__checkbox-custom'></span>
          </label>
          <span className="search__checkbox-label">Короткометражки</span>
        </div>
      </form>
      {!isValid && <p className="search__error-title">Нужно ввести ключевое слово</p>}
    </section>
  );
};


export default SearchForm;
