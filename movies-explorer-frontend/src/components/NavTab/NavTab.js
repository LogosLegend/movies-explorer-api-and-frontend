function NavTab(props) {

  return(
      <nav className="navigation">
        <ul className="table">
          <li className="table__cell"><a className="table__link button-hovered" href="#about-project">О проекте</a></li>
          <li className="table__cell"><a className="table__link button-hovered" href="#tech">Технологии</a></li>
          <li className="table__cell"><a className="table__link button-hovered" href="#about-me">Студент</a></li>
        </ul>
      </nav>
  );
}

export default NavTab;