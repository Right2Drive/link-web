import Icon from './Icon'
import { relativeStamp } from '../utils/time'

function ChatPreview ({ key, date, name, msg }) {
  return (
    `<div class="user" data-key="${key}">
      <div class="left">
        ${Icon({ name })}
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
