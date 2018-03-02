let config = null

switch (process.env.NODE_ENV) {
  case 'production': {
    config = require('./prod')
    break
  }

  default: {
    config = require('./dev')
  }
}

export default config
