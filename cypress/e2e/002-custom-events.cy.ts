describe('Custom events', () => {
  beforeEach(() => {
    cy.visit('/cypress/pages/002-custom-events/002-custom-events.html')
  })

  it('should render custom events', () => {
    cy.contains('Event 1')
    cy.contains('ID: 1')
    cy.contains('Event 2|ID2')
  })
})
