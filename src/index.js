import './style/index.less'
import store from './store'
import initView from './view'
import initStore from './store/init'
import { chatActions } from './store/modules/chat'

window.addEventListener('load', async () => {
  store.dispatch(initStore())
  window.addEventListener('keydown', ({ key }) => key === 'Escape' && store.dispatch(chatActions.clearActiveUser()))
  initView()
})
