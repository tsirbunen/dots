export class Base {
  verifyDataCyIsVisible(dataCy: string) {
    cy.getByDataCy(dataCy).should('be.visible')
  }

  verifyDataCyIsNotVisible(dataCy: string) {
    cy.getByDataCy(dataCy).should('not.be.visible')
  }

  verifyDataCyBeginsWithInstancesAreVisible(beginsWith: string, count?: number) {
    cy.getByDataCyBeginsWith(beginsWith, count).should('be.visible')
  }
}
