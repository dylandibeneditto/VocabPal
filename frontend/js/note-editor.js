import Experience from './experience.js'

export default class NoteEditor {
    constructor(p) {
        this.experience = new Experience()
        this.p = p;
        this.title = document.getElementById("noteT");
        this.selection = window.getSelection();
        this.text = 0;
        this.suggestionBox = document.getElementById("suggestions");
        this.suggestions = ['head1', 'head2', 'mono', 'fc', 'list-fc'];
        this.suggestionDesc = ['header 1', 'header 2', 'monospace', 'create new flashcard', 'create new flashcard w/ list'];
        this.initListeners()
    }

    initListeners() {
        document.getElementById("header1").addEventListener("mousedown", () => {
            this.addRich("h1");
        })
        document.getElementById("header2").addEventListener("mousedown", () => {
            this.addRich("h2");
        })
        document.getElementById("monospace").addEventListener("mousedown", () => {
            this.addMonospace()
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
            }
        })
        this.p.addEventListener("mousedown", () => {
            this.hideCommandBar();
        })
    }

    addRich(name) {
        if (this.selection.rangeCount > 0) {
            const range = this.selection.getRangeAt(0);
            const selectedNode = range.commonAncestorContainer;
            console.log(range)
            if (selectedNode.nodeType === Node.TEXT_NODE) {
                const parentElement = selectedNode.parentElement;
                if (parentElement.nodeName === name.toLocaleUpperCase()) {
                    const textNode = document.createTextNode(parentElement.innerText);
                    parentElement.parentNode.replaceChild(textNode, parentElement);
                } else {
                    if (parentElement.parentElement === this.p) {
                        this.hideCommandBar()
                        const element = document.createElement(name);
                        element.appendChild(document.createTextNode(selectedNode.nodeValue));
                        selectedNode.remove()
                        range.deleteContents();
                        range.insertNode(element);
                    }
                }
            }
        }
    }

    addMonospace() {
        if (this.selection.rangeCount > 0) {
            const range = this.selection.getRangeAt(0);
            const selectedNode = range.commonAncestorContainer;

            if (selectedNode.nodeType === Node.TEXT_NODE) {
                const parentElement = selectedNode.parentElement;

                if (parentElement.classList.contains("monospace")) {
                    const textNode = document.createTextNode(parentElement.innerText);
                    parentElement.parentNode.replaceChild(textNode, parentElement);
                } else {
                    this.hideCommandBar()
                    const element = document.createElement("div");
                    element.classList.add("monospace");
                    element.appendChild(document.createTextNode(selectedNode.nodeValue));
                    selectedNode.remove()
                    range.deleteContents()
                    range.insertNode(element);
                }
            }
        }
    }

    insertCommand(cmd) {
        switch (cmd) {
            case 'head1':
                this.addRich('h1')
                break;
            case 'head2':
                this.addRich('h2')
                break;
            case 'mono':
                this.addMonospace()
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