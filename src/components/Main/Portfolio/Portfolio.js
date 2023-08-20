import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__link-wrapper'>
          <a
            className='portfolio__link'
            target='_blank'
            href='https://github.com/amubinov/how-to-learn'
            rel="noreferrer"
          >
            <p className='portfolio__link-title'>Статичный сайт</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__link-wrapper'>
          <a
            className='portfolio__link'
            target='_blank'
            href='https://github.com/amubinov/russian-travel.git/'
            rel="noreferrer"
          >
            <p className='portfolio__link-title'>Адаптивный сайт</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__link-wrapper'>
          <a
            className='portfolio__link'
            target='_blank'
            href='https://github.com/amubinov/react-mesto-auth.git/'
            rel="noreferrer"
          >
            <p className='portfolio__link-title'>Одностраничное приложение</p>
            <p className='portfolio__link-arrow'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
