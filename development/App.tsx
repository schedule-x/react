import './App.css'
import { Calendar, useCalendarApp } from '../src'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '../../schedule-x/packages/calendar'
import '@schedule-x/theme-default/dist/index.css'
import {createDragAndDropPlugin} from "@schedule-x/drag-and-drop";
import {createEventModalPlugin} from "@schedule-x/event-modal";

function App() {
  const calendarApp = useCalendarApp({
    views: [viewMonthGrid, viewDay, viewWeek, viewMonthAgenda],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2023-12-22 05:00',
        end: '2023-12-22 07:00',
      },
    ],
    plugins: [
      createDragAndDropPlugin(),
      createEventModalPlugin(),
    ]
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
