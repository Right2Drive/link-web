import * as io from 'socket.io-client'
import * as feathers from '@feathersjs/feathers'
import * as socketio from '@feathersjs/socketio-client'

import config from '../config'

const client = feathers()
const socket = io(`${config.url}${typeof config.port !== 'undefined' ? `:${config.port}` : ''}`, {
  transports: ['websocket'],
  forceNew: true
})
client.configure(socketio(socket))

export default {
  messages: client.service('messages'),
  users: client.service('users')
  // groups: client.service('groups')
}
