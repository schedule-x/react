import { CalendarApp } from '@schedule-x/calendar'
import React, { createElement, Fragment, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  CustomComponentMeta,
  CustomComponentsMeta,
} from './types/custom-components.ts'
import { CustomComponentName } from '@schedule-x/shared'
import { flushSync } from 'react-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactComponent = React.ComponentType<any>

type props = {
  calendarApp: CalendarApp | null
  customComponents?: {
    [key in CustomComponentName]?: ReactComponent
  }
}

const createCustomComponentFn =
  (
    setCustomComponent: (component: CustomComponentMeta) => void,
    customComponent: ReactComponent
  ) =>
  (wrapperElement: HTMLElement, props: Record<string, unknown>) => {
    setCustomComponent({
      Component: createElement(customComponent, props),
      wrapperElement,
    })
  }

export function ScheduleXCalendar({ calendarApp, customComponents }: props) {
  const randomId = useRef('')
  const [customComponentsMeta, setCustomComponentsMeta] =
    useState<CustomComponentsMeta>([])

  const setComponent = (component: CustomComponentMeta) => {
    setCustomComponentsMeta((prev) => {
      const ccid = component.wrapperElement?.dataset?.ccid
      if (!ccid) return prev

      const newComponents = [...prev]
      const existingComponent = newComponents.find(
        (c) => c.wrapperElement?.dataset?.ccid === ccid
      )

      if (existingComponent) {
        newComponents.splice(newComponents.indexOf(existingComponent), 1)
      }

      return [...newComponents, component]
    })
  }

  useEffect(() => {
    randomId.current = 'sx' + Math.random().toString(36).substring(2, 11)
  }, [])

  useEffect(() => {
    if (!calendarApp) return // before useEffect runs for the first time calendarApp is null

    calendarApp._setDestroyCustomComponentInstance((ccid) => {
      flushSync(() => {
        setCustomComponentsMeta((prev) => {
          const targetComponent = prev.find((component) => component.wrapperElement.dataset.ccid === ccid)

          if (targetComponent) {
            targetComponent.wrapperElement.remove()
          }

          return prev.filter((component) => component.wrapperElement.dataset.ccid !== ccid)
        })
      })
    })

    for (const [componentName, Component] of Object.entries(
      customComponents || {}
    )) {
      if (!Component) continue

      calendarApp._setCustomComponentFn(
        componentName,
        createCustomComponentFn(setComponent, Component)
      )
    }

    const calendarElement = document.getElementById(randomId.current)
    if (!calendarElement) return

    calendarApp.render(calendarElement as HTMLElement)

    return () => {
      calendarApp.destroy()
    }
  }, [calendarApp, customComponents, randomId.current])

  return (
    <>
      <Fragment>
        <div className="sx-react-calendar-wrapper" id={randomId.current}></div>

        {customComponentsMeta.map(({ Component, wrapperElement }) => {
          return createPortal(Component, wrapperElement)
        })}
      </Fragment>
    </>
  )
}
