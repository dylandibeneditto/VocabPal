class Flashcard {
    constructor(term, definition) {
        this.term = term;
        this.definition = definition;
        this.generalMemValue = 0;
        this.learnVal = 0;
    }
}

export default class Flashcards {
    constructor() {
        this.flashcards = [new Flashcard("hello", "1"), new Flashcard("hello", "2"), new Flashcard("hello", "3")];
        console.log(this.getNextLearn(this.getRandom()))
    }

    //adds flashcard to end of array
    addFlashcard(term, def) {
        this.flashcards.push(new Flashcard(term, def))
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



    //fetches random flashcard
    getRandom() {
        return this.flashcards[Math.floor(Math.random()) * this.flashcards.length]
    }
}