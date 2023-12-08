import { useState, useEffect } from 'react'
import localforage from 'localforage'

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

export { useWatchedMovies }