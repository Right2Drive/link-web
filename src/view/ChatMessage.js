import * as classNames from 'classnames'

import { relativeStamp } from '../utils/time'
import getAccessibleText from '../utils/getAccessibleText'

function ChatMessage ({ message, date, backgroundColor, name, outgoing, tail = false }) {
  const accessibleTxtColor = getAccessibleText(backgroundColor)
  const accessibleTxtRBG = `rgb(${accessibleTxtColor.r},${accessibleTxtColor.g},${accessibleTxtColor.b})`
  const backgroundRGB = `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b})`

  return (
    `<div style=background-color:${backgroundRGB};color:${accessibleTxtRBG} class="${classNames(
      'msg-container',
      { tail: tail },
      { outgoing: outgoing },
      { incoming: !outgoing }
    )}">
      ${outgoing ? '' : `<h1 class="name">${name}</h1>`}
      <span class="msg">${message}</span>
      <span class="timestamp">${relativeStamp(date)}</span>
    </div>`
  )
}

export default ChatMessage
