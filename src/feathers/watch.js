import { usersActions } from '../store/modules/users'
import { messagesActions } from '../store/modules/messages'

function watch (api, dispatch) {
  // Watch messages for updates/creates
  api.messages.on('created', message =>
    dispatch(messagesActions.createMessages(message)))
  api.messages.on('updated', message =>
    dispatch(messagesActions.updateMessages(message)))
  api.messages.on('patched', message =>
    dispatch(messagesActions.patchMessages(message)))

  // Watch users for updates/creates
  api.users.on('created', user =>
    dispatch(usersActions.createUsers(user)))
  api.users.on('updated', user =>
    dispatch(usersActions.updateUsers(user)))
  api.users.on('patched', user =>
    dispatch(usersActions.patchUsers(user)))
}

export default watch
