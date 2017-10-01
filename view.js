'use strict'

const readline = require('readline')
const rl = readline.createInterface({input: process.stdin,output: process.stdout});


class View {
  static showQuiz(quiz,callback){
    rl.question(`${quiz.definition}\n`, (answer)=>{
        callback(answer)
    })
  }

  static noDeck(){
    console.log("Please input choice deck");
    rl.close()
  }

  static showBenar(){
    console.log('Cendol Gan');
    console.log('=================================');
  }

  static showSalah(salah){
    console.log(`Bata merah Gan ... udah ${salah} kali salah`);
    console.log('=================================');
  }

  static showGameover(benar,salah){
    console.log('GAME OVER');
    console.log('=================================');
    console.log(`Total Benar : ${benar}`);
    console.log(`Total Salah : ${salah}`);
    rl.close()
  }

  static showFinish(benar , salah){
    console.log('END');
    console.log('=================================');
    console.log(`Total Benar : ${benar}`);
    console.log(`Total Salah : ${salah}`);
    rl.close()
  }
}

module.exports = View
