export default class NoteEditor {
    constructor(dom) {
        this.dom = dom;
        this.focused = false;


        this.caret = 0;


        document.addEventListener("mousedown", (e) => {
            if(e.target == this.dom) {
                this.focused = true;
            } else {
                this.focused = false;
            }
        })

        document.addEventListener("keydown", (e) => {
            if(this.focused && (e.ctrlKey || e.metaKey)) {
                switch(e.key) {

                }
            }
        })

    }

    updateCaret() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const clonedRange = range.cloneRange();
        clonedRange.selectNodeContents(this.dom);
        clonedRange.setEnd(range.endContainer, range.endOffset);
        this.caret = clonedRange.toString().length;
        console.log("Caret Position:", this.caret);
    }
}