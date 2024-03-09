import './App.css'
import { ScheduleXCalendar, useCalendarApp } from '../src'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
// import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
// import { createEventModalPlugin } from '@schedule-x/event-modal'
// import CustomTimeGridEvent from './components/CustomTimeGridEvent.tsx'
// import CustomDateGridEvent from './components/CustomDateGridEvent.tsx'
import { createReactView } from '../src/react-view/react-view.ts'
import { addMonths, CalendarAppSingleton } from '@schedule-x/shared'

function App() {
  const listView = createReactView({
    name: 'list',
    label: 'List',
    Component: ({ $app, id }: { $app: CalendarAppSingleton; id: string }) => {
      return (
        <div id={id} data-ccid={id}>
          <h1>list view</h1>
          <ul>
            {$app.calendarEvents.list.value.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        </div>
      )
    },
    setDateRange: () => {},
    hasSmallScreenCompat: true,
    hasWideScreenCompat: true,
    backwardForwardFn: addMonths,
    backwardForwardUnits: 1,
  })

  const calendarApp = useCalendarApp({
    views: [viewMonthGrid, viewDay, viewWeek, viewMonthAgenda, listView],
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
    plugins: [],
  })

  return (
    <>
      <div>
        <ScheduleXCalendar calendarApp={calendarApp} />
      </div>
    </>
  )
}

export default App
