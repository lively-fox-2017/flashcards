const fs = require('fs');

class Model {
  constructor() {
    this.deckData = "";
  }
  fillData(deck, cb) {
    if (deck === 'social') {
      this.getDataSocial(function() {
        cb();
      })
    } else {
      this.getDataLogical(function() {
        cb();
      })
    }
  }
  getDataLogical(cb) {
    var data = fs.readFile('logical.json', 'utf8', function(err, contents) {
      this.deckData = JSON.parse(contents);
      cb();
    }.bind(this));
  }
  getDataSocial(cb) {
    var data = fs.readFile('social.json', 'utf8', function(err, contents) {
      this.deckData = JSON.parse(contents);
      cb();
    }.bind(this));
  }
}

module.exports = Model
