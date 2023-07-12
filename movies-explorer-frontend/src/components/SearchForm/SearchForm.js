import { useInput } from '../../utils/FormValidation.js';
import { useState, useEffect } from 'react';
import Find from '../../images/find.svg';
import { getContent } from '../../utils/MoviesApi.js';

function SearchForm(props) {

  const currentPath = window.location.pathname;

  function whichPath() {
    return currentPath === '/movies';
  }

  const search = useInput((whichPath() ? localStorage.getItem('searchText') : '') ?? '', {empty: true})

  const [shortMoviesValue, setShortMoviesValue] = useState(whichPath() ? localStorage.getItem('shortMovies') === 'true' : false);//Состояние чекбокса короткометражек

  useEffect(() => {

    whichPath() ? (localStorage.getItem('searchText') && doSearch(shortMoviesValue)) : withoutSearch();
  }, []);

  function handleButtonDisabled() {
    return search.inputValid;
  }

  function showError(err) {
    props.setError(true);
    props.isLoading(false);
    console.log('Error: ' + err);
  }

  function withoutSearch() {
    const movies = JSON.parse(localStorage.getItem('savedMovies'));

    if (movies !== null) {

      props.onMoviesSearch(movies);
      props.onSearchCompleted();
    }
  }

  function doSearch(value) {
    props.setError(false);
    props.isLoading(true);

    whichPath() && localStorage.setItem('searchText', search.value);

    function arrFilter() {
      const movies = JSON.parse(localStorage.getItem(whichPath() ? 'movies' : 'savedMovies'));

      const moviesSearch = movies.filter(movie => movie.nameRU.toLowerCase().indexOf(search.value.toLowerCase()) >= 0 && (value ? movie.duration <= 40 : true ));
      props.onMoviesSearch(moviesSearch);

      moviesSearch.length === 0 && props.setError(0)
      props.isLoading(false)
    }

    if (localStorage.getItem('movies') !== null) {

      arrFilter();

    } else {

      getContent().then((movies) => {
        props.setError(false)
        localStorage.setItem('movies', JSON.stringify(movies));

        arrFilter();
      })
      .catch((err) => showError(err));
    }
    props.onSearchCompleted();
  }

  function handleSubmit(e) {
    e.preventDefault();
    doSearch(shortMoviesValue);
  }

  function handleChangeChecked(e) {
    setShortMoviesValue(e.target.checked);
    whichPath() && localStorage.setItem('shortMovies', e.target.checked);
    localStorage.getItem('searchText') && doSearch(e.target.checked);
  }

  return(
      <div className="search">
        <form onSubmit={handleSubmit} className="search__form"> 
          <input className="search__input" name="search" required placeholder="Фильм" type="text" autoComplete="off"  value={search.value} onChange={search.handleChange} onBlur={search.handleDirty}/>

          <button type="submit" className={`search__button-submit button-hovered ${handleButtonDisabled() ? `` : `search__button-submit_disable`}`} disabled={handleButtonDisabled() ? `` : true}>
            <img src={Find} alt="Найти" />
          </button>
        </form>
        <span className={`error search__span-error ${(search.empty && search.isDirty) ? `visible` : ``}`}>Нужно ввести ключевое слово</span>

        <div className="selectbox">
          <label className="selectbox__switch" htmlFor="selectbox__input">
            <input id="selectbox__input" className="selectbox__input" type="checkbox" checked={shortMoviesValue} onChange={handleChangeChecked}/>
            <span className="selectbox__round"></span>
          </label>
          <p className="selectbox__subtitle">Короткометражки</p>
        </div>
      </div>
  );
}

export default SearchForm;
