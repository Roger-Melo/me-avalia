import { History } from '@/components/history'
import { Movies } from '@/components/movies'
import { Loader } from '@/components/loader'
import { WatchedMovies } from '@/components/watched-movies'
import { MovieDetails } from '@/components/movie-details'
import { useMovies } from '@/hooks/use-movies'

const ListBox = ({ children }) => <div className="box">{children}</div>

const Main = ({ movies, isFetchingMovies }) => {
  const {
    clickedMovie,
    handleClickBtnBack,
    handleClickMovie,
    handleSubmitRating,
    isFetchingMovieDetails,
    watchedMovies,
    handleClickBtnDelete
  } = useMovies()

  return (
    <main className="main">
      <ListBox>
        {isFetchingMovies ? <Loader /> : <Movies movies={movies} onClickMovie={handleClickMovie} />}
      </ListBox>
      <ListBox>
        {isFetchingMovieDetails ? <Loader /> :
          clickedMovie
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

export { Main }