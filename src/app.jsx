import { useEffect, useReducer } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Main } from '@/components/main'
import { useLoader } from '@/hooks/use-loader'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'

const reducer = (state, action) => ({
  set_movies: { ...state, movies: action.movies?.map(movie => ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster })) }
})[action.type] || state

const App = () => {
  const [state, dispatch] = useReducer(reducer, { movies: [] })
  const [isFetchingMovies, setIsFetchingMovies] = useLoader()

  useEffect(() => {
    setIsFetchingMovies(true)
    request({
      url: `${baseUrl}&s=jurassic+park`,
      onSuccess: data => dispatch({ type: 'set_movies', movies: data.Search }),
      onFinally: () => setIsFetchingMovies(false)
    })
  }, [setIsFetchingMovies])

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    setIsFetchingMovies(true)
    request({
      url: `${baseUrl}&s=${searchMovie.value}`,
      onSuccess: data => dispatch({ type: 'set_movies', movies: data.Search }),
      onFinally: () => setIsFetchingMovies(false)
    })
  }

  return (
    <>
      <NavBar movies={state.movies} onSearchMovie={handleSearchMovie} />
      <Main movies={state.movies} isFetchingMovies={isFetchingMovies} />
    </>
  )
}

export { App }