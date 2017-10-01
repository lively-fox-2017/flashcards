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
}

module.exports = View
