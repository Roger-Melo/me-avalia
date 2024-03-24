import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Main } from '@/components/main'
import { baseUrl } from '@/utils/base-url'

const fetchMovies = url => fetch(url)
  .then(res => res.json())
  .then(data => data.Search.map(movie =>
    ({ id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster })))

const App = () => {
  const [url, setUrl] = useState(`${baseUrl}&s=jurassic+park`)
  const { isError, isLoading, error, data } = useQuery({
    queryKey: ['movies', url],
    queryFn: () => fetchMovies(url),
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  const handleSearchMovie = e => {
    e.preventDefault()
    const { searchMovie } = e.target.elements
    if (searchMovie.value.length < 2) {
      return
    }

    setUrl(`${baseUrl}&s=${searchMovie.value}`)
  }

  return isError
    ? <p>Aconteceu inesperado aconteceu. Você pode tentar novamente? {error.message}</p>
    : (
      <>
        <NavBar onSearchMovie={handleSearchMovie} movies={data} />
        <Main movies={data} isFetchingMovies={isLoading} />
      </>
    )
}

export { App }
