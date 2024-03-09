import {addDays, addMonths, CalendarAppSingleton, View, ViewConfig} from '@schedule-x/shared'
import React, {createElement} from "react";

export type ReactViewMeta = {
  view: ReactView
  wrapperElement: HTMLElement
  Component: React.ReactElement
}

export type ReactViewComponent = (props: {
  $app: CalendarAppSingleton
  id: string
}) => JSX.Element

export type ReactView = View<ReactViewComponent> & {
  IS_REACT_VIEW: true
  _setSetCustomViewFn: (setViewFn: (view: ReactViewMeta) => void) => void
  _setRemoveCustomViewFn: (removeViewFn: (viewName: string) => void) => void
}

class ReactViewImpl implements ReactView {
  private randomId = 'fix-this'
  private setViewFn: ((viewMeta: ReactViewMeta) => void) | undefined
  private removeViewFn: ((viewName: string) => void) | undefined
  public readonly IS_REACT_VIEW = true

  public name: string
  public label: string
  public Component: ReactViewComponent
  public setDateRange: (config: unknown) => void
  public hasSmallScreenCompat: boolean
  public hasWideScreenCompat: boolean
  public backwardForwardFn: typeof addDays | typeof addMonths
  public backwardForwardUnits: number

  constructor(config: ViewConfig) {
    this.name = config.name
    this.label = config.label
    this.Component = config.Component
    this.setDateRange = config.setDateRange as unknown as (config: unknown) => void
    this.hasSmallScreenCompat = config.hasSmallScreenCompat
    this.hasWideScreenCompat = config.hasWideScreenCompat
    this.backwardForwardFn = config.backwardForwardFn
    this.backwardForwardUnits = config.backwardForwardUnits
  }

  render(onElement: HTMLElement, $app: CalendarAppSingleton): void {
    console.log('tried to render view with name:' + this.name)
    console.log(this)
    console.log(onElement)
    if (!this.setViewFn) throw new Error('setViewFn not set')

    this.setViewFn({
      view: this,
      wrapperElement: onElement,
      Component: createElement(this.Component, { $app, id: this.randomId }),
    })
  }

  destroy(): void {
    console.log('ran destroy')
    const elementById = document.getElementById(this.randomId);
    if (elementById) {
      console.log('found element to remove')
      this.removeViewFn && this.removeViewFn(this.name)
    }
  }

  public _setSetCustomViewFn(setComponentFn: (componentMeta: ReactViewMeta) => void) {
    this.setViewFn = setComponentFn
  }

  public _setRemoveCustomViewFn(removeViewFn: (viewName: string) => void) {
    this.removeViewFn = removeViewFn
  }
}

export const createReactView = (config: ViewConfig): View => {
  return new ReactViewImpl(config)
}

export const isReactView = (view: View): view is ReactView => {
  return 'IS_REACT_VIEW' in view;
}
