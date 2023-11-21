

export default class NoteEditor {
    constructor(p) {
        this.p = p;
        this.selection = window.getSelection();
        this.text = 0;
        this.suggestionBox = document.getElementById("suggestions")
        this.suggestions = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];
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
            } else if (e.key == ' ' || e.key == 'Enter') {
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

                // Toggle between h1 and normal text
                if (parentElement.nodeName === name) {
                    const textNode = document.createTextNode(parentElement.innerText);
                    parentElement.parentNode.replaceChild(textNode, parentElement);
                } else {
                    // Wrap the selected line in an h1 element
                    const element = document.createElement(name);
                    element.appendChild(document.createTextNode(selectedNode.nodeValue));
                    selectedNode.remove()
                    range.deleteContents();
                    range.insertNode(element);
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
        const textBeforeCursor = this.p.innerText.substring(0, this.selection.getRangeAt(0).startOffset);
        const lastWord = textBeforeCursor.split(/\s+/).pop();

        const matchingSuggestions = this.suggestions.filter(suggestion =>
            suggestion.toLowerCase().startsWith(lastWord.toLowerCase())
        );

        if (matchingSuggestions.length > 0) {
            const suggestionHTML = matchingSuggestions.map(suggestion =>
                `<div id="${suggestion}" class="suggestion">${suggestion}</div>`
            ).join('');

            this.suggestionBox.innerHTML = suggestionHTML;
            this.suggestionBox.style.display = 'block';
        } else {
            this.hideCommandBar();
        }
    }

    hideCommandBar() {
        this.suggestionBox.innerHTML = '';
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