import {sequenceOf} from "../src/index";

describe("last", () => {
    it('should return last element of sequence', () => {
        const result = sequenceOf(1, 2, 3)
            .filter(it => it > 1)
            .last();
        expect(result).toBe(3);
    });

    it('should throw error on empty sequence', () => {
        expect(
            () => sequenceOf(1, 2, 3)
                .filter(it => it > 3)
                .last()
        ).toThrow('No such element');
    });

    it('should return last element matching predicate', () => {
        const result = sequenceOf(1, 2, 3)
            .last(it => it > 1);
        expect(result).toBe(3);
    });
});