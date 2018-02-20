import * as R from 'ramda'

export function updateByValue <T> (oldVal: T, newVal: T) {
  return R.converge(
    R.update(R.__, newVal),
    [
      R.findIndex(R.equals(oldVal)),
      R.identity,
    ],
  )
}
