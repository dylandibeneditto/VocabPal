import PseudoID from './utils/pseudo-id.js'
import Notes from './notes.js'
import Flashcards from './flashcards.js'

export default class Experience {
    static instance;
    constructor() {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this;
        this.idGen = new PseudoID()

        this.flashcards = new Flashcards();

        this.noteEditor = new Quill('#noteEditor', {
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block'],
                ]
            },
            theme: 'snow',
        });
        this.notes = new Notes()
        //this.noteEditor = new NoteEditor(document.getElementById("noteEditor"));
    }
}