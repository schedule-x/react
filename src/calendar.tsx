import { CalendarApp } from '@schedule-x/calendar'
import React, { createElement, Fragment, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  CustomComponentMeta,
  CustomComponentsMeta,
} from './types/custom-components.ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactComponent = React.ComponentType<any>

type props = {
  calendarApp: CalendarApp
  customComponents?: {
    timeGridEvent?: ReactComponent
    dateGridEvent?: ReactComponent
  }
}

const createCustomTimeGridEvent =
  (
    setCustomComponent: (component: CustomComponentMeta) => void,
    customTimeGridEventComponent: ReactComponent
  ) =>
  (wrapperElement: HTMLElement, props: Record<string, unknown>) => {
    const componentMeta: CustomComponentMeta = {
      Component: createElement(customTimeGridEventComponent, props),
      wrapperElement,
    }
    setCustomComponent(componentMeta)
  }

export function Calendar({ calendarApp, customComponents }: props) {
  const randomId = 'sx' + Math.random().toString(36).substring(7)
  const [customComponentsMeta, setCustomComponentsMeta] =
    useState<CustomComponentsMeta>([])

  const setComponent = (component: CustomComponentMeta) => {
    setCustomComponentsMeta((prev) => {
      const newComponents = [...prev]
      const ccid = component.wrapperElement.dataset.ccid
      const existingComponent = newComponents.find(
        (c) => c.wrapperElement.dataset.ccid === ccid
      )

      if (existingComponent) {
        newComponents.splice(newComponents.indexOf(existingComponent), 1)
      }

      return [...newComponents, component]
    })
  }

  useEffect(() => {
    for (const [componentName, Component] of Object.entries(
      customComponents || {}
    )) {
      calendarApp._setCustomComponentFn(
        componentName as 'timeGridEvent' | 'dateGridEvent',
        createCustomTimeGridEvent(setComponent, Component)
      )
    }

    calendarApp.render(document.getElementById(randomId) as HTMLElement)
  }, [calendarApp, randomId, customComponents])

  return (
    <>
      <Fragment>
        <div className="sx-react-calendar-wrapper" id={randomId}></div>

        {customComponentsMeta.map(({ Component, wrapperElement }) => {
          return createPortal(Component, wrapperElement)
        })}
      </Fragment>
    </>
  )
}
