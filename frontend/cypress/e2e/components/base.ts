const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`

export class Base {
  visitDotsApp() {
    cy.visit(CLIENT_BASE_URL)
  }

  _verifyDataCyIsVisible(dataCy: string) {
    cy.getByDataCy(dataCy)
  }

  _verifyDataCyBeginsWithInstancesAreVisible(beginsWith: string, count?: number) {
    cy.getByDataCyBeginsWith(beginsWith, count)
  }
}
