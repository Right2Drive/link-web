import * as R from 'ramda'

function getSubName (name) {
  return R.pipe(
    R.split(' '),
    R.map(R.pipe(
      R.head,
      R.toUpper
    )),
    R.take(2),
    R.join('')
  )(name)
}

const User = {

  findUser (state) {
    R.find(
      R.propEq('user', this.user)
    )(state.users)
  },

  render () {
    const { key, timestamp, name, msg } = this.props
    return (
      `<div class="user k-${key}">
        <div class="left">
          <div class="icon">
            <span class="letters">${getSubName(name)}</span>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span class="name">${name}</span>
            <span class="time">${timestamp}</span>
          </div>
          <div class="bottom">
            <span class="msg-preview">${msg}</span>
          </div>
        </div>
      </div>`
    )
  }
}

export default () => Object.create(User)
