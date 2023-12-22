import { CalendarApp } from '../../schedule-x/packages/calendar'
import React, {createElement, Fragment, ReactElement, useEffect, useState} from 'react'
import {createPortal} from "react-dom";

type props = {
  calendarApp: CalendarApp
}

type ReactComponent = React.ComponentType<unknown>

type CustomComponentMeta = {
  Component: ReactElement
  wrapperElement: HTMLElement
}

type CustomComponents = CustomComponentMeta[]

const createCustomTimeGridEvent = (
  customComponents: CustomComponents,
  setCustomComponents: React.Dispatch<React.SetStateAction<CustomComponents>>,
  customTimeGridEventComponent: ReactComponent,
) => (
  wrapperElement: HTMLElement,
  props: Record<string, unknown>
) => {
  const componentMeta: CustomComponentMeta = {
    Component: createElement(customTimeGridEventComponent, props),
    wrapperElement,
  }

  setCustomComponents([
    ...customComponents,
    componentMeta,
  ])
}

const LolComponent = () => {
  return (
    <div>
      LOL hiiii hellooooo
      input: <input type="checkbox" />
    </div>
  )
}

export function Calendar({ calendarApp }: props) {
  const randomId = 'sx' + Math.random().toString(36).substring(7)
  const [customComponents, setCustomComponents] = useState<CustomComponents>([])
  calendarApp._setCustomComponentFn('timeGridEvent', createCustomTimeGridEvent(customComponents, setCustomComponents, LolComponent))

  useEffect(() => {
    calendarApp.render(document.getElementById(randomId) as HTMLElement)
  }, [calendarApp, randomId])

  return (
    <>
      <Fragment>
        <div className="sx-react-calendar-wrapper" id={randomId}></div>

        {customComponents.map(({ Component, wrapperElement }) => {
          return createPortal(Component, wrapperElement)
        })}
      </Fragment>
    </>
  )
}
