import Component from './Component'

const Users = Object.assign(Object.create(Component), {
  usersQuery: null
})

export default function createUsers (props) {
  const self = Object.create(Component, Users)
  self.initComponent(props)
  self.usersQuery = `${props.sidebarId} > .users`

  return self
}
