import { useState } from 'react'
import { baseUrl } from '@/utils/base-url'
import { request } from '@/utils/request'

const useClickedMovie = setWatchedMovies => {
  const [clickedMovie, setClickedMovie] = useState(null)
  const [isFetchingMovieDetails, setIsFetchingMovieDetails] = useState(false)

  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickMovie = currentClickedMovie => {
    const prevClickedMovie = clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    setIsFetchingMovieDetails(true)
    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: movie => setClickedMovie({
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
      }),
      onFinally: () => setIsFetchingMovieDetails(false)
    })
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

  return { clickedMovie, handleClickBtnBack, handleClickMovie, handleSubmitRating, isFetchingMovieDetails }
}

export { useClickedMovie }