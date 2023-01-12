declare namespace Cypress {
  interface Chainable {
    getByDataCy(dataCy: string): Chainable<JQuery<HTMLElement>>
    getByDataCyBeginsWith(dataCyBeginsWith: string, count?: number): Chainable<JQuery<HTMLElement>>
    getByDataContains(dataContained: string): Chainable<JQuery<HTMLElement>>
  }
}
