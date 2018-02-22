import Component from './Component'
import Users from './Users'
import UserToolbar from './UserToolbar'

const Sidebar = Object.assign(Component(), {
  id: 'side-bar',
  users: null,
  toolbar: null,

  initSidebar (props) {
    this.initComponent(props)
    this.toolbar = UserToolbar.initUserToolbar({})
    this.users = Users.initUsers({
      sidebarId: this.id
    })
  }
})

export default Sidebar
