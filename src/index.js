import './style/index.less'
import store from './store'
import initView from './view'
import initStore from './store/init'
import { chatActions } from './store/modules/chat'

// TODO: Remove
import './style/drawer.less'

window.addEventListener('load', async () => {
  store.dispatch(initStore())
  window.addEventListener('keydown', ({ key }) => key === 'Escape' && store.dispatch(chatActions.clearActiveUser()))
  initView()
})
