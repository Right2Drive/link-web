import Component from './Component'
import ChatPreviewList from './ChatPreviewList'
import UserToolbar from './UserToolbar'

const Sidebar = Object.assign(Component(), {
  id: 'side-bar',
  users: null,
  toolbar: null,

  initSidebar (props) {
    this.initComponent(props)
    this.toolbar = UserToolbar.initUserToolbar({})
    this.users = ChatPreviewList.initChatPreviewList({
      sidebarId: this.id
    })
  }
})

export default Sidebar
