import Notes from './notes.js'
import NoteEditor from './note-editor.js'

export default class Experience {
    static instance;
    constructor () {
        if(Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this;
        this.notes = new Notes()
        this.noteEditor = new NoteEditor(document.getElementById("noteEditor"));
    }
}