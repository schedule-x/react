import { createCalendarHeaderPageObject } from '@schedule-x/e2e-testing'

describe('Smoke test with regular React', () => {
  const calendarHeader = createCalendarHeaderPageObject()

  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should navigate between views', () => {
    calendarHeader.openViewByLabel('Month')
    calendarHeader.openViewByLabel('Day')
    calendarHeader.openViewByLabel('Week')
  })
})
