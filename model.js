"use strict"

const fs = require('fs');

class Model {
	static readSession() {
		return new Promise((resolve, reject) => {
			fs.readFile('./session.json', (err, session) => {
				if (err) reject(err);
				resolve(JSON.parse(session));
			});
		});
	}

	static writeSession(session) {
		return new Promise((resolve, reject) => {
			session = JSON.stringify(session, null, 4);
			fs.writeFile('./session.json', session, err => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	static loadDeck(deck) {
		return new Promise((resolve, reject) => {
			const rand = Math.round(Math.random()) === 1 ? 'social' : 'logical';
			const file = './' + (deck ? deck : rand) + '.json';

			fs.readFile(file, (err, deck) => {
				if (err) reject(err);
				resolve(JSON.parse(deck));
			});
		});
	}

	static randomizeQuestion(session) {
		const isGameOver = miss => miss < -2 ? true : false;
		let randomizeQuestionIdx = Math.round(Math.random() * (session.deck.length - 1));
		let randomQuestion = session.deck.splice(randomizeQuestionIdx, 1)[0];
		let newSession = {
			deck: session.deck,
			correct: session.correct,
			miss: session.miss,
			currentQuestion: randomQuestion,
			isGameOver: isGameOver(session.miss),
			isNoMoreQuestion: randomQuestion ? false : true
		};

		return newSession;
	}

	static skipQuestion(session) {
		let randomizeQuestionIdx = Math.round(Math.random() * (session.deck.length - 1));
		let randomQuestion = session.deck.splice(randomizeQuestionIdx, 1)[0];
		session.deck.push(session.currentQuestion);
		let newSession = {
			deck: session.deck,
			correct: session.correct,
			miss: session.miss,
			currentQuestion: randomQuestion,
			isGameOver: session.isGameOver,
			isNoMoreQuestion: session.isNoMoreQuestion
		};

		return newSession;
	}

	static evaluateAnswer(obj) {
		if (obj.answer.toLowerCase() === 'skip') {
			return [this.skipQuestion(obj.session), 'skipped']
		} else if (obj.answer.toLowerCase() === obj.session.currentQuestion.term.toLowerCase()) {
			return [this.manipulateScore(obj.session, 1, 0), 'benar'];
		} else {
			return [this.manipulateScore(obj.session, 0, -1), 'salah'];
		}
	}

	static evaluateStatus(session) {
		return new Promise((resolve, reject) => {
			if (session.isGameOver) {
				reject(session);
			} else if (session.isNoMoreQuestion) {
				reject(session);
			} else {
				resolve(session);
			}
		});
	}

	static manipulateScore(session, correct, miss) {
		return {
			deck: session.deck,
			correct: session.correct + (correct),
			miss: session.miss + (miss),
			currentQuestion: session.currentQuestion,
			isGameOver: session.isGameOver,
			isNoMoreQuestion: session.isNoMoreQuestion
		};
	}

	static initGame(deck) {
		return this.loadDeck(deck)
					.then(deck => {
						let startSession = {
							deck: deck,
							correct: 0,
							miss: 0,
							currentQuestion: null,
							isGameOver: false,
							isNoMoreQuestion: false
						};
						return this.writeSession(startSession);
					});
	}
}

module.exports = Model;