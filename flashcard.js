'use strict'
const Controller =require('./controller')

class Flashcard {
  constructor() {}

  choice(deck) {
    let game = new Controller(deck);
    
    if(deck.length > 0) {
      //your code here
      game.showQuiz(0)

    } else {
      game.noDeck()
      // console.log("Please input choice deck");
    }
  }
}

let deck = process.argv.slice(2)

let flashcard = new Flashcard();
flashcard.choice(deck)
