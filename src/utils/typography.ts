import Typography from 'typography'

export const typography = new Typography({
  headerFontFamily: ['Ubuntu', 'Verdana', 'sans serif'],
  bodyFontFamily: ['Roboto', 'sans serif'],
  baseLineHeight: 1.75,
  scaleRatio: 2.9,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export const rhythm = (...args: number[]): string => {
  const r = typography.rhythm
  const a = args[0] || 1
  const b = args[1]
  const c = args[2]
  const d = args[3]
  if (a && b && c && d) return `${r(a)} ${r(b)} ${r(c)} ${r(d)}`
  if (a && b && c) return `${r(a)} ${r(b)} ${r(c)}`
  if (a && b) return `${r(a)} ${r(b)}`
  return `${r(a)}`
}

export default typography
export const scale = typography.scale
