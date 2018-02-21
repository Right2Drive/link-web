import * as R from 'ramda'

export function setClassList (el, classList) {
  el.className = R.join(' ', classList)
}

export function getClassList (el) {
  const { className } = el

  return R.split(' ', className)
}
