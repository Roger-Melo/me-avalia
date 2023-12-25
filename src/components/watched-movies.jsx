import { getMoviePoster } from '@/utils/get-movie-poster'

const WatchedMovies = ({ watchedMovies, onClickBtnDelete, onClickMovie }) => (
  <ul className="list list-movies" data-cy="list-watched-movies">
    {watchedMovies.map(m => (
      <li key={m.id} onClick={() => onClickMovie(m)}>
        <img src={getMoviePoster(m.poster)} alt={`Poster de ${m.title}`} />
        <h3>{m.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{m.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{m.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{m.runtime}</span>
          </p>
          <button onClick={() => onClickBtnDelete(m.id)} className="btn-delete">X</button>
        </div>
      </li>
    ))}
  </ul>
)

export { WatchedMovies }