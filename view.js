"use strict"

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Controller = require('./controller');

class View {
	static welcomeMessage() {
		console.log('MARI BERMAIN FLASHCARD!');
		console.log('Tulis jawaban yang benar atau tulis "skip" untuk melewati pertanyaan sementara');
		console.log('----------------------------------------------');
	}

	static closingMessage(session) {
		console.log('PERMAINAN SELESAI');
		console.log('SKOR AKHIR:', session.correct * 10);
		console.log('----------------------------------------------');
		rl.close();
	}

	static jawabanSkip(session) {
		console.log('Coba di kesempatan berikutnya ...');
		console.log('----------------------------------------------');
	}

	static jawabanBenar(session) {
		console.log('Jawaban benar!');
		console.log('Skor sementara: ', session.correct * 10);
		console.log('----------------------------------------------');
	}

	static jawabanSalah(session) {
		console.log('Jawaban salah!');
		if (3 + session.miss > 0) {
			console.log('Kesempatan kamu ', 3 + session.miss, ' kali lagi!');
		}
		console.log('----------------------------------------------');
	}

	static showQuestion(session) {
		return new Promise((resolve, reject) => {
			rl.question(session.currentQuestion.definition + '\n=> ', answer => {
				let obj = { session: session,
						answer: answer
					};
				resolve(obj);
			});
		});
	}


}

module.exports = View;