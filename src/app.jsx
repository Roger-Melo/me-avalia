import { useEffect, useState } from 'react'

const App = () => {
  const [movies, setMovies] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Roger-Melo/fake-data/main/fake-movies.json')
      .then(r => r.json())
      .then(data => setMovies(data.map(movie => ({
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
      }))))
      .catch(console.log)
  }, [])

  const handleClickBtnBack = () => setClickedMovie(null)
  const handleClickMovie = clickedMovie => setClickedMovie(prev =>
    prev?.id === clickedMovie.id ? null : clickedMovie)

  return (
    <>
      <nav className="nav-bar">
        <img className="logo" src="logo-me-avalia.png" alt="Me avalia" />
        <form className="form-search">
          <input className="search" type="text" placeholder="Buscar filmes..." autoFocus />
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results"><strong>{movies.length}</strong> Resultados</p>
      </nav>

      <main className="main">
        <div className="box">
          <ul className="list list-movies">
            {movies.map(movie => (
              <li key={movie.id} onClick={() => handleClickMovie(movie)}>
                <img src={movie.poster} alt={`Poster de ${movie.title}`} />
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
        </div>

        <div className="box">
          {clickedMovie
            ? (
              <div className="details">
                <header>
                  <button className="btn-back" onClick={handleClickBtnBack}>&larr;</button>
                  <img src={clickedMovie.poster} alt={`Poster de ${clickedMovie.title}`} />
                  <div className="details-overview">
                    <h2>{clickedMovie.title}</h2>
                    <p>{clickedMovie.released} &bull; {clickedMovie.runtime}</p>
                    <p>{clickedMovie.genre}</p>
                    <p><span>⭐️</span>{clickedMovie.imdbRating} IMDb rating</p>
                  </div>
                </header>

                <section>
                  <div className="rating">
                    <div>Avaliação aqui</div>
                  </div>
                  <p>
                    <em>{clickedMovie.plot}</em>
                  </p>
                  <p>Elenco: {clickedMovie.actors}</p>
                  <p>Direção: {clickedMovie.director}</p>
                </section>
              </div>
            )
            : (
              <>
                <div className="summary">
                  <h2>Histórico</h2>
                  <div>
                    <p>
                      <span>#️⃣</span>{' '}
                      <span>X Filmes</span>
                    </p>
                    <p>
                      <span>⏳</span>{' '}
                      <span>XXX min</span>
                    </p>
                  </div>
                </div>
                <ul className="list">
                  <li>
                    <img src="https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg" alt="Poster de Jurassic Park" />
                    <h3>Jurassic Park</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>X.X</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>X</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>XXX min</span>
                      </p>

                      <button className="btn-delete">X</button>
                    </div>
                  </li>
                  <li>
                    <img src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" alt="Poster de The Dark Knight" />
                    <h3>The Dark Knight</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>X.X</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>X</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>XXX min</span>
                      </p>

                      <button className="btn-delete">X</button>
                    </div>
                  </li>
                </ul>
              </>
            )}
        </div>
      </main>
    </>
  )
}

export { App }