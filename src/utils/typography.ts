import Typography from 'typography'

export const typography = new Typography({
  headerFontFamily: ['Ubuntu', 'Verdana', 'sans serif'],
  bodyFontFamily: ['Roboto', 'sans serif'],
  baseLineHeight: 1.75,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
