'use strict'
const path = require('path')

const debug = require('debug')('mcfg')
const includeAll = require('include-all')
const _ = require('lodash')

function loadUserConfig (userConfigPath, environment) {
  // config/*
  const otherConfigFiles = includeAll({
    dirname: userConfigPath,
    exclude: ['locales', /local\..+/],
    excludeDirs: /(locales|env)$/,
    filter: /^([^.]+)\.(?:(?!md|txt).)+$/,
    optional: true,
    flatten: true,
    keepDirectoryPath: true
  })
  debug('otherConfigFiles', otherConfigFiles)

  // config/local
  const localOverrideFile = _.values(includeAll({
    dirname: userConfigPath,
    filter: /local\..+$/,
    optional: true,
    flatten: true,
    keepDirectoryPath: true
  }))[0] || {}
  const env = environment || localOverrideFile.environment || 'development'
  debug('localOverrideFile', localOverrideFile)

  // config/env/**
  // Load environment-specific config folder, e.g. config/env/development/*
  // If there's an environment already set in sails.config, then it came from the environment
  // or the command line, so that takes precedence.  Otherwise, check the config/local.js file
  // for an environment setting.  Lastly, default to development.
  const envConfigFolder = includeAll({
    dirname: path.resolve(userConfigPath, 'env', env),
    filter: /^([^.]+)\.(?:(?!md|txt).)+$/,
    optional: true,
    flatten: true,
    keepDirectoryPath: true
  })
  debug('envConfigFolder', envConfigFolder)

  // config/env/*
  // Load environment-specific config file, e.g. config/env/development.js
  // If there's an environment already set in sails.config, then it came from the environment
  // or the command line, so that takes precedence.  Otherwise, check the config/local.js file
  // for an environment setting.  Lastly, default to development.
  const envConfigFiles = _.values(includeAll({
    dirname: path.resolve(userConfigPath, 'env'),
    filter: new RegExp('^' + _.escapeRegExp(env) + '\\..+$'),
    optional: true,
    flatten: true,
    keepDirectoryPath: true
  }))[0] || {}
  debug('envConfigFiles', envConfigFiles)

  // Merge the configs, with env/*.js files taking precedence over others, and local.js
  // taking precedence over everything
  const config = _.merge(
    otherConfigFiles,
    envConfigFolder,
    envConfigFiles,
    localOverrideFile
  )

  // Set the environment, but don't allow env/* files to change it; that'd be weird.
  config.environment = env

  // Return the user config
  return config
}

module.exports = function (userConfigPath, environment = process.env.NODE_ENV) {
  return loadUserConfig(userConfigPath, environment)
}
