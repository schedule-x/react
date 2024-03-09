import './App.css'
import { ScheduleXCalendar, useCalendarApp } from '../src'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import CustomTimeGridEvent from './components/CustomTimeGridEvent.tsx'
import CustomDateGridEvent from './components/CustomDateGridEvent.tsx'
import CustomEventModal from './components/CustomEventModal.tsx'

function App() {
  const calendarApp = useCalendarApp({
    views: [viewMonthGrid, viewDay, viewWeek, viewMonthAgenda],
    selectedDate: '2023-12-22',
    events: [
      {
        id: '0',
        title: 'Event 0',
        start: '2023-12-22',
        end: '2023-12-22',
      },
      {
        id: '1',
        title: 'Event 1',
        start: '2023-12-22 05:00',
        end: '2023-12-22 07:00',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2023-12-22 05:00',
        end: '2023-12-22 07:00',
      },
      {
        id: '3',
        title: 'Event 3',
        start: '2023-12-23 05:00',
        end: '2023-12-23 07:00',
      },
    ],
    plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
  })

  return (
    <>
      <div>
        <ScheduleXCalendar
          calendarApp={calendarApp}
          customComponents={{
            timeGridEvent: CustomTimeGridEvent,
            dateGridEvent: CustomDateGridEvent,
            monthAgendaEvent: CustomDateGridEvent,
            monthGridEvent: CustomDateGridEvent,
            eventModal: CustomEventModal,
          }}
        />
      </div>
    </>
  )
}

export default App
