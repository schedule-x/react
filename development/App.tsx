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
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import 'temporal-polyfill/global'

const customComponents = {
  timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
  monthAgendaEvent: CustomDateGridEvent,
  monthGridEvent: CustomDateGridEvent,
 
}

function App() {
  const calendarApp = useCalendarApp(
    {
      views: [viewMonthGrid, viewDay, viewWeek, viewMonthAgenda],
      selectedDate: Temporal.PlainDate.from('2023-12-22'),
      timezone: 'Asia/Tokyo',
      events: [
        /* {
          id: '0',
          title: 'Event 0',
          start: Temporal.PlainDate.from('2023-12-22'),
          end: Temporal.PlainDate.from('2023-12-22'),
        }, */
        {
          id: '1',
          title: 'Event 1',
          start: Temporal.ZonedDateTime.from('2023-12-22T05:00:00+09:00[Asia/Tokyo]'),
          end: Temporal.ZonedDateTime.from('2023-12-22T07:00:00+09:00[Asia/Tokyo]'),
        },
        {
          id: '2',
          title: 'Event 2',
          start: Temporal.ZonedDateTime.from('2023-12-22T05:00:00+09:00[Asia/Tokyo]'),
          end: Temporal.ZonedDateTime.from('2023-12-22T07:00:00+09:00[Asia/Tokyo]'),
        },
        {
          id: '3',
          title: 'Event 3',
          start: Temporal.ZonedDateTime.from('2023-12-23T05:00:00+09:00[Asia/Tokyo]'),
          end: Temporal.ZonedDateTime.from('2023-12-23T07:00:00+09:00[Asia/Tokyo]'),
        },
      ],
    },
    [
      createDragAndDropPlugin(),
      createEventModalPlugin(),
      createEventsServicePlugin(),
      createCalendarControlsPlugin(),
    ]
  )

  return (
    <>
      <div>
        <ScheduleXCalendar
          calendarApp={calendarApp}
          customComponents={customComponents}
        />
      </div>
    </>
  )
}

export default App
