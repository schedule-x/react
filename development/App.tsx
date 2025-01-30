import '@schedule-x/theme-default/dist/index.css'

import './App.css'

import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useState } from 'react'

import { ScheduleXCalendar, useCalendarApp } from '../src'
import CustomDateGridEvent from './components/CustomDateGridEvent.tsx'
import CustomEventModal from './components/CustomEventModal.tsx'
import CustomTimeGridEvent from './components/CustomTimeGridEvent.tsx'

function App() {
  const [locale, setLocale] = useState('en-US')

  const calendarApp = useCalendarApp(
    {
      views: [viewMonthGrid, viewDay, viewWeek, viewMonthAgenda],
      selectedDate: '2023-12-22',
      locale,
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
    },
    [
      createDragAndDropPlugin(),
      createEventModalPlugin(),
      createEventsServicePlugin(),
      createCalendarControlsPlugin(),
    ]
  )

  console.log(calendarApp.eventsService.getAll())

  return (
    <>
      <div>
        <button
          onClick={() =>
            setLocale((locale) => (locale === 'tr-TR' ? 'en-US' : 'tr-TR'))
          }
        >
          Switch Locale
        </button>
        <ScheduleXCalendar
          calendarApp={calendarApp}
          customComponents={{
            timeGridEvent: CustomTimeGridEvent,
            dateGridEvent: CustomDateGridEvent,
            monthAgendaEvent: CustomDateGridEvent,
            monthGridEvent: CustomDateGridEvent,
            eventModal: CustomEventModal,
            headerContent: () => <>Custom header</>,
          }}
        />
      </div>
    </>
  )
}

export default App
