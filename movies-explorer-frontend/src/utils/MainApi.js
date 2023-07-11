import { BASE_URL } from './constants.js';

  function checkResult(res) {
  
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status)
  }

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  }).then((res) => checkResult(res))
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then((res) => checkResult(res))
};

export const profile = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  }).then((res) => checkResult(res))
};

export const getSavedMovies = (jwt) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: "include",
    headers: {
      authorization: jwt
    }
  }).then((res) => checkResult(res))
};

export const tokenCheck = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
  }).then((res) => checkResult(res))
};

export const exit = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include'
  }).then((res) => checkResult(res))
};

export const changeSavedMovieStatus = (movie, intersection, jwt) => {
  return !(intersection.length > 0) ? savedMovie(movie, jwt) : unSavedMovie(intersection[0], jwt);
}

export const savedMovie = ({country, director, duration, year, description, image, trailerLink, id, nameRU, nameEN}, jwt) => {

  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: jwt
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: 'https://api.nomoreparties.co' + image.url,
      trailerLink: trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + image.formats.thumbnail.url,
      movieId: id,
      nameRU: nameRU,
      nameEN: nameEN
    })
  })
    .then((res) => checkResult(res))
}

export const unSavedMovie = ({_id}, jwt) => {
  return fetch(`${BASE_URL}/movies/${_id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: {
      authorization: jwt
    },
  })
    .then((res) => checkResult(res))
}