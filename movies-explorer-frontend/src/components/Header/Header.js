import { useState } from 'react';
import Logo from '../../images/logo.svg';
import { Route, Routes } from "react-router-dom";
import Navigation from '../Navigation/Navigation.js'

function Header(props) {

  const currentPath = window.location.pathname;

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function handleOpenBurgerClick () {
    setIsBurgerOpen(true)
  }

  function handleCloseBurgerClick () {
    setIsBurgerOpen(false)
  }

  function closeBurger (event) {

    if (event.target.closest('.button-close') || !event.target.closest('[class*="container"]')) {
      handleCloseBurgerClick();
    }
  }

  function authHeader(jwtExist, loginIn) {

    if (jwtExist) {

      if (loginIn) {
        return(
          <header className={`header ${currentPath === '/' ? `` : `header-movies`}`}>
            <Navigation
              isOpen={isBurgerOpen}
              onOpenBurger={handleOpenBurgerClick}
              onCloseBurger={handleCloseBurgerClick}
              onClickCloseBurger={closeBurger}
              onClickNavigateMain={props.onClickNavigateMain}
              onClickNavigateMovies={props.onClickNavigateMovies}
              onClickNavigateSavedMovies={props.onClickNavigateSavedMovies}
              onClickNavigateProfiles={props.onClickNavigateProfiles}
              currentPath={currentPath}
            />
          </header>
        )
      }

    } else {

      return (
        <header className="header">
          <button className="header__logo-link button-without-styles" onClick={props.onClickNavigateMain}>
            <img className="header__logo button-hovered" src={Logo} alt="Логотип" />
          </button>

          <div className="header__container">
            <button className="header__auth button-without-styles header__reg button-hovered" onClick={props.onClickNavigateSignUp}>Регистрация</button>
            <button className="header__auth button-without-styles header__in button-hovered" onClick={props.onClickNavigateSignIn}>Войти</button>
          </div>
        </header>
      )

    }
  }

  return(
    
      <Routes>
        <Route path="/" element={
        	authHeader(props.jwtExist, props.loggedIn)
        } />

        <Route path="/signin" element={
          <header className="header header-movies header-login">
            <button className="header__logo-link button-without-styles" onClick={props.onClickNavigateMain}>
              <img className="button-hovered" src={Logo} alt="Логотип" />
            </button>
          </header>
        } />

        <Route path="/signup" element={
          <header className="header header-movies header-login">
            <button className="header__logo-link button-without-styles" onClick={props.onClickNavigateMain}>
              <img className="button-hovered" src={Logo} alt="Логотип" />
            </button>
          </header>
        } />

        <Route path="/not-found" element={<></>} />

        <Route path="*" element={
          authHeader(props.jwtExist, props.loggedIn)
        } />

      </Routes>
    
  );
}

export default Header;