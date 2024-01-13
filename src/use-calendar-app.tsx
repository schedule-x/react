import {CalendarApp, CalendarConfig, createCalendar} from '@schedule-x/calendar'
import {useEffect, useState} from 'react'

export function useCalendarApp(config: CalendarConfig) {
  const [calendarApp, setCalendarApp] = useState<CalendarApp>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    setCalendarApp(createCalendar(config))
  }, [])

  return calendarApp as CalendarApp
}
