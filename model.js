const fs=require('fs')
class Model {
  static loadQuestions(deck,cb){
    let path=deck+'.json'
    fs.readFile(path,'utf-8', (err, data) => {
      if (err) throw err;
      // console.log(data);
      let arr=JSON.parse(data)
      cb(arr);
    });
  }
  // readData(cb){
  //   fs.readFile(path, 'utf8', (err, data) => {
  //     if (!err) {
  //       let arr=JSON.parse(data);
  //       cb(err,arr);
  //     } else {
  //       throw err;
  //     }
  //   })
  // }
}

module.exports = Model
