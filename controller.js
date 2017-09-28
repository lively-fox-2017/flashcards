const model=require('./model');
const view=require('./view');
const rl=require('readline');
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'flashcard'
});
class Controller {
  constructor(){
    this.questions;
    this.countQuestions;
    this.countQuestionsRight;
    this.gameOption;
  }
  selectGame(param){
    this.gameOption=param;
    model.loadQuestions(this.gameOption,(data)=>{
      this.questions=data.map(x=>{
        return {"definition": x.definition, "term": x.term, "status":0}
      });
      view.resetScreen();
      this.countQuestions=this.questions.length;
      this.countQuestionsRight=0;
      this.start();
    });
  }
  nextQuestion(){
    let randomQuestion=this.questions.filter(q=>{
          return q.status==0;
        });
        // console.log('index=',Math.floor(Math.random()*(randomQuestion.length-1)));
    if (randomQuestion.length==0) {
        return randomQuestion[0];
    } else {
      return randomQuestion[Math.floor(Math.random()*(randomQuestion.length-1))];
    }
  }
  setQuestionDone(question,status){
    let newQuestions=this.questions.map(x=>{
      // console.log(x.definition+'=='+question);
      if (x.definition==question) {
        x.status=status;
      }
      return x
    })
    this.questions=newQuestions;
  }
  start(){
    let question=this.nextQuestion();
    readline.question(question.definition+'\n',(answer)=>{
      // console.log('------------',question[1]);
      if (answer.toLowerCase()==question.term.toLowerCase()) {
        view.showMessage('jawaban anda benar!');
        this.setQuestionDone(question.definition,1);
        this.countQuestions--;
        this.countQuestionsRight++;
        // this.start()
      } else
      if (answer.toLowerCase()=='skip') {
        this.start();
      } else {
        view.showMessage('jawaban anda salah!');
        this.setQuestionDone(question.definition,2);
        this.countQuestions--;
        // this.start();
      }
      if (this.countQuestions==0) {
        view.setNewLine();
        view.showResult([this.countQuestionsRight,this.questions.length]);
        view.setNewLine();
        readline.question('tekan enter untuk mengakhiri atau tekan r untuk mencoba lagi ',(answer)=>{
          // console.log('dsfs');
          if (answer.toLowerCase()=='r'){
            view.resetScreen();
            this.selectGame(this.gameOption);
          } else {
            readline.close();
          }
        })
      } else {
        view.setNewLine();
        this.start();
      }
    })
  }
}

module.exports = Controller
