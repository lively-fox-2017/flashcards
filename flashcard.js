Class Flashcard {
  constructor() {}
  
  choice(deck) {
    if(deck.length > 0) {
      let game = new Controller(deck);
      //your code here
    } else {
      console.log("Please input choice deck");
    }
  }
}

let deck = process.argv.slice(2)

let flashcard = new Flashcard();
flashcard.choice(deck)
