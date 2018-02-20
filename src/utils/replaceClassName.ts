import * as R from 'ramda'

import { updateByValue } from './updateByValue'
import { getClassList, setClassList } from './classList'

export function updateClassName (getEl: () => HTMLElement, oldVal: string, newVal: string) {
  const el = getEl()

  return R.converge(
    setClassList,
    [
      R.identity,
      R.pipe(
        getClassList,
        updateByValue(oldVal, newVal),
      ),
    ],
  )(el)
}
