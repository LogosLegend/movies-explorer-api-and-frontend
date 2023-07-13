function Techs(props) {

  return(
      <section id="tech" className="tech">
        <h2 className="tech__title">Технологии</h2>

        <p className="tech__subtitle">7 технологий</p>
        <p className="tech__info">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

        <ul className="table-tech">
          <li className="table-tech__cell">HTML</li>
          <li className="table-tech__cell">CSS</li>
          <li className="table-tech__cell">JS</li>
          <li className="table-tech__cell">React</li>
          <li className="table-tech__cell">Git</li>
          <li className="table-tech__cell">Express.js</li>
          <li className="table-tech__cell">mongoDB</li>
        </ul>
      </section>
  );
}

export default Techs;