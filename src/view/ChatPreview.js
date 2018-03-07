import Icon from './Icon'
import { relativeStamp } from '../utils/time'

// TODO: remove
import '../style/sidebar.less'

function ChatPreview ({ date, name, msg, userId, connected }) {
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
          <div class="status ${connected ? 'online' : 'offline'}"></div>
        </div>
      </div>
    </div>`
  )
}

export default ChatPreview
