import Experience from './experience.js'

class Note {
    constructor(title) {
        this.experience = new Experience();
        this.id = this.experience.idGen.newID()
        this.title = title
        this.html = '';
    }
}

export default class Notes {
    constructor() {
        this.p = document.getElementById("noteEditor");
        this.t = document.getElementById("noteT");
        this.notes = [new Note("new note!")]
        this.selectedIndex = 0;
        this.selectedNote = this.notes[this.selectedIndex]
        this.loadNotesList();
        this.initListeners();
        this.selectNote(0);
    }

    loadNotesList() {
        const p = document.getElementById("noteList");
        p.innerHTML = '';
        for (let i = 0; i < this.notes.length; i++) {
            let n = this.notes[i];
            const es = document.createElement("span");
            es.classList.add("noteListItemIcon", "material-symbols-rounded");
            es.innerHTML = 'description';
            const et = document.createElement('div');
            et.id = `t${n.id}`;
            et.innerHTML = n.title;
            et.classList.add("noteListItemTitle");
            const ed = document.createElement("span");
            ed.id = `d${n.id}`;
            ed.classList.add("noteDragHandle", "material-symbols-rounded");
            ed.innerHTML = 'drag_handle';
            const e = document.createElement("div");
            e.id = `n${n.id}`
            e.classList.add("noteListItem");
            e.appendChild(es);
            e.appendChild(et);
            e.appendChild(ed);
            p.appendChild(e);
            e.addEventListener("mousedown", () => {
                this.selectedNote.html = this.p.innerHTML
                this.updateTitle(this.t.innerHTML);
                this.selectNote(i);
                this.p.innerHTML = this.selectedNote.html;
                this.t.innerHTML = this.selectedNote.title;
            })
        }
    }

    initListeners() {
        document.getElementById("addNote").addEventListener("mousedown", () => {
            this.notes.push(new Note("new note"))
            this.loadNotesList();
        })
        document.getElementById("delete").addEventListener("mousedown", () => {
            const d = document.getElementById("deleteNotePrompt");
            const y = document.getElementById("dyPrompt");
            const n = document.getElementById("dnPrompt");
            d.style.visibility = 'visible'
            d.style.opacity = 1;
            y.addEventListener("mousedown", () => {
                this.deleteNote()
                d.style.visibility = 'hidden'
                d.style.opacity = 0;
            })
            n.addEventListener("mousedown", () => {
                d.style.visibility = 'hidden'
                d.style.opacity = 0;
            })
        })
    }

    deleteNote() {
        if (this.selectedIndex >= 0) {
            this.notes.splice(this.selectedIndex, 1)
            this.selectedIndex = -1;
            this.loadNotesList();
        }
    }

    selectNote(index) {
        this.selectedIndex = index;
        this.selectedNote = this.notes[this.selectedIndex];
        for (let i = 0; i < this.notes.length; i++) {
            document.getElementById(`n${this.notes[i].id}`).classList.remove("active");
        }
        document.getElementById(`n${this.selectedNote.id}`).classList.add("active")
    }

    updateTitle(newTitle) {
        this.selectedNote.title = newTitle;
        document.getElementById(`t${this.selectedNote.id}`).innerHTML = newTitle;
    }
}