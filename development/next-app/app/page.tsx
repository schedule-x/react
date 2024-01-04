'use client'
import styles from './page.module.css'
// import { Calendar, useCalendarApp } from '../../../..'
import { useCalendarApp, ScheduleXCalendar } from '../../..'
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

export default function Home() {
  const calendarApp = useCalendarApp({
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
    plugins: [createDragAndDropPlugin()],
  })

  return (
    <main className={styles.main}>
      <ScheduleXCalendar calendarApp={calendarApp} />
    </main>
  )
}
