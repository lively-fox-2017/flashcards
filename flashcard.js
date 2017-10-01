"use strict"

const Controller = require('./controller');
const rl = require('readline');

class Flashcard {
    static start() {
        const deck = process.argv.slice(2)[0];
        Controller.start(deck).then(() => {
          Controller.play()
        });
    }
}

Flashcard.start();