import { useReducer, useState, useEffect } from 'react'
import localforage from 'localforage'
import { useLoader } from '@/hooks/use-loader'
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
  set_clicked_movie: { ...state, clickedMovie: action.movie && getMovie(action.movie) }
})[action.type] || state

const useMovies = () => {
  const [state, dispatch] = useReducer(reducer, { clickedMovie: null })
  const [watchedMovies, setWatchedMovies] = useState([])
  const [isFetchingMovieDetails, setIsFetchingMovieDetails] = useLoader()

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
  const handleClickBtnBack = () => dispatch({ type: 'dismissed_movie_details' })
  const handleClickMovie = currentClickedMovie => {
    const prevClickedMovie = state.clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      dispatch({ type: 'dismissed_movie_details' })
      return
    }

    setIsFetchingMovieDetails(true)
    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: movie => dispatch({ type: 'set_clicked_movie', movie }),
      onFinally: () => setIsFetchingMovieDetails(false)
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

  return { clickedMovie: state.clickedMovie, handleClickBtnBack, handleClickMovie, handleSubmitRating, handleClickBtnDelete, isFetchingMovieDetails, watchedMovies }
}

export { useMovies }