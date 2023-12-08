import { History } from '@/components/history'
import { Movies } from '@/components/movies'
import { WatchedMovies } from '@/components/watched-movies'
import { MovieDetails } from '@/components/movie-details'
import { useWatchedMovies } from '@/hooks/use-watched-movies'
import { useClickedMovie } from '@/hooks/use-clicked-movie'

const ListBox = ({ children }) => <div className="box">{children}</div>

const Main = ({ movies }) => {
  const { watchedMovies, setWatchedMovies, handleClickBtnDelete } = useWatchedMovies()
  const {
    clickedMovie,
    handleClickBtnBack,
    handleClickMovie,
    handleSubmitRating
  } = useClickedMovie(setWatchedMovies)

  return (
    <main className="main">
      <ListBox>
        <Movies movies={movies} onClickMovie={handleClickMovie} />
      </ListBox>
      <ListBox>
        {clickedMovie
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