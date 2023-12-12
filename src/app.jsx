import { useEffect, useReducer } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Main } from '@/components/main'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'

const reducer = (state, action) => ({
  set_movies: { ...state, movies: action.movies?.map(movie => ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster })) },
  init_fetch: { ...state, isFetchingMovies: true },
  ended_fetch: { ...state, isFetchingMovies: false }
})[action.type] || state

const App = () => {
  const [state, dispatch] = useReducer(reducer, { movies: [], isFetchingMovies: false })

  useEffect(() => {
    dispatch({ type: 'init_fetch' })
    request({
      url: `${baseUrl}&s=jurassic+park`,
      onSuccess: data => dispatch({ type: 'set_movies', movies: data.Search }),
      onFinally: () => dispatch({ type: 'ended_fetch' })
    })
  }, [])

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements

    if (searchMovie.value.length < 2) {
      return
    }

    dispatch({ type: 'init_fetch' })
    request({
      url: `${baseUrl}&s=${searchMovie.value}`,
      onSuccess: data => dispatch({ type: 'set_movies', movies: data.Search }),
      onFinally: () => dispatch({ type: 'ended_fetch' })
    })
  }

  return (
    <>
      <NavBar movies={state.movies} onSearchMovie={handleSearchMovie} />
      <Main movies={state.movies} isFetchingMovies={state.isFetchingMovies} />
    </>
  )
}

export { App }