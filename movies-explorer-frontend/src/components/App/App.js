import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext.js';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer.js';
import NotFoundError from '../NotFoundError/NotFoundError.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import LimitedRouteElement from '../LimitedRoute/LimitedRoute.js';
import * as MainApi from '../../utils/MainApi.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});//Данные пользователя
  const [jwtExist, setJwtExist] = useState(true)//По умолчанию считается, что JWT существует
  const [loggedIn, setLoggedIn] = useState(false)//Выполнен ли вход
  const [success, setSuccess] = useState(true);//Успешен ли запрос на регистрацию, вход или редактирование
  const [message, setMessage] = useState('');
  const jwt = localStorage.getItem('jwt');

  const navigate = useNavigate();

  function showError(err) {
    setSuccess(false);
    err === 409 ? setMessage('Пользователь с такой электронной почтой уже зарегистрирован') : setMessage('Что-то пошло не так! Попробуйте ещё раз.')
    console.log('Error: ' + err);
  }

  function showErrorGettingData(err) {
    console.log('Error: ' + err);
  }

  useEffect(() => {

    if (jwt) {//Если JWT существует, то ProtectedRoute будет ждать пока придёт ответ от Api на подтверждение loggedIn

      MainApi.tokenCheck(jwt).then((userInfo) => {

          setLoggedIn(true)
          setCurrentUser(userInfo);

      }).catch((err) => {showErrorGettingData(err); setJwtExist(false)});

    } else {//А если JWT не существует или он некорректный, то ProtectedRoute не будет ждать и перенаправит пользователя на /signin

      setJwtExist(false);//ProtectedRoute без jwtExist сразу перебрасывает пользователя на /signin даже если по итогу окажется, что JWT у пользователя верный
    }
  }, [jwt]);

  useEffect(() => {

    if (loggedIn) {

      MainApi.getSavedMovies(jwt)
      .then((savedMovies) => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => showErrorGettingData(err));
    }
  }, [loggedIn, jwt]);

  function clearMessage() {
    setMessage('');
  }

  const handleOnClickNavigateMain = () => {navigate('/'); clearMessage()};
  const handleOnClickNavigateSignUp = () => {navigate('/signup'); clearMessage()}
  const handleOnClickNavigateSignIn = () => {navigate('/signin'); clearMessage()}
  const handleOnClickNavigateMovies = () => {navigate('/movies'); clearMessage()}
  const handleOnClickNavigateSavedMovies = () => {navigate('/saved-movies'); clearMessage()}
  const handleOnClickNavigateProfile = () => {navigate('/profile'); clearMessage()}

  function handleProfile(name, email) {
    MainApi.profile(name, email).then((userInfo) => {
      setCurrentUser(userInfo);
      setSuccess(true);
      setMessage('Данные обновлены')
    })
    .catch((err) => showError(err));
  }

  function handleRegister(name, email, password) {
    MainApi.register(name, email, password).then((res) => {
      clearMessage()
      handleLogin(email, password)
    })
    .catch((err) => showError(err));
  }

  function handleLogin(email, password) {
    MainApi.login(email, password).then((res) => {
      localStorage.setItem('jwt', res.token);
      clearMessage()
      setLoggedIn(true);
      setJwtExist(true)
      navigate('/movies')
    })
    .catch((err) => showError(err));
  }

  function handleExit() {
    MainApi.exit().then(() => {
      localStorage.clear();
      setLoggedIn(false)
      setJwtExist(false)
      navigate('/')
    })
    .catch((err) => showError(err));
  }

  function handleSavedMovieClick(intersection, setMark, movie) {

    MainApi.changeSavedMovieStatus(movie, intersection, jwt).then((newMovie) => {

    if (newMovie.message) {

      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

      const index = savedMovies.findIndex(n => n._id === intersection[0]._id);
      index !== -1 && savedMovies.splice(index, 1);

      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      setMark(false)

    } else {

      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

      savedMovies.push(newMovie);
      
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      setMark(true)
    }
    })
    .catch((err) => showErrorGettingData(err));
  }

return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header
          jwtExist={jwtExist}
          loggedIn={loggedIn}
          onClickNavigateMain={handleOnClickNavigateMain}
          onClickNavigateSignUp={handleOnClickNavigateSignUp}
          onClickNavigateSignIn={handleOnClickNavigateSignIn}
          onClickNavigateMovies={handleOnClickNavigateMovies}
          onClickNavigateSavedMovies={handleOnClickNavigateSavedMovies}
          onClickNavigateProfiles={handleOnClickNavigateProfile}
        />

        <Routes>
          <Route path="/" element={ <Main /> }/>

          <Route path="/movies" element={
            <ProtectedRouteElement
              element={Movies}
              jwtExist={jwtExist}
              loggedIn={loggedIn}
              onSavedMovie={handleSavedMovieClick}
            />}
          />
          
          <Route path="/saved-movies" element={
            <ProtectedRouteElement
              element={SavedMovies}
              jwtExist={jwtExist}
              loggedIn={loggedIn}
              onSavedMovie={handleSavedMovieClick}
            />}
          />

          <Route path="/profile" element={
            <ProtectedRouteElement
              element={Profile}
              jwtExist={jwtExist}
              loggedIn={loggedIn}
              onExit={handleExit}
              onProfile={handleProfile}
              success={success}
              message={message}
            />}
          />

          <Route path="/signup" element={
            <LimitedRouteElement
              element={Register}
              onClickNavigateSignIn={handleOnClickNavigateSignIn}
              onRegister={handleRegister}
              success={success}
              message={message}
            />}
          />

          <Route path="/signin" element={
            <LimitedRouteElement
              element={Login}
              onClickNavigateSignUp={handleOnClickNavigateSignUp}
              onLogin={handleLogin}
              success={success}
              message={message}
            />}
          />

          <Route path="/not-found" element={ <NotFoundError /> } />
          <Route path="*" element={ <Navigate to="/not-found" replace /> } />
        </Routes>

        <Footer />
    </div>
  </CurrentUserContext.Provider>

  );
}

export default App;
