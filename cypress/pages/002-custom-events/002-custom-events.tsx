import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { Calendar, useCalendarApp } from '../../../src'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '../../../../schedule-x/packages/calendar'
import '../index.css'
import '@schedule-x/theme-default/dist/index.css'
import CustomTimeGridEvent from './components/CustomTimeGridEvent.tsx'
import CustomDateGridEvent from './components/CustomDateGridEvent.tsx'

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const calendarApp = useCalendarApp({
    views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
    defaultView: viewWeek.name,
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2023-12-15 06:00',
        end: '2023-12-15 08:00',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2023-12-14',
        end: '2023-12-14',
      },
    ],
    selectedDate: '2023-12-15',
  })

  return (
    <>
      <div className="schedule-x-calendar">
        <Calendar
          calendarApp={calendarApp}
          customComponents={{
            timeGridEvent: CustomTimeGridEvent,
            dateGridEvent: CustomDateGridEvent,
          }}
        />
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
