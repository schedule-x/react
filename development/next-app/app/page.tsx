'use client'
import styles from './page.module.css'
// import { Calendar, useCalendarApp } from '../../../..'
import { useNextCalendarApp, ScheduleXCalendar } from '../../..'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import {createEventsServicePlugin} from "@schedule-x/events-service";
import {useState} from "react";


export default function Home() {
  const eventsServicePlugin = useState(createEventsServicePlugin())[0]

  const calendarApp = useNextCalendarApp({
    views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
    defaultView: viewWeek.name,
    events: [
      {
        id: '12',
        title: 'Event 1',
        start: '2023-12-15 06:00',
        end: '2023-12-15 08:00',
      },
    ],
    selectedDate: '2023-12-15',
    plugins: [createDragAndDropPlugin(), eventsServicePlugin],
    calendars: {
      school: {
        colorName: 'school',
        lightColors: {
          main: '#1c7df9',
          container: '#d2e7ff',
          onContainer: '#002859',
        },
        darkColors: {
          main: '#c0dfff',
          onContainer: '#dee6ff',
          container: '#426aa2',
        },
      },
    },
  })

  const addEvent = () => {
    eventsServicePlugin.add({
      id: '13',
      title: 'Event 2',
      start: '2023-12-15 08:00',
      end: '2023-12-15 10:00',
      calendarId: 'school',
    })
  }

  return (
    <main className={styles.main}>
      <ScheduleXCalendar calendarApp={calendarApp} />

      <button onClick={addEvent}>add event</button>
    </main>
  )
}
