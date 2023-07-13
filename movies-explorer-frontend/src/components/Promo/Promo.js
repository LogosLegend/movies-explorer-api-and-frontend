import Banner from '../../images/promoLogo.svg';

function Promo(props) {

  return(
      <section className="promo">
        <img className="promo__logo" src={Banner} alt="Логотип баннера" />
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      </section>
  );
}

export default Promo;