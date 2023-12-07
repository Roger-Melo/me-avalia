import { useEffect, useState } from 'react'
import { StarRating } from './components/star-rating'
import { History } from './components/history'
import { NavBar } from './components/nav-bar'
import { Movies } from './components/movies'
import { WatchedMovies } from './components/watched-movies'
import { useWatchedMovies } from './hooks/use-watched-movies'
import { getMoviePoster } from './utils/get-movie-poster'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

const ListBox = ({ children }) => <div className="box">{children}</div>

const MovieDetails = ({ clickedMovie, onClickBtnBack, onSubmitRating }) => {
  const [rating, setRating] = useState(0)

  const handleRating = userRating => setRating(userRating)

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClickBtnBack}>&larr;</button>
        <img src={getMoviePoster(clickedMovie.poster)} alt={`Poster de ${clickedMovie.title}`} />
        <div className="details-overview">
          <h2>{clickedMovie.title}</h2>
          <p>{clickedMovie.released} &bull; {clickedMovie.runtime}</p>
          <p>{clickedMovie.genre}</p>
          <p><span>⭐️</span>{clickedMovie.imdbRating} IMDb rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={26} color="#FCC419" onRating={handleRating} />
          <button className="btn-add" onClick={() => onSubmitRating(rating)}>
            + Adicionar à lista
          </button>
        </div>
        <p><em>{clickedMovie.plot}</em></p>
        <p>Elenco: {clickedMovie.actors}</p>
        <p>Direção: {clickedMovie.director}</p>
      </section>
    </div>
  )
}

const useClickedMovie = setWatchedMovies => {
  const [clickedMovie, setClickedMovie] = useState(null)

  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickMovie = currentClickedMovie => {
    const prevClickedMovie = clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    fetch(`${baseUrl}&i=${currentClickedMovie.id}`)
      .then(r => r.json())
      .then(movie => setClickedMovie({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        imdbRating: movie.imdbRating,
        runtime: movie.Runtime,
        poster: movie.Poster,
        plot: movie.Plot,
        actors: movie.Actors,
        director: movie.Director,
        released: movie.Released,
        genre: movie.Genre
      }))
      .catch(error => alert(error.message))
  }

  const handleSubmitRating = userRating => {
    setWatchedMovies(prev => {
      const duplicatedMovie = prev.some(movie => movie.id === clickedMovie.id)
      return duplicatedMovie
        ? prev.map(m => m.id === clickedMovie.id ? { ...clickedMovie, userRating } : m)
        : [...prev, { ...clickedMovie, userRating }]
    })
    setClickedMovie(null)
  }

  return { clickedMovie, handleClickBtnBack, handleClickMovie, handleSubmitRating }
}

const Main = ({ movies }) => {
  const { watchedMovies, setWatchedMovies, handleClickBtnDelete } = useWatchedMovies()
  const {
    clickedMovie,
    handleClickBtnBack,
    handleClickMovie,
    handleSubmitRating
  } = useClickedMovie(setWatchedMovies)

  return (
    <main className="main">
      <ListBox>
        <Movies movies={movies} onClickMovie={handleClickMovie} />
      </ListBox>
      <ListBox>
        {clickedMovie
          ? (
            <MovieDetails
              clickedMovie={clickedMovie}
              onClickBtnBack={handleClickBtnBack}
              onSubmitRating={handleSubmitRating}
            />
          )
          : (
            <>
              <History watchedMovies={watchedMovies} />
              {watchedMovies.length > 0 && (
                <WatchedMovies
                  watchedMovies={watchedMovies}
                  onClickBtnDelete={handleClickBtnDelete}
                />
              )}
            </>
          )
        }
      </ListBox>
    </main>
  )
}

const App = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}&s=jurassic+park`)
      .then(r => r.json())
      .then(data => setMovies(data.Search.map(movie =>
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))))
      .catch(error => alert(error.message))
  }, [])

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    fetch(`${baseUrl}&s=${searchMovie.value}`)
      .then(r => r.json())
      .then(data => setMovies(data.Search.map(movie =>
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))))
      .catch(error => alert(error.message))
  }

  return (
    <>
      <NavBar movies={movies} onSearchMovie={handleSearchMovie} />
      <Main movies={movies} />
    </>
  )
}

export { App }