import { useState, useEffect } from 'react'
import {
  CalendarApp,
  CalendarConfig,
  createCalendar,
} from '@schedule-x/calendar'
import { PluginBase } from '@schedule-x/shared'

export function useCalendarApp<Plugins extends PluginBase<string>[]>(
  config: CalendarConfig,
  plugins?: Plugins
) {
  const [calendarApp, setCalendarApp] = useState<CalendarApp | null>(null)

  useEffect(() => {
    setCalendarApp(createCalendar<Plugins>(config, plugins))
  }, [])

  return calendarApp
}

export function useNextCalendarApp<Plugins extends PluginBase<string>[]>(
  config: CalendarConfig,
  plugins?: Plugins
) {
  const [calendarApp, setCalendarApp] = useState<CalendarApp | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCalendarApp(createCalendar<Plugins>(config, plugins))
    }
  }, [])

  return calendarApp
}
