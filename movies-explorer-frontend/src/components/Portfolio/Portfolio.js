function Portfolio(props) {

  return(
      <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>

        <div className="portfolio__container">
          <a target="_blank" rel="noopener noreferrer" className="portfolio__link button-hovered" href="https://logoslegend.github.io/russian-travel/">Статичный сайт</a>
          <a target="_blank" rel="noopener noreferrer" className="portfolio__link button-hovered" href="https://logoslegend.github.io/russian-travel/">↗</a>
        </div>
        <div className="portfolio__container">
          <a target="_blank" rel="noopener noreferrer" className="portfolio__link button-hovered" href="https://logoslegend.github.io/mesto/">Адаптивный сайт</a>
          <a target="_blank" rel="noopener noreferrer" className="portfolio__link button-hovered" href="https://logoslegend.github.io/mesto/">↗</a>
        </div>
        <div className="portfolio__container">
          <a target="_blank" rel="noopener noreferrer" className="portfolio__link button-hovered" href="https://logos.nomoredomains.rocks/">Одностраничное приложение</a>
          <a target="_blank" rel="noopener noreferrer" className="portfolio__link button-hovered" href="https://logos.nomoredomains.rocks/">↗</a>
        </div>
      </section>
  );
}

export default Portfolio;