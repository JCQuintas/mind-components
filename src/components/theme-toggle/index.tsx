import React, { FunctionComponent, useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { ThemeModeContext } from '../../utils/theme'
import { Toggle } from './toggle'

export const ThemeToggle: FunctionComponent = () => {
  const [render, setRender] = useState(false)
  const { setIsDarkMode } = useContext(ThemeModeContext)
  const theme = useContext<Theme>(ThemeContext)

  const handleChange = () => setIsDarkMode(s => !s)

  useEffect(() => {
    const timeout = setTimeout(() => setRender(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  if (!render) return null

  return <Toggle checked={theme.isDark} onChange={handleChange} />
}
