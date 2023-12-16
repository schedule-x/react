import {CalendarApp} from '@schedule-x/calendar'
import {useEffect} from 'react'

type props = {
  calendarApp: CalendarApp
}

export function Calendar({ calendarApp }: props) {
  const randomId = 'sx' + Math.random().toString(36).substring(7)

  useEffect(() => {
    calendarApp.render(document.getElementById(randomId) as HTMLElement)
  }, [calendarApp, randomId])

  return (
    <>
      <div className="sx-react-calendar-wrapper" id={randomId}></div>
    </>
  )
}
