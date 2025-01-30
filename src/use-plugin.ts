import { PluginBase } from '@schedule-x/shared'
import { useEffect, useState } from 'react'

export const usePlugin = <Plugin extends PluginBase<string>>(
  plugin: Plugin
) => {
  if ('undefined' === typeof window) {
    throw new Error(
      'usePlugin can only be used in the browser. You need to wrap all logic for the calendar in a client side component.'
    )
  }

  const [pluginInstance, setPluginInstance] = useState<Plugin>()

  useEffect(() => {
    setPluginInstance(plugin)
  }, [])

  return pluginInstance as Plugin
}
