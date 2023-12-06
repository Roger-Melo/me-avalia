const getTotalMinutes = watchedMovies => watchedMovies
  .reduce((acc, item) => acc + (item.runtime === 'N/A' ? 0 : +item.runtime.split(' ')[0]), 0)

const History = ({ watchedMovies }) => (
  <div className="history">
    <h2>Histórico</h2>
    <div>
      <p>
        <span>#️⃣</span>{' '}
        <span>{watchedMovies.length} Filmes</span>
      </p>
      <p>
        <span>⏳</span>{' '}
        <span>{getTotalMinutes(watchedMovies)} min</span>
      </p>
    </div>
  </div>
)

export { History }