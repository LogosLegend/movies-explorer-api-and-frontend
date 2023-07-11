import { useState, useEffect } from 'react';
import '../../utils/constants.js';

function MoviesCardList(props) {

  const currentPath = window.location.pathname;

  function whichPath() {
    return currentPath === '/movies';
  }

  const [mark, setMark] = useState(false)
  const [deleteMovie, setDeleteMovie] = useState(true)
  const [intersection, setIntersection] = useState([])

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const filter = savedMovies.filter(savedMovie => savedMovie.movieId === props.movie.id);
    setIntersection(filter);
    setMark(filter.length > 0);
  }, [props.movie, mark, deleteMovie]);

  function handleSavedMovie(e) {
    whichPath() ? props.onSavedMovie(intersection, setMark, props.movie) : props.onSavedMovie([props.movie], setDeleteMovie)
  }

  const movieSaveButtonClassName = (`${whichPath() ? `gallery__saved-button` : `gallery__delete-button`} button-hovered ${mark ? `gallery__saved-button_type_active` : ``}`);
  function render() {
    return (
      <div className="gallery__film">
        <a target="_blank" rel="noopener noreferrer" href={props.trailerLink}>
          <img className="gallery__img" src={whichPath() ? 'https://api.nomoreparties.co' + props.image.url : props.image} alt={props.nameRU} />
        </a>
  
        <div className="gallery__description">
  
          <div className="gallery__info">
            <h2 className="gallery__title">{props.nameRU}</h2>
            <p className="gallery__duration">{Math.trunc(props.duration / 60) + 'ч' + props.duration % 60 + 'м'}</p>
          </div>
  
          <button className={movieSaveButtonClassName} type="button" onClick={handleSavedMovie}></button>
        </div>
      </div>
      )
  }


  return(
    <>
      {deleteMovie && render()}
    </>
  );
}

export default MoviesCardList;