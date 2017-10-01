'use strict'

class View {
  constructor(){

  }

  outputQuestion(question){
    return question+'\n >>>'
  }

  finishedMessage(){
    console.log('You Win!');
  }

  lostMessage(){
    console.log('Sorry you Lost!');
  }

  wrongAnswer(attempt){
    console.log(`Attempt left ${4-attempt}`);
  }
}

module.exports = View
