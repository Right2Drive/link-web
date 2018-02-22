import Component from './Component'
import Users from './Users'
import UserToolbar from './UserToolbar'

const Sidebar = Object.assign(Component(), {
  id: 'side-bar',
  users: null,
  toolbar: null,

  initSidebar (props) {
    this.initComponent(props)
    this.toolbar = Object.create(UserToolbar).initUserToolbar({})
    this.users = Object.create(Users).initUsers({
      sidebarId: this.id
    })
  }
})

export default Sidebar
