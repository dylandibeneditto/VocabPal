export default class Themes {
    constructor(themes) {
        this.themes = themes;
        this.btn = document.getElementById("themebtn");
        this.selector = document.getElementById("themeselector")
        this.initListeners()
    }

    initListeners() {
        this.btn.addEventListener("mousedown", (e) => {
            this.selector.style.display = 'flex';
            this.selector.style.opacity = 1.0;
        })

        document.addEventListener("mousedown", (e) => {
            if(e.target.parentElement!==this.btn&&e.target.parentElement!==this.selector) {
                this.selector.style.display = 'none';
                this.selector.style.opacity = 0;
            }
        })
    }


}