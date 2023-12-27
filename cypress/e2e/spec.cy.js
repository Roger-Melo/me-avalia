beforeEach(() => {
  cy.visit('/')

  const addWatchedMovies = movies => movies.forEach(movie => {
    cy.get('[data-cy="list-movies"]').contains(movie).click()
    cy.get('[data-cy="star-0"]').click()
    cy.get('[data-cy="button-add-list"]').click()
    cy.get('[data-cy="list-watched-movies"]').contains(movie)
  })

  addWatchedMovies(['Jurassic Park III', 'Jurassic Park: The Game'])
})

describe('Show details of a watched movie on click watched movies list', () => {
  const showDetailsOf = movie => {
    cy.get('[data-cy="list-watched-movies"]').contains(movie).click()
    cy.get('[data-cy="movie-details-container"]').contains(movie)
  }

  it('Show details of Jurassic Park III', () => showDetailsOf('Jurassic Park III'))
  it('Show details of Jurassic Park: The Game', () => showDetailsOf('Jurassic Park: The Game'))
})

describe('Remove movie from watched movies list', () => {
  const remove = movie => {
    cy.get('[data-cy="list-watched-movies"]')
      .contains('li', movie)
      .contains('button', 'X')
      .click()
    cy.get('[data-cy="list-watched-movies"]')
      .should('have.length', 1)
  }

  it('Remove Jurassic Park III', () => remove('Jurassic Park III'))
  it('Remove Jurassic Park: The Game', () => remove('Jurassic Park: The Game'))
})

describe('Stars', () => {
  const clickJurassicParkIII = () => cy.get('[data-cy="list-watched-movies"]')
    .contains('li', 'Jurassic Park III').click()

  it('show rating if it\'s was already given', () => {
    clickJurassicParkIII()
    cy.get('[data-cy="star-2"]').click()
    cy.get('[data-cy="button-add-list"]').click()

    clickJurassicParkIII()
    cy.get('.rating > div > p').contains('3')
  })

  it('show empty stars if same rate was already given', () => {
    clickJurassicParkIII()
    cy.get('[data-cy="star-2"]').click()
    cy.get('[data-cy="star-2"]').click()
    cy.get('.rating > div > p').should('be.empty')
  })
})