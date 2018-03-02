import * as R from 'ramda'

import Component from './Component'

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
  },

  inputKeyDown ({ key, shiftKey }) {
    if (key === 'Enter') {
      if (shiftKey) {
        // TODO: Allow multi-line messages
      } else {
        this.submit()
      }
    }
  },

  sendBtnClick () {
    this.submit()
  },

  submit () {
    const val = this.input.value
    R.ifElse(
      R.pipe(
        R.head,
        R.equals('/')
      ),
      this.evokeCommand,
      this.send
    )(val)

    this.input.value = ''
  },

  evokeCommand (cmd) {
    console.log(`command: ${cmd}`)
  },

  send (val) {
    console.log(`send: ${val}`)
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
