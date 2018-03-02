import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'

import config from '../../config'

const client = feathers()
const socket = io(config.url, {
  transports: ['websocket'],
  forceNew: true
})
client.config(socketio(socket))

export default {
  messages: client.service('messages'),
  users: client.service('users'),
  groups: client.service('group')
}
