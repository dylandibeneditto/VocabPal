import PseudoID from './utils/pseudo-id.js'
import Notes from './notes.js'

export default class Experience {
    static instance;
    constructor () {
        if(Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this;
        this.idGen = new PseudoID()

        this.notes = new Notes()
        this.noteEditor = new Quill('#noteEditor', {
            modules: {toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
            ]},
            placeholder: "new note...",
            theme: 'snow',
        });
        //this.noteEditor = new NoteEditor(document.getElementById("noteEditor"));
    }
}