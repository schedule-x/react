import { createCalendarHeaderPageObject } from '@schedule-x/e2e-testing'

describe('Smoke test', () => {
  const calendarHeader = createCalendarHeaderPageObject()

  beforeEach(() => {
    cy.visit('/cypress/pages/001-smoke/001-smoke.html')
  })

  it('should navigate between views', () => {
    calendarHeader.openViewByLabel('Month')
    calendarHeader.openViewByLabel('Day')
    calendarHeader.openViewByLabel('Week')
  })
})
