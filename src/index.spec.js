'use strict'
const path = require('path')

const {expect} = require('chai')

const load = require('.')

describe('mcfg', () => {
  const userConfigPath = path.join(__dirname, 'fixtures')

  it('should load NODE_ENV as config.environment', () => {
    let config

    config = load(userConfigPath)
    expect(config.environment).to.eql('test')

    config = load(userConfigPath, 'development')
    expect(config.environment).to.eql('development')
  })

  it('should load different env file based on environment', () => {
    let config

    // current NODE_ENV is "test"
    config = load(userConfigPath)
    expect(config.host).to.eql('localhost')

    config = load(userConfigPath, 'production')
    expect(config.host).to.eql('10.0.0.1')
  })

  it('should config/env/** override config/*', () => {
    let config

    config = load(userConfigPath)
    expect(config.blueprints.shortcuts).to.eql(true)

    config = load(userConfigPath, 'production')
    expect(config.blueprints.shortcuts).to.eql(false)
  })

  it('should config/env/* override config/env/**', () => {
    let config

    config = load(userConfigPath, 'production')
    expect(config.host).to.eql('10.0.0.1')
  })

  it('should config/local override config/env/*', () => {
    let config

    config = load(userConfigPath)
    expect(config.debug).to.eql(true)

    config = load(userConfigPath, 'production')
    expect(config.debug).to.eql(true)
  })
})
