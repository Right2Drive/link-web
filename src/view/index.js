import Drawer from './Drawer'
import UserToolbar from './UserToolbar'
import Overlay from './Overlay'

export default function init () {
  Drawer.initDrawer()
  UserToolbar.initUserToolbar()
  Overlay.initOverlay()
}
