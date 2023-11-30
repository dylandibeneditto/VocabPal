class Flashcard {
    constructor(term, definition) {
        this.term = term;
        this.definition = definition;
    }
}

export default class Flashcards {
    constructor() {
        this.flashcards = [];
    }

    addFlashcard(term, def) {
        this.flashcards.push(new Flashcard(term, def))
    }

    
}