import Experience from './experience.js'

class Note {
    constructor(title, innerHTML) {
        this.experience = new Experience();
        this.id = this.experience.idGen.newID()
        this.title = title
        this.html = innerHTML;
    }
}

export default class Notes {
    constructor() {
        this.notes = [new Note("new note!", document.getElementById("noteEditor"))]
        this.selectedIndex = 0;
        this.selectedNote = this.notes[this.selectedIndex]
        console.log(this.selectedNote)
    }

    updateTitle(newTitle) {
        this.selectedNote.title = newTitle;
    }
}