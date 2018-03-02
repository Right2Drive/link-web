import Drawer from './Drawer'
import Overlay from './Overlay'
import Sidebar from './Sidebar'
import Chat from './Chat'

export default function init () {
  Drawer.initDrawer({})
  Overlay.initOverlay({})
  Sidebar.initSidebar({})
  Chat.initChat({})
}
