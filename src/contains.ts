import Sequence from "./Sequence";

export class Contains {

    /**
     * Returns `true` if the sequence contains the given `element`.
     *
     * @param {T} element
     * @returns {boolean}
     */
    contains<T>(this: Sequence<T>, element: T): boolean {
        while (this.iterator.hasNext()) {
            const item = this.iterator.next();
            if (element === item) {
                return true;
            }
        }
        return false;
    }

}