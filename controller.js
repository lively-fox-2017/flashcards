'use strict'
const Model = require('./model');
const View = require('./view');
const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

class Controller {
  constructor(deck){
    this.model = new Model(deck);
    this.view = new View();
  }

  run(){
    //console.log(this.view);
    rl.question(this.view.outputQuestion(this.model.returnQuestion(this.model.indexNow)), (answer)=>{
      if(this.model.checkAnswer(answer, this.model.indexNow)){
        this.model.markAsAnswered(this.model.indexNow);
        this.model.nextQuestion();
      }else{
        this.model.wrongAnswer();
        this.view.wrongAnswer(this.model.faileAttempt);        
      }

      if(!this.model.isLost()){
        if(this.model.isAllAnswered()){
          rl.close();
          this.finished();
        }else{
          this.run();
        }
      }else{
        rl.close();
        this.lost();
      }
      //rl.close();

    })
  }

  lost(){
    this.view.lostMessage();
  }

  finished(){
    this.view.finishedMessage();
  }
}

module.exports = Controller
