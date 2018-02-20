import * as R from 'ramda'

export function setClassList (el: HTMLElement, classList: string[]) {
  el.className = R.join(' ', classList)
}

export function getClassList (el: HTMLElement) {
  const { className } = el

  return R.split(' ', className)
}
