import React, { FunctionComponent, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { ThemeModeContext } from '../../utils/theme'
import { Toggle } from './toggle'

export const ThemeToggle: FunctionComponent = () => {
  const { setIsDarkMode } = useContext(ThemeModeContext)
  const theme = useContext<Theme>(ThemeContext)

  const handleChange = () => setIsDarkMode(s => !s)

  return <Toggle checked={theme.isDark} onChange={handleChange} />
}
