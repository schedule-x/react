import { PluginBase } from '@schedule-x/shared'
import { useEffect, useState } from 'react'

export const usePlugin = <Plugin extends PluginBase<string>>(
  plugin: Plugin
) => {
  const [pluginInstance, setPluginInstance] = useState<Plugin>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPluginInstance(plugin)
    }
  }, [])

  return pluginInstance
}
