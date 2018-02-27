import * as R from 'ramda'

import { relativeStamp } from '../utils/time'

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

function ChatPreview ({ key, date, name, msg }) {
  return (
    `<div class="user" data-key="${key}">
      <div class="left">
        <div class="icon">
          <span class="letters">${getSubName(name)}</span>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <span class="name">${name}</span>
          <span class="time">${relativeStamp(date)}</span>
        </div>
        <div class="bottom">
          <span class="msg-preview">${msg}</span>
        </div>
      </div>
    </div>`
  )
}

export default ChatPreview