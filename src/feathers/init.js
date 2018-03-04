async function init (api) {
  return {
    messages: await api.messages.find(),
    users: await api.users.find()
    // groups: await api.groups.find()
  }
}

export default init
