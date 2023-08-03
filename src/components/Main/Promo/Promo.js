import './Promo.css';
import landImg from "../../../images/text__COLOR_landing-logo.svg"


function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <div className="promo__img-wrapper">
          <img className='promo__img' alt='Пружина' src={landImg} />
        </div>
      </div>
    </section>
  );
};

export default Promo;
