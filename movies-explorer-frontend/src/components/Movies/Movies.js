import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import Preloader from '../Preloader/Preloader.js'
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'

function Movies(props) {

  const [searchCompleted, setSearchCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviesSearch, setMoviesSearch] = useState(null);

  function handleSearchCompleted() {
  	setSearchCompleted(true);
  }

   function handleLoading(e) {
  	setIsLoading(e);
  }

  function handleMoviesSearch(e) {
  	setMoviesSearch(e);
  }

  function mainError() {
    if (error) {

      return 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

    } else if (error === 0) {

      return 'Ничего не найдено';
    }
  }

  return (
    <main className="content">

      <SearchForm movies={props.movies} setError={setError} isLoading={handleLoading} onSearchCompleted={handleSearchCompleted} onMoviesSearch={handleMoviesSearch} />
      {isLoading && <Preloader />}
      <p className="error main-error">{mainError()}</p>
      {(searchCompleted && moviesSearch !== null) && <MoviesCardList movies={moviesSearch} onSavedMovie={props.onSavedMovie} />}

    </main>
  );
}

export default Movies;