import { useState } from 'react'
import { StarRating } from '@/components/star-rating'
import { getMoviePoster } from '@/utils/get-movie-poster'

const MovieDetails = ({ clickedMovie, watchedMovies, onClickBtnBack, onSubmitRating }) => {
  const [rating, setRating] = useState(() => {
    return watchedMovies.find(m => m.id === clickedMovie.id)?.userRating ?? 0
  })

  const handleRating = userRating => setRating(userRating)

  return (
    <div className="details" data-cy="movie-details-container">
      <header>
        <button className="btn-back" onClick={onClickBtnBack}>&larr;</button>
        <img src={getMoviePoster(clickedMovie.poster)} alt={`Poster de ${clickedMovie.title}`} />
        <div className="details-overview">
          <h2>{clickedMovie.title}</h2>
          <p>{clickedMovie.released} &bull; {clickedMovie.runtime}</p>
          <p>{clickedMovie.genre}</p>
          <p><span>⭐️</span>{clickedMovie.imdbRating} IMDb rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} initialRating={rating} size={26} color="#FCC419" onRating={handleRating} />
          <button className="btn-add" onClick={() => onSubmitRating(rating)} data-cy="button-add-list">
            {watchedMovies.find(m => m.id === clickedMovie.id)?.userRating ? 'Alterar nota' : '+ Adicionar à lista'}
          </button>
        </div>
        <p><em>{clickedMovie.plot}</em></p>
        <p>Elenco: {clickedMovie.actors}</p>
        <p>Direção: {clickedMovie.director}</p>
      </section>
    </div>
  )
}

export { MovieDetails }