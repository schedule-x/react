import { CalendarApp } from '@schedule-x/calendar'
import React, { createElement, Fragment, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  CustomComponentMeta,
  CustomComponentsMeta,
} from './types/custom-components.ts'
import { View } from '@schedule-x/shared'
import { isReactView, ReactViewMeta } from './react-view/react-view.ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactComponent = React.ComponentType<any>

type props = {
  calendarApp: CalendarApp | undefined // undefined allowed to prevent errors in SSR
  customComponents?: {
    timeGridEvent?: ReactComponent
    dateGridEvent?: ReactComponent
    monthGridEvent?: ReactComponent
    monthAgendaEvent?: ReactComponent
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
  const [randomId, setRandomId] = useState('')
  const [customComponentsMeta, setCustomComponentsMeta] =
    useState<CustomComponentsMeta>([])
  const [customViews, setCustomViews] = useState<ReactViewMeta[]>([])

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

  const setView = (view: ReactViewMeta) => {
    setCustomViews((prev) => {
      const newViews = [...prev]
      const existingView = newViews.find((v) => v.view.name === view.view.name)

      if (existingView) {
        return newViews
      }

      return [...newViews, view]
    })
  }

  const removeView = (viewName: string) => {
    setCustomViews((prev) => {
      const newViews = [...prev]
      const existingView = newViews.find((v) => v.view.name === viewName)

      if (existingView) {
        console.log('remove view')
        newViews.splice(newViews.indexOf(existingView), 1)
      }

      return newViews
    })
  }

  useEffect(() => {
    setRandomId('sx' + Math.random().toString(36).substring(2, 11))
  }, [])

  useEffect(() => {
    if (!calendarApp) return // in SSR, calendarApp will be undefined

    // Set custom components
    for (const [componentName, Component] of Object.entries(
      customComponents || {}
    )) {
      calendarApp._setCustomComponentFn(
        componentName as 'timeGridEvent' | 'dateGridEvent',
        createCustomComponentFn(setComponent, Component)
      )
    }

    // Prepare custom view
    //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    calendarApp.$app.config.views.forEach((view: View) => {
      if (isReactView(view)) {
        console.log(view.name)
        view._setSetCustomViewFn(setView)
        view._setRemoveCustomViewFn(removeView)
      }
    })

    const calendarElement = document.getElementById(randomId)
    if (!calendarElement) return

    calendarApp.render(calendarElement as HTMLElement)
  }, [calendarApp, customComponents, randomId])

  return (
    <>
      <Fragment>
        <div className="sx-react-calendar-wrapper" id={randomId}></div>

        {customComponentsMeta.map(({ Component, wrapperElement }) => {
          return createPortal(Component, wrapperElement)
        })}

        {customViews.map(({ Component, wrapperElement }) => {
          return createPortal(Component, wrapperElement)
        })}
      </Fragment>
    </>
  )
}
