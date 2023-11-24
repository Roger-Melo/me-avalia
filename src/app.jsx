const App = () => {
  return (
    <>
      <nav className="nav-bar">
        <img className="logo" src="logo-me-avalia.png" alt="Me avalia" />
        <form className="form-search">
          <input className="search" type="text" placeholder="Buscar filmes..." autoFocus />
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results"><strong>XX</strong> Resultados</p>
      </nav>

      <main className="main">
        <div className="box">
          <ul className="list list-movies">
            <li>
              <img src="https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg" alt="Poster de Jurassic Park" />
              <h3>Jurassic Park</h3>
              <div>
                <p>
                  <span>📅</span>
                  <span>1993</span>
                </p>
              </div>
            </li>
            <li>
              <img src="https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" alt="Poster de Se7en" />
              <h3>Se7en</h3>
              <div>
                <p>
                  <span>📅</span>
                  <span>1995</span>
                </p>
              </div>
            </li>
            <li>
              <img src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" alt="Poster de The Dark Knight" />
              <h3>The Dark Knight</h3>
              <div>
                <p>
                  <span>📅</span>
                  <span>2008</span>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="box">
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
        </div>
      </main>
    </>
  )
}

export { App }
