import { useState, useEffect } from 'react';
import { useResize } from '../../utils/WindowWidth.js'
import MoviesCard from '../MoviesCard/MoviesCard.js'
import { NUMBER_OF_MOVIES } from '../../utils/constants.js'

function MoviesCardList(props) {

  const [moviesVisible, setMoviesVisible] = useState([]);
  const [buttonHidden, setButtonHidden] = useState(false);
  const { movie1280, movie990, movie768, movie320 } = useResize();
  const [moviesCount, setMoviesCount] = useState(NUMBER_OF_MOVIES)

  useEffect(() => {

    const newArrayMovies = props.movies.map(e => {return {...e}});

    function count(e) {
      e >= props.movies.length ? setButtonHidden(true) : setButtonHidden(false)
    }

    if (movie1280) {

      newArrayMovies.length = moviesCount.Screen1280px;
      count(moviesCount.Screen1280px)

    } else if (movie990) {

      newArrayMovies.length = moviesCount.Screen990px;
      count(moviesCount.Screen990px)

    } else if (movie768) {

      newArrayMovies.length = moviesCount.Screen768px;
      count(moviesCount.Screen768px)

    } else if (movie320) {

      newArrayMovies.length = moviesCount.Screen320px;
      count(moviesCount.Screen320px)
    }

    setMoviesVisible(newArrayMovies)

  }, [props.movies, movie1280, movie990, movie768, movie320, moviesCount]);

  function handleMoviesCount() {
    setMoviesCount({
      Screen1280px: moviesCount.Screen1280px + 4,
      Screen990px: moviesCount.Screen990px + 3,
      Screen768px: moviesCount.Screen768px + 2,
      Screen320px: moviesCount.Screen320px + 2
    })
  }

  return(
    <section className="gallery">
      <div className="gallery__container">

      	{moviesVisible.map((movie) => (
          <MoviesCard
          	key={movie._id}
          	movie={movie}
          	duration={movie.duration}
          	nameRU={movie.nameRU}
          	image={movie.image}
            trailerLink={movie.trailerLink}
            onSavedMovie={props.onSavedMovie}
          />
        ))}

      </div>
      <button className={`gallery__more-button button-hovered ${buttonHidden ? `hidden` : `` }`} onClick={handleMoviesCount}>Ещё</button>

    </section>
  );
}

export default MoviesCardList;
