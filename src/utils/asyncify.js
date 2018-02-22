import * as R from 'ramda'

export default function asyncify (fn, context, ...args) {
  setTimeout(() => R.bind(fn, context)(...args), 0)
}
