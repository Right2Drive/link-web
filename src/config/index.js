let config = null

switch (process.env.NODE_ENV) {
  case 'production': {
    config = require('./prod').default
    break
  }

  default: {
    config = require('./dev').default
  }
}

export default config
