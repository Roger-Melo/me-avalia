import { getMoviePoster } from '../utils/get-movie-poster'

const Movies = ({ movies, onClickMovie }) => (
  <ul className="list list-movies">
    {movies.map(movie => (
      <li key={movie.id} onClick={() => onClickMovie(movie)}>
        <img src={getMoviePoster(movie.poster)} alt={`Poster de ${movie.title}`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>📅</span>
            <span>{movie.year}</span>
          </p>
        </div>
      </li>
    ))}
  </ul>
)

export { Movies }