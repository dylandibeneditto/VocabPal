

export default class NoteEditor {
    constructor(p) {
        this.p = p;
        this.selection = window.getSelection();
        this.text = 0;
        this.suggestionBox = document.getElementById("suggestions")
        this.suggestions = ['head1', 'head2', 'mono', 'fc', 'list-fc'];
        this.suggestionDesc = ['header 1', 'header 2', 'monospace', 'create new flashcard', 'create new flashcard w/ list']
        document.getElementById("header1").addEventListener("mousedown", () => {
            this.addRich("h1");
        })
        document.getElementById("header2").addEventListener("mousedown", () => {
            this.addRich("h2");
        })
        document.getElementById("monospace").addEventListener("mousedown", () => {
            this.addMonospace()
        })
        this.p.addEventListener("keydown", (e) => {
            console.log(e.key);
            if (e.key == '/') {
                this.showCommandBar();
            } else if (e.key == ' ' || e.key == 'Enter' || e.key == 'Backspace') {
                this.hideCommandBar();
            }
        })
    }

    addRich(name) {

        if (this.selection.rangeCount > 0) {
            const range = this.selection.getRangeAt(0);
            const selectedNode = range.commonAncestorContainer;
            console.log(selectedNode.parentElement);

            if (selectedNode.nodeType === Node.TEXT_NODE) {
                const parentElement = selectedNode.parentElement;
                console.log(parentElement.nodeName)
                if (parentElement.nodeName === name.toLocaleUpperCase()) {
                    console.log(2)
                    const textNode = document.createTextNode(parentElement.innerText);
                    parentElement.parentNode.replaceChild(textNode, parentElement);
                } else {
                        if (parentElement.parentElement === this.p) {
                        console.log(3)
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

    showCommandBar() {
        if (this.selection.rangeCount > 0) {
            const range = this.selection.getRangeAt(0);
            for (let i = 0; i < this.suggestions.length; i++) {
                const e = document.createElement(this.suggestions[i]);
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
                console.log(e);
            }
            this.suggestionBox.style.display = 'flex';
            console.log(this.selection);
            range.deleteContents()
            range.insertNode(this.suggestionBox);
        }
    }

    hideCommandBar() {
        //        this.suggestionBox.innerHTML = '';
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