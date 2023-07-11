import { useState, useEffect } from 'react';
import { useResize } from '../../utils/WindowWidth.js'
import MoviesCard from '../MoviesCard/MoviesCard.js'

function MoviesCardList(props) {

  const [moviesVisible, setMoviesVisible] = useState([]);
  const [buttonHidden, setButtonHidden] = useState(false);
  const { movie1280, movie990, movie768, movie320 } = useResize();
  const [moviesCount, setMoviesCount] = useState({
    movie1280: 16,
    movie990: 12,
    movie768: 8,
    movie320: 5
  })

  useEffect(() => {

    const newArrayMovies = props.movies.map(e => {return {...e}});

    function count(e) {
      e >= props.movies.length ? setButtonHidden(true) : setButtonHidden(false)
    }

    if (movie1280) {

      newArrayMovies.length = moviesCount.movie1280;
      count(moviesCount.movie1280)

    } else if (movie990) {

      newArrayMovies.length = moviesCount.movie990;
      count(moviesCount.movie990)

    } else if (movie768) {

      newArrayMovies.length = moviesCount.movie768;
      count(moviesCount.movie768)

    } else if (movie320) {

      newArrayMovies.length = moviesCount.movie320;
      count(moviesCount.movie320)
    }

    setMoviesVisible(newArrayMovies)

  }, [props.movies, movie1280, movie990, movie768, movie320, moviesCount]);

  function handleMoviesCount() {
    setMoviesCount({
      movie1280: moviesCount.movie1280 + 4,
      movie990: moviesCount.movie990 + 3,
      movie768: moviesCount.movie768 + 2,
      movie320: moviesCount.movie320 + 2
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