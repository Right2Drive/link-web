import * as R from 'ramda'

import Component from './Component'
import { usersThunks } from '../store/modules/users'
import { messagesThunks } from '../store/modules/messages'

const MessageBar = Object.assign(Component(), {
  messageInputQuery: null,
  messageSendQuery: null,
  /** @type {HTMLInputElement} */
  input: null,
  /** @type {HTMLButtonElement} */
  sendBtn: null,

  initMessageBar (props) {
    this.initComponent(props)

    this.messageInputQuery = `#${props.chatId} .send-msg-input`
    this.messageSendQuery = `#${props.chatId} .send-msg-btn`

    this.inputKeyDown = R.bind(this.inputKeyDown, this)
    this.sendBtnClick = R.bind(this.sendBtnClick, this)
    this.send = R.bind(this.send, this)
    this.evokeCommand = R.bind(this.evokeCommand, this)
  },

  async inputKeyDown ({ key, shiftKey }) {
    if (key === 'Enter') {
      if (shiftKey) {
        // TODO: Allow multi-line messages
      } else {
        this.submit()
      }
    }
  },

  async sendBtnClick () {
    this.submit()
  },

  async submit () {
    const val = this.input.value
    R.ifElse(
      R.pipe(
        R.head,
        R.equals('/')
      ),
      await this.evokeCommand,
      await this.send
    )(val)

    this.input.value = ''
  },

  async evokeCommand (input) {
    const [cmd, payload] = R.converge(
      R.pipe(
        // Split cmd and payload
        R.splitAt,
        // Remove the /
        R.adjust(R.tail, 0)
      ),
      [
        // Index to split at
        R.indexOf(' '),
        R.identity
      ]
    )(input)

    switch (cmd) {
      case 'nick': {
        await this.dispatch(usersThunks.changeName(payload))
      }
    }
  },

  async send (val) {
    await this.dispatch(messagesThunks.sendMessage(val))
  },

  render () {
    // TODO: Remove duplicate code
    const inputListeners = {
      keydown: [this.inputKeyDown]
    }
    const sendBtnListeners = {
      click: [this.sendBtnClick]
    }
    if (this.input) {
      R.mapObjIndexed(
        (eventListeners, event) => R.map(l => this.input.removeEventListener(event, l), eventListeners)
      )(inputListeners)
    }
    if (this.sendBtn) {
      R.mapObjIndexed(
        (eventListeners, event) => R.map(l => this.sendBtn.removeEventListener(event, l), eventListeners)
      )(sendBtnListeners)
    }
    this.input = document.querySelector(this.messageInputQuery)
    this.sendBtn = document.querySelector(this.messageSendQuery)
    R.mapObjIndexed(
      (eventListeners, event) => R.map(l => this.input.addEventListener(event, l), eventListeners)
    )(inputListeners)
    R.mapObjIndexed(
      (eventListeners, event) => R.map(l => this.sendBtn.addEventListener(event, l), eventListeners)
    )(sendBtnListeners)
  }
})

export default MessageBar
