type ValueKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const keys: ValueKeys[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const createBreakpoints = () => {
  const values = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  }
  const unit = 'px'
  const step = 5

  const up: BreakpointsUp = keys.reduce(
    (acc, k) => ({
      ...acc,
      [k]: () => `@media (min-width:${values[k]}${unit})`,
    }),
    {} as BreakpointsUp
  )

  const down: BreakpointsDown = keys.reduce(
    (acc, k, i) => {
      const endIndex = i + 1
      const upperbound = values[keys[endIndex]]

      if (endIndex === keys.length) {
        // xl down applies to all sizes
        return {
          ...acc,
          [k]: () => up['xs'](),
        }
      }

      return {
        ...acc,
        [k]: () => `@media (max-width:${upperbound - step / 100}${unit})`,
      }
    },
    {} as BreakpointsDown
  )

  return {
    up,
    down,
  }
}
