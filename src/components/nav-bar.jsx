import { useRef, useEffect } from 'react'

const NavBar = ({ movies, onSearchMovie }) => {
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current.elements.searchMovie.value.length > 0) {
      formRef.current.reset()
    }
  }, [movies])

  return (
    <nav className="nav-bar">
      <img className="logo" src="logo-me-avalia.png" alt="Me avalia" />
      <form ref={formRef} onSubmit={onSearchMovie} className="form-search">
        <input
          name="searchMovie"
          className="search"
          type="text"
          placeholder="Buscar filmes..."
          autoFocus
        />
        <button className="btn-search">Buscar</button>
      </form>
      <p className="num-results"><strong>{movies?.length}</strong> Resultados</p>
    </nav>
  )
}

export { NavBar }
