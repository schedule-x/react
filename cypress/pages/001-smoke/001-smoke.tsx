import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { ScheduleXCalendar, useCalendarApp } from '../../..'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '../index.css'
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const calendarApp = useCalendarApp({
    views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
    defaultView: viewWeek.name,
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.ZonedDateTime.from('2023-12-15T06:00:00+09:00[Asia/Tokyo]'),
        end: Temporal.ZonedDateTime.from('2023-12-15T08:00:00+09:00[Asia/Tokyo]'),
      },
    ],
    selectedDate: Temporal.PlainDate.from('2023-12-15'),
    timezone: 'Asia/Tokyo',
  })

  return (
    <>
      <div className="schedule-x-calendar">
        <ScheduleXCalendar calendarApp={calendarApp} />
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
