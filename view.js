class View {
  showQuestion(data){
    console.log(data);
  }
  showResult(data){
    console.log(`score anda adalah ${data[0]} dari ${data[1]} soal`);
  }
  resetScreen(){
    console.log("\x1B[2J");
  }
  setNewLine(){
    console.log();
  }
  showMessage(mssg){
    console.log(mssg);
  }
}

module.exports = new View
