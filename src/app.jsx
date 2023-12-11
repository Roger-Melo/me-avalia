import { useEffect, useState } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Main } from '@/components/main'
import { baseUrl } from '@/utils/base-url'

const App = () => {
  const [movies, setMovies] = useState([])
  const [isFetchingMovies, setIsFetchingMovies] = useState(false)

  useEffect(() => {
    setIsFetchingMovies(true)
    fetch(`${baseUrl}&s=jurassic+park`)
      .then(r => r.json())
      .then(data => setMovies(data.Search.map(movie =>
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))))
      .catch(error => alert(error.message))
      .finally(() => setIsFetchingMovies(false))
  }, [])

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    setIsFetchingMovies(true)
    fetch(`${baseUrl}&s=${searchMovie.value}`)
      .then(r => r.json())
      .then(data => setMovies(data.Search.map(movie =>
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))))
      .catch(error => alert(error.message))
      .finally(() => setIsFetchingMovies(false))
  }

  return (
    <>
      <NavBar movies={movies} onSearchMovie={handleSearchMovie} />
      <Main movies={movies} isFetchingMovies={isFetchingMovies} />
    </>
  )
}

export { App }