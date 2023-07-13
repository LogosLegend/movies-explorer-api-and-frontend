import Avatar from '../../images/avatar.png';

function AboutMe(props) {

  return(
    <>
      <section id="about-me" className="about-me">
        <h2 className="about-me__title">Студент</h2>

        <div className="about-me-info">
          <p className="about-me-info__title">Виталий</p>
          <p className="about-me-info__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me-info__info">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a target="_blank" rel="noopener noreferrer" className="about-me-info__git button-hovered" href="https://github.com/LogosLegend">Github</a>
        </div>

        <img className="about-me__img" src={Avatar} alt="Аватар" />
      </section>
    </>
  );
}

export default AboutMe;