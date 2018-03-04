import Icon from './Icon'
import { relativeStamp } from '../utils/time'

function ChatPreview ({ date, name, msg, userId }) {
  return (
    `<div class="user" data-key="${userId}">
      <div class="left">
        ${Icon({ name })}
      </div>
      <div class="right">
        <div class="top">
          <span class="name">${name}</span>
          <span class="time">${relativeStamp(date)}</span>
        </div>
        <div class="bottom">
          <span style="${msg ? '' : 'font-style:italic'}" class="msg-preview">${msg || 'Send your first message!'}</span>
        </div>
      </div>
    </div>`
  )
}

export default ChatPreview
