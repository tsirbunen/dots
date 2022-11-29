const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`

export class Base {
  visitDotsApp() {
    cy.visit(CLIENT_BASE_URL)
  }

  _verifyPageIsVisible(page: string) {
    this._verifyDataCyIsVisible(page)
  }

  _verifyDataCyIsVisible(dataCy: string) {
    cy.getByDataCy(dataCy).should('be.visible')
  }

  _verifyDataCyIsNotVisible(dataCy: string) {
    cy.getByDataCy(dataCy).should('not.be.visible')
  }

  _verifyDataCyBeginsWithInstancesAreVisible(beginsWith: string, count?: number) {
    cy.getByDataCyBeginsWith(beginsWith, count).should('be.visible')
  }
}
