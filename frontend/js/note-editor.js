

export default class NoteEditor {
    constructor(p) {
        this.p = p;
        this.selection = window.getSelection();
        this.text = 0
        document.getElementById("header1").addEventListener("mousedown", () => {
            this.addRich("h1");
        })
        document.getElementById("header2").addEventListener("mousedown", () => {
            this.addRich("h2");
        })
        document.getElementById("monospace").addEventListener("mousedown", () => {
            this.addMonospace()
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
}