import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {

  const back = useNavigate();

  function handleBack() {
    back(-1);
  };

  return (
    <section className='page-not-found'>
      <h1 className='page-not-found__title'>404</h1>
      <p className='page-not-found__description'>Страница не найдена</p>
      <button className='page-not-found__link' onClick={handleBack} type='button'>Назад</button>
    </section>
  );
};

export default PageNotFound;
