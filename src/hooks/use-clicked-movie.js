import { useReducer } from 'react'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'

const getMovie = movie => ({
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
})

const reducer = (state, action) => ({
  dismissed_movie_details: { ...state, clickedMovie: null },
  set_clicked_movie: { ...state, clickedMovie: action.movie && getMovie(action.movie) },
  init_fetch: { ...state, isFetchingMovieDetails: true },
  ended_fetch: { ...state, isFetchingMovieDetails: false }
})[action.type] || state

const useClickedMovie = setWatchedMovies => {
  const [state, dispatch] = useReducer(reducer, { clickedMovie: null, isFetchingMovieDetails: false })

  const handleClickBtnBack = () => dispatch({ type: 'dismissed_movie_details' })
  const handleClickMovie = currentClickedMovie => {
    const prevClickedMovie = state.clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      dispatch({ type: 'dismissed_movie_details' })
      return
    }

    dispatch({ type: 'init_fetch' })
    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: movie => dispatch({ type: 'set_clicked_movie', movie }),
      onFinally: () => dispatch({ type: 'ended_fetch' })
    })
  }

  const handleSubmitRating = userRating => {
    setWatchedMovies(prev => {
      const duplicatedMovie = prev.some(movie => movie.id === state.clickedMovie.id)
      return duplicatedMovie
        ? prev.map(m => m.id === state.clickedMovie.id ? { ...state.clickedMovie, userRating } : m)
        : [...prev, { ...state.clickedMovie, userRating }]
    })
    dispatch({ type: 'dismissed_movie_details' })
  }

  return { clickedMovie: state.clickedMovie, handleClickBtnBack, handleClickMovie, handleSubmitRating, isFetchingMovieDetails: state.isFetchingMovieDetails }
}

export { useClickedMovie }