import { CalendarConfig, createCalendar } from '../../schedule-x/packages/calendar'
import { useState } from 'react'

export function useCalendarApp(config: CalendarConfig) {
  const [calendarApp] = useState(createCalendar(config))
  return calendarApp
}
