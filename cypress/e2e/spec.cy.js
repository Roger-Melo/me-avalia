/*
A solid test generally covers 3 phases:

1. Set up the application state.
2. Take an action.
3. Make an assertion about the resulting application state.

You might also see this phrased as "Given, When, Then", or "Arrange, Act, Assert". But the idea is: 
First you put the application into a specific state, then you take some action in the application 
that causes it to change, and finally you check the resulting application state.

Today, we'll take a narrow view of these steps and map them cleanly to Cypress commands:

Visit a web page.
Query for an element.
Interact with that element.
Assert about the content on the page.
*/

describe('Rate and add movies to the list of watched movies', () => {
  it('Rate and add "Jurassic Park" to the list', () => {
    cy.visit('/')
    cy.get('[data-cy="list-movies"]').contains('Jurassic Park').click()
    cy.get('[data-cy="star-0"]').click()
    cy.get('[data-cy="button-add-list"]').click()
    cy.get('[data-cy="list-watched-movies"]').contains('Jurassic Park')
  })

  it('Rate and add "Jurassic Park III" to the list', () => {
    cy.visit('/')
    cy.get('[data-cy="list-movies"]').contains('Jurassic Park III').click()
    cy.get('[data-cy="star-1"]').click()
    cy.get('[data-cy="button-add-list"]').click()
    cy.get('[data-cy="list-watched-movies"]').contains('Jurassic Park III')
  })
})