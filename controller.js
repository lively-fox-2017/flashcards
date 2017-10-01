'use strict'

const Model = require('./model')
const View = require ('./view')

class Controller {
  constructor(deck){
    this.deck = deck
    this.answer=[]
    this.wrong=[]
    this.index=0
  }

  noDeck(){
    View.noDeck()
  }

  nextIndex(index){
    let quiz = Model.getData(this.deck)
    if(this.wrong.length==3){ //3x salah game over
      View.showGameover(this.answer.length - this.wrong.length , this.wrong.length)
      return
    } else {
      while(this.answer.length < quiz.length){ //mencari index yg belum dijawab
        if ( index >= quiz.length)  { // kembali ke index awal
          index=0
        }
        if(this.answer.indexOf(index)!=-1){ //jika ditemukan cari next index
          index++
        }
        else{
          return index
        }
      }
    }

  }

  showQuiz(index){
    let quiz = Model.getData(this.deck)
    if(quiz[index]){
      this.index = index
      View.showQuiz(quiz[this.index],(answer)=>{
          let quiz = Model.getData(this.deck)
          if (answer=='skip'){ //skip ke next index
            this.index ++
            this.index = this.nextIndex(this.index)
            this.showQuiz(this.index )
          } else {
            if (quiz[this.index].term==answer){
              View.showBenar()
              this.answer.push(this.index)
              this.index = this.nextIndex(this.index)
              this.showQuiz(this.index )
            }
            else if(quiz[this.index].term!=answer){
              this.answer.push(this.index)
              this.wrong.push(this.index)
              View.showSalah(this.wrong.length)
              this.index = this.nextIndex(this.index)
              this.showQuiz(this.index )
            }
          }
      })
    }
    if(this.answer.length==quiz.length){ //jika pertanyaan habis
      View.showFinish( this.answer.length - this.wrong.length , this.wrong.length)
    }
  }


}

module.exports = Controller
