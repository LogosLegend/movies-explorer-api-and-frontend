import Logo from '../../images/logo.svg';
import Profile from '../../images/profile.svg';

function Navigation(props) {

  return (
  <>
    <div className="header__logo-container">
      <button className="header__logo-link button-without-styles" onClick={props.onClickNavigateMain}>
        <img className="button-hovered" src={Logo} alt="Логотип" />
      </button>
      <button className="header__auth button-without-styles header__films button-hovered" onClick={props.onClickNavigateMovies}>Фильмы</button>
      <button className="header__auth button-without-styles header__saved-films button-hovered" onClick={props.onClickNavigateSavedMovies}>Сохранённые фильмы</button>
    </div>

    <div className="header__container">
      <button className="header__auth button-without-styles header__account button-hovered" onClick={props.onClickNavigateProfiles}>Аккаунт<img className="header__account-img" src={Profile} alt="Логотип" /></button>
      <button className="header__burger-button button-hovered" onClick={props.onOpenBurger}></button>
    </div>

    <div className={`burger-menu ${props.isOpen ? `burger-menu_opened` : ''}`} onClick={props.onClickCloseBurger}>
      <div className={`burger-menu__container ${props.currentPath === '/' ? `` : `burger-menu__movies`} ${props.isOpen ? `burger-menu__container_opened` : ''}`}>
        <button className="button-close button-hovered"></button>

        <div className="burger-menu__links">
          <button className={`burger-menu__link button-without-styles button-hovered ${props.currentPath === '/' ? `burger-menu__link_type_active` : ``}`} onClick={props.onClickNavigateMain}>Главная</button>
          <button className={`burger-menu__link button-without-styles button-hovered ${props.currentPath === '/movies' ? `burger-menu__link_type_active` : ``}`} onClick={() => {props.onClickNavigateMovies(); props.onCloseBurger();}}>Фильмы</button>
          <button className={`burger-menu__link button-without-styles button-hovered ${props.currentPath === '/saved-movies' ? `burger-menu__link_type_active` : ``}`} onClick={() => {props.onClickNavigateSavedMovies(); props.onCloseBurger();}}>Сохранённые фильмы</button>
        </div>

        <div className="burger-menu__profile">
          <button className="header__auth header__account button-without-styles block-visible button-hovered" onClick={() => {props.onClickNavigateProfiles(); props.onCloseBurger();}}>
            Аккаунт<img className="header__account-img" src={Profile} alt="Логотип" />
          </button>
        </div>
      </div>
    </div>
  </>
  );
}

export default Navigation;