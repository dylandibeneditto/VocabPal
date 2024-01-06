export default class Experience {
    static instance;
    constructor() {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this;

    }
}