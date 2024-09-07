import { createCalendarHeaderPageObject } from '@schedule-x/e2e-testing'

const calendarHeader = createCalendarHeaderPageObject()

describe('Custom events', () => {
  beforeEach(() => {
    cy.visit('/cypress/pages/002-custom-events/002-custom-events.html')
  })

  it('should render custom events in week view', () => {
    cy.contains('Event 1')
    cy.contains('ID: 1')
    cy.contains('Event 2|ID2')
  })

  it('should render custom events in month view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.contains('Event 1|ID1').should('exist')
    cy.contains('Event 2|ID2').should('exist')
  })
})

describe('Custom events test on mobile', () => {
  beforeEach(() => {
    cy.visit(
      '/cypress/pages/002-custom-events/002-custom-events.html?view=month-agenda'
    )
    cy.viewport('iphone-6')
  })

  it('should render custom events in month agenda view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.contains('Event 1|ID1').should('exist')
  })
})
