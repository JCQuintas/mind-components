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

export const rhythm = (...args: number[]) => {
  const r = typography.rhythm
  const returnNumber = typeof args[1] === 'boolean' && args[1]
  const a = args[0] || 1
  if (returnNumber) return parseFloat(r(a).slice(0, -3))
  const b = typeof args[1] === 'boolean' ? undefined : args[1]
  const c = args[2]
  const d = args[3]
  if (a && b && c && d) return `${r(a)} ${r(b)} ${r(c)} ${r(d)}`
  if (a && b && c) return `${r(a)} ${r(b)} ${r(c)}`
  if (a && b) return `${r(a)} ${r(b)}`
  return `${r(a)}`
}

export default typography
export const scale = typography.scale
