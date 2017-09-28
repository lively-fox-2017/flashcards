const Controller = require('./controller.js')

class Flashcard {
  constructor() {

  }

  choice(deck) {
    if(deck.length > 0) {
      let game = new Controller(deck[0]);
      game.getDeck(function(){
        game.startGame();
        //DISINI BARU START GAME
      })
      //your code here
    } else {
      console.log("Please input choice deck");
    }
  }
}

let deck = process.argv.slice(2)

let flashcard = new Flashcard();
flashcard.choice(deck)
