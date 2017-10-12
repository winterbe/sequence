import Sequence from "./Sequence";

export class None {

    /**
     * Returns `true` if no element match the given `predicate` or if the sequence is empty
     * if no predicate is present.
     *
     * @param {(value: T) => boolean} predicate
     * @returns {boolean}
     */
    none<T>(this: Sequence<T>, predicate?: (value: T) => boolean): boolean {
        if (predicate == null) {
            return !this.iterator.hasNext();
        }
        while (this.iterator.hasNext()) {
            const item = this.iterator.next();
            if (predicate(item)) {
                return false;
            }
        }
        return true;
    }

}