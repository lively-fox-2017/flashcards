const View = require('./view.js');
const Model = require('./model.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">"
});

class Controller {
  constructor(deck) {
    this.type = deck;
    this.deckData = "";
    this.currentQuestion = 0;
    this.life = 3;
    this.totalBenar = [];
  }
  getDeck(cb) {
    var model = new Model();
    model.fillData(this.type, function() {
      this.deckData = model.deckData;
      cb();
    }.bind(this))
  }
  startGame() {
    this.welcome();
    this.nextQuestion();
  }
  masihAdaSoal() {

  }
  nextQuestion() {
    var self = this;
    if (this.life > 0) {
      this.showQuestion(function() {
        if (self.deckData.length === 0) {
          self.showWinner();
        } else {
          if (self.currentQuestion === self.deckData.length) {
            self.currentQuestion = 0;
          }
          self.nextQuestion();
        }
      })
    }
    else{
      this.showGameOver();
    }
  }
  welcome() {
    var view = new View();
    view.showWelcome();
  }
  showAnswer(boolean) {
    var view = new View();
    view.showAnswer(boolean);
  }
  showWinner() {
    var view = new View();
    view.showWinner();
    rl.close();
  }
  showQuestion(cb) {
    var self = this;
    rl.question(this.deckData[this.currentQuestion].definition + "\n", (answer) => {
      if (answer.trim() === 'skip') {
        self.currentQuestion += 1;
      } else {
        if (answer.trim().toLowerCase() == self.deckData[self.currentQuestion].term.toLowerCase()) {
          self.totalBenar.push(self.currentQuestion);
          self.deckData.splice(self.currentQuestion, 1);
          self.showAnswer(true);
        } else {
          self.life -= 1;
          self.showAnswer(false);
        }
      }
      cb()
    })
  }
  showGameOver() {
    var view = new View();
    view.showGameOver();
    rl.close();
  }
}

module.exports = Controller
