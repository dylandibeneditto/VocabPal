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
            modules: {toolbar: '#toolbar'},
            placeholder: "new note...",
            theme: 'snow',
        });
        //this.noteEditor = new NoteEditor(document.getElementById("noteEditor"));
    }
}