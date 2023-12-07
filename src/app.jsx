import { useEffect, useState } from 'react'
import { History } from './components/history'
import { NavBar } from './components/nav-bar'
import { Movies } from './components/movies'
import { WatchedMovies } from './components/watched-movies'
import { MovieDetails } from './components/movie-details'
import { useWatchedMovies } from './hooks/use-watched-movies'
import { useClickedMovie } from './hooks/use-clicked-movie'
import { baseUrl } from './utils/base-url'

const ListBox = ({ children }) => <div className="box">{children}</div>

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