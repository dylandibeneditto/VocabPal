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
        this.loadNotesList();
        this.initListeners();
        console.log(this.notes)
    }

    loadNotesList() {
        const p = document.getElementById("noteList");
        p.innerHTML = '';
        for(let i=0;i<this.notes.length;i++) {
            const n = this.notes[i];
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
        }
    }

    initListeners() {
        document.getElementById("addNote").addEventListener("mousedown", ()=>{
            this.notes.push(new Note("new note", undefined))
            this.loadNotesList();
        })
        document.getElementById("delete").addEventListener("mousedown", ()=> {
            this.notes.splice(this.selectedIndex, 1)
            this.loadNotesList();
        })
    }

    updateTitle(newTitle) {
        this.selectedNote.title = newTitle;
        document.getElementById(`t${this.selectedNote.id}`).innerHTML = newTitle;
        console.log("hello")
    }
}