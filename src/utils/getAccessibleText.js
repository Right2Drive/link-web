import * as R from 'ramda'

export default function getAccessibleText ({ r, g, b }) {
  return R.pipe(
    R.reduce(R.add, 0),
    R.divide(R.__, 1000),
    R.ifElse(
      R.gte(R.__, 125),
      R.always({ r: 0, g: 0, b: 0 }),
      R.always({ r: 255, g: 255, b: 255 })
    )
  )([
    R.multiply(r, 299),
    R.multiply(g, 587),
    R.multiply(b, 114)
  ])
}
