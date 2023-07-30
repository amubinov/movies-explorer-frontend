import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className='footer__nav'>
        <p className='footer__copyright'> © {new Date().getFullYear()}</p>
        <ul className='footer__list'>
          <li>
            <a
              className='footer__link'
              target='_blank'
              href='https://practicum.yandex.ru/'
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className='footer__link'
              target='_blank'
              href='https://github.com/amubinov/'
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
