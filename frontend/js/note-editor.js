import Experience from './experience.js'

export default class NoteEditor {
    constructor(p) {
        this.experience = new Experience()
        this.p = p;
        this.title = document.getElementById("noteT");
        this.selection = window.getSelection();
        this.text = 0;
        this.suggestionBox = document.getElementById("suggestions");
        this.suggestions = ['h1', 'h2', 'mono', 'fc', 'list-fc', 'b'];
        this.suggestionDesc = ['header 1', 'header 2', 'monospace', 'create new flashcard', 'create new flashcard w/ list', 'body'];
        this.initListeners()
    }

    initListeners() {
        document.getElementById("header1").addEventListener("mousedown", () => {
            this.insertCommand("h1")
        })
        document.getElementById("header2").addEventListener("mousedown", () => {
            this.insertCommand("h2")
        })
        document.getElementById("monospace").addEventListener("mousedown", () => {
            this.insertCommand("mono")
        })
        this.title.addEventListener("focusout", () => {
            this.experience.notes.updateTitle(this.title.innerHTML)
        })
        this.title.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
            }
        })
        this.p.addEventListener("keydown", (e) => {
            if (e.key == '/') {
                this.showCommandBar();
            } else if (e.key == ' ' || e.key == 'Enter' || e.key == 'Backspace') {
                this.hideCommandBar();
                if(e.key=='Enter') {
                    this.addRich('body', '')
                }
            }
        })
        this.p.addEventListener("mousedown", () => {
            this.hideCommandBar();
        })
    }

    addRich(command, fill) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.innerHTML = fill;
            span.classList.add(command);
            span.textContent = range.toString();
            range.deleteContents();
            range.insertNode(span);
            console.log(fill)
        }
    }

    insertCommand(cmd) {
        switch (cmd) {
            case 'h1':
                this.addRich('head1', 'header 1')
                console.log("hello")
                break;
            case 'h2':
                this.addRich('head2', 'header 2')
                break;
            case 'mono':
                this.addRich('monospace', 'monospace')
                break;
            case 'b':
                this.addRich('body', '');
                break;
            case 'fc':
                //this.addFlashcard()
                break;
            case 'list-fc':
                //this.addFlashcard()
                //this.addList()
                break;
        }

    }

    showCommandBar() {
        if (this.selection.rangeCount > 0) {
            const range = this.selection.getRangeAt(0);
            this.suggestionBox.innerHTML = '';
            for (let i = 0; i < this.suggestions.length; i++) {
                const e = document.createElement('div');
                e.id = this.suggestions[i]
                const es = document.createElement('div');
                es.classList.add("suggestionKey");
                es.innerHTML = this.suggestions[i];
                e.appendChild(es);
                e.appendChild(document.createElement('div'));
                const ed = document.createElement('div');
                ed.classList.add("suggestionDesc");
                ed.innerHTML = this.suggestionDesc[i];
                e.appendChild(ed);
                e.classList.add("suggestion");
                this.suggestionBox.appendChild(e);
                e.addEventListener("mousedown", () => {
                    this.insertCommand(this.suggestions[i])
                })
            }
            this.suggestionBox.style.display = 'flex';
            range.deleteContents()
            range.insertNode(this.suggestionBox);
        }
    }

    hideCommandBar() {
        this.suggestionBox.style.display = 'none';
    }

    insertSuggestion(suggestion) {
        const textBeforeCursor = editor.innerText.substring(0, this.selection.getRangeAt(0).startOffset);
        const lastWordIndex = textBeforeCursor.lastIndexOf(' ') + 1;
        const newText = textBeforeCursor.substring(0, lastWordIndex) + suggestion + ' ';
        editor.innerText = newText;
        this.suggestionBox.style.display = 'none';
    }
}