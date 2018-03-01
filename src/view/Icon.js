import * as R from 'ramda'
import * as classNames from 'classnames'

/**
 *
 * @param {string} name
 */
function getSubName (name) {
  return R.pipe(
    R.split(' '),
    R.map(R.pipe(
      R.head,
      R.toUpper
    )),
    R.take(2),
    R.join('')
  )(name)
}

function Icon ({ name, sm = false, lg = false }) {
  return (
    `<div class="${classNames(
      'user-icon',
      { large: lg },
      { small: sm }
    )}">
      <span class="letters">${getSubName(name)}</span>
    </div>`
  )
}

export default Icon
