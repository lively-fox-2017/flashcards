'use strict'
const Controller = require('./controller');

class Flashcard {
  constructor() {}

  choice(deck) {
    if(deck.length > 0) {
      if(deck=='social'||deck=='logical'){
        //console.log(asdas);
        let game = new Controller(deck);
        game.run();
      }else{
        console.log('wrong deck');
      }
      //your code here
    } else {
      console.log("Please input choice deck");
    }
  }
}

let deck = process.argv.slice(2)

let flashcard = new Flashcard();
flashcard.choice(deck)
