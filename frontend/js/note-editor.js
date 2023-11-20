

export default class NoteEditor {
    constructor(p) {
        this.p = p;
        this.selection = window.getSelection();
        this.text = 0
        this.p.addEventListener("mousedown", () => {
            this.addHeader();
        })
    }

    addHeader() {
        if (this.selection.rangeCount > 0) {
            const range = this.selection.getRangeAt(0);
            const selectedNode = range.commonAncestorContainer;
        
            if (selectedNode.nodeType === Node.TEXT_NODE) {
              const parentElement = selectedNode.parentElement;
        
              // Toggle between h1 and normal text
              if (parentElement.nodeName === 'H1') {
                const textNode = document.createTextNode(parentElement.innerText);
                parentElement.parentNode.replaceChild(textNode, parentElement);
              } else {
                // Wrap the selected line in an h1 element
                const h1Element = document.createElement('h1');
                h1Element.appendChild(document.createTextNode(selectedNode.nodeValue));
                range.deleteContents();
                range.insertNode(h1Element);
              }
            }
          }
        }
}