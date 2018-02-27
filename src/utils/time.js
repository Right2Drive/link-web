import * as R from 'ramda'
import * as moment from 'moment'

export const toLocalMoment = R.pipe(
  moment,
  m => m.local()
)

export const isToday = R.curry(date => {
  const now = moment().local()

  return R.pipe(
    toLocalMoment,
    R.allPass([
      m => R.equals(m.year(), now.year()),
      m => R.equals(m.dayOfYear(), now.dayOfYear())
    ])
  )(date)
})

export const isSameYear = R.curry(date => {
  const now = moment()

  return R.pipe(
    toLocalMoment,
    m => R.equals(m.year(), now.year())
  )(date)
})

export const formatTime = R.curry((template, date) => {
  return R.pipe(
    toLocalMoment,
    m => m.format(template)
  )(date)
})

export const formatTimestamp = formatTime('h:mm a')

export const formatDatestamp = formatTime('MMMM Do')

export const formatYearstamp = formatTime('YYYY.MM.DD')

export const relativeStamp = R.pipe(
  R.ifElse(
    isToday,
    formatTimestamp
  )(R.ifElse(
    isSameYear,
    formatDatestamp
  )(
    formatYearstamp
  ))
)
