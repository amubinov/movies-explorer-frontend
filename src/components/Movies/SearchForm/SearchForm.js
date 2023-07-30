import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__container'>
          <input className='search__input' type='text' placeholder='Фильм' required />
          <button className='search__button' type='submit'></button>
        </div>
        <div className='search__checkbox-wrapper'>
          <label className='search__label-wrapper'>
            <input className='search__checkbox-default' type='checkbox' />
            <span className='search__checkbox-custom'></span>
          </label>
          <span className="search__checkbox-label">Короткометражки</span>
        </div>
      </form>
    </section>
  );
};


export default SearchForm;
