/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (dataCy: string) => {
  return cy.get(`[data-cy=${dataCy}]`)
})

Cypress.Commands.add('getByDataCyBeginsWith', (dataCyBeginsWith: string, count?: number) => {
  if (count) return cy.get(`[data-cy^=${dataCyBeginsWith}]`).should('have.length', count)
  return cy.get(`[data-cy^=${dataCyBeginsWith}]`)
})
