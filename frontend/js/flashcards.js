import Experience from './experience.js'

class Flashcard {
    constructor(term, definition) {
        this.id = new Experience().idGen.newID();
        this.term = term;
        this.definition = definition;
        this.generalMemValue = 0;
        this.learnVal = 0;
    }
}

export default class Flashcards {
    constructor() {
        this.flashcards = [];
        this.flashcardMap = {}
    }

    //adds flashcard to end of array and at id of hashmap
    addFlashcard(term, def) {
        const a = new Flashcard(term, def)
        this.flashcards.push(a)
        this.flashcardMap[a.id] = a
        return a;
    }

    //expect flashcard class    O(n)
    getNextLearn(flashcard) {
        flashcard.learnVal++;

        let result = []
        let least = 0

        for (let i = 0; i < this.flashcards.length; i++) {
            if (this.flashcards[i].learnVal < least) {
                least = this.flashcards[i].learnVal;
            }
        }

        for (let i = 0; i < this.flashcards.length; i++) {
            result.push(this.flashcards[i])
        }

        return result[Math.floor(Math.random() * result.length)]
    }

    resetLearn() {
        for (let i = 0; i < this.flashcards.length; i++) {
            this.flashcards[i].learnVal = 0
        }
    }

    //fetches random flashcard
    getRandom() {
        return this.flashcards[Math.floor(Math.random()) * this.flashcards.length]
    }
}