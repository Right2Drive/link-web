import './style/index.less'
import store from './store'
import initView from './view'
import initStore from './store/init'

window.addEventListener('load', async () => {
  store.dispatch(initStore())
  initView()
})
