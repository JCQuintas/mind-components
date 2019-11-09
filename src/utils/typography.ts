import Typography from 'typography'

export const typography = new Typography({
  baseLineHeight: 1.75,
  headerFontFamily: ['Poppins'],
  headerWeight: 800,
  bodyFontFamily: ['Raleway'],
  bodyWeight: 500,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const scale = typography.scale
