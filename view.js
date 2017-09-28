class View {
  constructor() {

  }
  showWelcome() {
    console.log("\x1B[2J")
    console.log('Welcome to JS Flash Cards. To play, just enter the correct term for each definition. Ready? Go !\n');
  }
  showGameOver() {
    console.log('Game Over :(');
  }
  showAnswer(boolean) {
    if(boolean) {
      console.log('Correct answer.');
    }
    else{
      console.log('Wrong answer. Try again or skip');
    }
  }
  showWinner() {
    console.log('CONGRATS');
  }
}

module.exports = View
