export default class PseudoID {
    newID() {
        //not really a perfectly unique id but good enough for the application
        const formula = Math.floor(Math.random() * Date.now());
        return formula;
    }
}