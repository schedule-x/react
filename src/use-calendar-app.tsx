import {
  CalendarApp,
  CalendarConfig,
  createCalendar,
} from '@schedule-x/calendar'
import { PluginBase } from '@schedule-x/shared'
import { useEffect, useMemo, useState } from 'react'

export function useCalendarApp<Plugins extends PluginBase<string>[]>(
  config: CalendarConfig,
  plugins?: Plugins
) {
  return useMemo(
    () => createCalendar<Plugins>(config, plugins),
    [config, plugins]
  )
}

export function useNextCalendarApp<Plugins extends PluginBase<string>[]>(
  config: CalendarConfig,
  plugins?: Plugins
) {
  const [calendarApp, setCalendarApp] = useState<CalendarApp>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCalendarApp(createCalendar<Plugins>(config, plugins))
    }
  }, [config, plugins])

  return calendarApp
}
