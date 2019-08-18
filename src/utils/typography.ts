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

export const rhythm = (...args: any[]): string | number => {
  const r = (s: string) => typography.rhythm(parseFloat(s))
  const a = typeof args[0] === 'number' ? `${args[0]}` : '1'
  const returnNumber = typeof args[1] === 'boolean' && args[1]
  if (returnNumber) return parseFloat(r(a).slice(0, -3))
  const b = typeof args[1] === 'number' ? `${args[1]}` : undefined
  const c = typeof args[2] === 'number' ? `${args[2]}` : undefined
  const d = typeof args[3] === 'number' ? `${args[3]}` : undefined
  if (a && b && c && d) return `${r(a)} ${r(b)} ${r(c)} ${r(d)}`
  if (a && b && c) return `${r(a)} ${r(b)} ${r(c)}`
  if (a && b) return `${r(a)} ${r(b)}`
  return `${r(a)}`
}

export default typography
export const scale = typography.scale
