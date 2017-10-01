"use strict"

const Model = require('./model');
const View = require('./view');

class Controller {
	static start(deck) {
		return Model.initGame(deck)
					.then(() => {
						View.welcomeMessage();
					});
	}

	static play() {
		let newSession;

		return Model.readSession()
					.then(session => {
						newSession = Model.randomizeQuestion(session);
						return Model.evaluateStatus(newSession);
					})
					.then(newSession => {
						return View.showQuestion(newSession);
					})
					.then(obj => {
						let result = Model.evaluateAnswer(obj);
						newSession = result[0];

						if (result[1] === 'skipped') {
							View.jawabanSkip(newSession);
						}
						else if (result[1] === 'benar') {
							View.jawabanBenar(newSession);
						}
						else { 
							View.jawabanSalah(newSession);
						}
						return Model.writeSession(newSession);
					})
					.then(() => {
						return this.play();
					})
					.catch(session => {
						if (session.isGameOver || session.isNoMoreQuestion) {
							return View.closingMessage(session);
						}
					});
	}
}

module.exports = Controller;