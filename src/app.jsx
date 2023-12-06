import localforage from 'localforage'
import { useEffect, useState, useRef } from 'react'
import { StarRating } from './components/star-rating'

const getTotalMinutes = watchedMovies => watchedMovies
  .reduce((acc, item) => acc + (item.runtime === 'N/A' ? 0 : +item.runtime.split(' ')[0]), 0)

const getMoviePoster = src => src === 'N/A' ? '404-img.jpg' : src

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

const NavBar = ({ movies, onSearchMovie }) => {
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current.elements.searchMovie.value.length > 0) {
      formRef.current.reset()
    }
  }, [movies])

  return (
    <nav className="nav-bar">
      <img className="logo" src="logo-me-avalia.png" alt="Me avalia" />
      <form ref={formRef} onSubmit={onSearchMovie} className="form-search">
        <input
          name="searchMovie"
          className="search"
          type="text"
          placeholder="Buscar filmes..."
          autoFocus
        />
        <button className="btn-search">Buscar</button>
      </form>
      <p className="num-results"><strong>{movies.length}</strong> Resultados</p>
    </nav>
  )
}

const ListBox = ({ children }) => <div className="box">{children}</div>

const History = ({ watchedMovies }) => (
  <div className="history">
    <h2>Histórico</h2>
    <div>
      <p>
        <span>#️⃣</span>{' '}
        <span>{watchedMovies.length} Filmes</span>
      </p>
      <p>
        <span>⏳</span>{' '}
        <span>{getTotalMinutes(watchedMovies)} min</span>
      </p>
    </div>
  </div>
)

const Movies = ({ movies, onClickMovie }) => (
  <ul className="list list-movies">
    {movies.map(movie => (
      <li key={movie.id} onClick={() => onClickMovie(movie)}>
        <img src={getMoviePoster(movie.poster)} alt={`Poster de ${movie.title}`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>📅</span>
            <span>{movie.year}</span>
          </p>
        </div>
      </li>
    ))}
  </ul>
)

const WatchedMovies = ({ watchedMovies, onClickBtnDelete }) => (
  <ul className="list">
    {watchedMovies.map(m => (
      <li key={m.id}>
        <img src={getMoviePoster(m.poster)} alt={`Poster de ${m.title}`} />
        <h3>{m.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{m.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{m.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{m.runtime}</span>
          </p>
          <button onClick={() => onClickBtnDelete(m.id)} className="btn-delete">X</button>
        </div>
      </li>
    ))}
  </ul>
)

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

const useWatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([])

  useEffect(() => {
    localforage.setItem('meAvalia', watchedMovies)
      .catch(error => alert(error.message))
  }, [watchedMovies])

  useEffect(() => {
    localforage.getItem('meAvalia')
      .then(value => {
        if (value) {
          setWatchedMovies(value)
        }
      })
      .catch(error => alert(error.message))
  }, [])

  const handleClickBtnDelete = id => setWatchedMovies(prev => prev.filter(p => p.id !== id))
  return { watchedMovies, setWatchedMovies, handleClickBtnDelete }
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