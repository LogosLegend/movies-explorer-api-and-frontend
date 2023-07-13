function AboutProject(props) {

  return(
    <>
      <section id="about-project" className="about-project">
        <h2 className="about-project__title">О проекте</h2>

        <div className="about-project-info">
          <p className="about-project-info__title">Дипломный проект включал 5 этапов</p>
          <p className="about-project-info__title">На выполнение диплома ушло 5 недель</p>
          <p className="about-project-info__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about-project-info__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>

        <div className="time-line">
          <p className="time-line__length">1 неделя</p>
          <p className="time-line__length">4 недели</p>
          <p className="time-line__info">Back-end</p>
          <p className="time-line__info">Front-end</p>
        </div>
      </section>
    </>
  );
}

export default AboutProject;