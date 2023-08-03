import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>
        О проекте</h2>
      <ul className='about-project__description'>
        <li className='about-project__description-wrapper'>
          <h3 className='about-project__description-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__description-subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__description-wrapper'>
          <h3 className='about-project__description-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__description-subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='about-project__timeline'>
        <li className='about-project__timeline-wrapper'>
          <p className='about-project__timeline-content about-project__timeline-content_left'>1 неделя</p>
          <p className='about-project__timeline-title'>Back-end</p>
        </li>
        <li className='about-project__timeline-wrapper'>
          <p className='about-project__timeline-content about-project__timeline-content_right'>4 недели</p>
          <p className='about-project__timeline-title'>Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default AboutProject;
