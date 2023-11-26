import Experience from './experience.js'

export default class NoteEditor {
    constructor(p) {
        this.experience = new Experience()
        this.p = p;
        this.title = document.getElementById("noteT");
        this.selection = window.getSelection();
        this.selectedTextStyle = "";
        this.text = 0;
        this.suggestionBox = document.getElementById("suggestions");
        this.suggestions = ['h1', 'h2', 'mono', 'fc', 'list-fc', 'b'];
        this.suggestionDesc = ['header 1', 'header 2', 'monospace', 'create new flashcard', 'create new flashcard w/ list', 'body'];
        this.initListeners()
    }

    initListeners() {
        document.getElementById("header1").addEventListener("mousedown", () => {
            if (this.selectedTextStyle !== 'h1') {
                this.insertCommand("h1")
                //implement selectedTextStyle update function
                this.selectedTextStyle = "h1"
            }
        })
        document.getElementById("header2").addEventListener("mousedown", () => {
            if (this.selectedTextStyle !== 'h2') {
                this.insertCommand("h2")
                this.selectedTextStyle = "h2"
            }
        })
        document.getElementById("monospace").addEventListener("mousedown", () => {
            if (this.selectedTextStyle !== 'mono') {
                this.insertCommand("mono")
                this.selectedTextStyle = "mono"
            }
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
                if (e.key == 'Enter') {
                    if (this.selectedTextStyle !== 'body') {
                        this.revertToBody()
                    }
                    this.selectedTextStyle = 'body'
                }
            }
        })
        this.p.addEventListener("mousedown", () => {
            this.hideCommandBar();
        })
    }

    addRich(command, fill) {
        if (this.selection.rangeCount > 0) {
            const cac = this.selection.getRangeAt(0).startContainer;
            if (cac !== this.p) {
                if (cac.parentElement !== this.p) {
                    cac.parentElement.remove();
                }
                let cacInner = cac.textContent;
                console.log(cacInner)
                cac.remove()
                const newCac = document.createElement("div")
                newCac.classList.add(command)
                newCac.contentEditable = "true";
                if (cacInner == "") {
                    cacInner = fill;
                }
                newCac.textContent = cacInner;
                this.selection.getRangeAt(0).insertNode(newCac)
            } else {
                const e = document.createElement("div");
                e.classList.add(command);
                e.textContent = fill;
                this.p.appendChild(e);
            }
        }
    }

    revertToBody() {
        if (this.selection.rangeCount > 0) {
            const cac = this.selection.getRangeAt(0).startContainer;
            if (cac !== this.p) {
                if (cac.parentElement !== this.p) {
                    cac.parentElement.remove()
                }
            }
        }
    }

    insertCommand(cmd) {
        switch (cmd) {
            case 'h1':
                this.addRich('head1', 'header 1')
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
            this.selection.focusNode.insertAdjacentElement("afterEnd", this.suggestionBox);
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