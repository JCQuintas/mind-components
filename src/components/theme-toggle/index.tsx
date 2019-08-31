import React, { FunctionComponent } from 'react'
import { useThemeModeContext, useThemeContext } from '../../utils/theme'
import { Toggle } from './toggle'

export const ThemeToggle: FunctionComponent = () => {
  const { setIsDarkMode } = useThemeModeContext()
  const theme = useThemeContext()

  const handleChange = () => setIsDarkMode(s => !s)

  return <Toggle checked={theme.isDark} onChange={handleChange} />
}
