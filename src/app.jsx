import { useEffect, useState } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Main } from '@/components/main'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'

const App = () => {
  const [movies, setMovies] = useState([])
  const [isFetchingMovies, setIsFetchingMovies] = useState(false)

  useEffect(() => {
    setIsFetchingMovies(true)
    request({
      url: `${baseUrl}&s=jurassic+park`,
      onSuccess: data => setMovies(data.Search.map(movie =>
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))),
      onFinally: () => setIsFetchingMovies(false)
    })
  }, [])

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    setIsFetchingMovies(true)
    request({
      url: `${baseUrl}&s=${searchMovie.value}`,
      onSuccess: data => setMovies(data.Search.map(movie =>
        ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }))),
      onFinally: () => setIsFetchingMovies(false)
    })
  }

  return (
    <>
      <NavBar movies={movies} onSearchMovie={handleSearchMovie} />
      <Main movies={movies} isFetchingMovies={isFetchingMovies} />
    </>
  )
}

export { App }