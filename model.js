'use strict'

const Controller = require('./controller')
const fs = require('fs')

class Model {
  static getData(deck) {
    return JSON.parse(fs.readFileSync(`./${deck}.json`))
  }
}

module.exports = Model
