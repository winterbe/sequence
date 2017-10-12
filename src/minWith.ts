import Sequence from "./Sequence";

export class MinWith {

    /**
     * Returns the minimum element of the sequence by evaluating the given `compare`
     * function or `null` if sequence is empty.
     *
     * @returns {T}
     */
    minWith<T>(this: Sequence<T>, compare: (a: T, b: T) => number): T | null {
        let min: T | null = null;
        while (this.iterator.hasNext()) {
            const item = this.iterator.next();
            if (min == null || compare(item, min) < 0) {
                min = item;
            }
        }
        return min;
    }

}