'use strict'
const fs = require('fs');

class Model {
  constructor(deck){
    this.deck = this.deckBuild(deck[0]);
    this.answeredQuestion = this._setEmptyAnswered();
    this.indexNow = 0;
    //console.log(this.returnQuestion(1));
    //console.log(this.answeredQuestion);
  }

  markAsAnswered(index){
    this.answeredQuestion[index]=true;
  }

  _setEmptyAnswered(){
    let arr=[];
    for(let i =0; i<this.deck.length; i++){
      arr.push(false);
    }
    return arr;
  }

  checkAnswer(answer, index){
    return answer==this.deck[index].term
  }

  isAllAnswered(){
    for(let i in this.deck){
      if(this.deck[i]==false){
        return false;
      }
    }
    return true;
  }

  nextQuestion(){
    let nextIndex = this.indexNow;
    if(this.isAllAnswered()){
      while(true){
        if(nextIndex>=this.deck.length){
          nextIndex=0;
        }else{
          nextIndex++;
        }

        if(this.answeredQuestion[nextIndex]==false){
          this.indexNow=nextIndex;
          break;
        }
      }
    }
  }

  deckBuild(deck){
    switch(deck){
      case 'social':
        return this.parseFlashCardToObj('social.json');
        break;
      case 'logical':
        return this.parseFlashCardToObj('logical.json');
        break;
    }
  }

  parseFlashCardToObj(fileName){
    let stringForm = fs.readFileSync(fileName, 'utf8');
    let objForm = JSON.parse(stringForm);
    return objForm;
  }

  returnQuestion(index){
    return this.deck[index].definition;
  }



}

module.exports = Model
