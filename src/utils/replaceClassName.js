import * as R from 'ramda'

import { updateByValue } from './updateByValue'
import { getClassList, setClassList } from './classList'

export default function replaceClassName (getEl, oldVal, newVal) {
  if (oldVal === newVal) return

  const el = getEl()

  return R.converge(
    setClassList,
    [
      R.identity,
      R.pipe(
        getClassList,
        updateByValue(oldVal, newVal)
      )
    ]
  )(el)
}
