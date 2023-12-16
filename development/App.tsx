import './App.css'
import { Calendar, useCalendarApp } from '../src'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

function App() {
  const calendarApp = useCalendarApp({
    views: [viewMonthGrid, viewDay, viewWeek, viewMonthAgenda],
    events: [
      {
        id: '1',
        title: 'Event 1',
        time: {
          start: '2023-12-15 10:00',
          end: '2023-12-15 12:00',
        },
      },
    ],
  })

  return (
    <>
      <div>
        <Calendar calendarApp={calendarApp} />
      </div>
    </>
  )
}

export default App
