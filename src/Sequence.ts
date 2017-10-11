import SequenceIterator, { GeneratorIterator, GeneratorSeedIterator, IterableIterator } from "./SequenceIterator";
import map from "./map";
import filter from "./filter";
import flatMap from "./flatMap";
import firstOrNull from "./firstOrNull";
import first from "./first";
import lastOrNull from "./lastOrNull";
import onEach from "./onEach";
import forEach from "./forEach";
import toArray from "./toArray";
import last from "./last";
import all from "./all";
import any from "./any";
import none from "./none";
import count from "./count";
import distinct from "./distinct";
import contains from "./contains";
import indexOf from "./indexOf";
import elementAt from "./elementAt";
import elementAtOrNull from "./elementAtOrNull";
import elementAtOrElse from "./elementAtOrElse";
import indexOfFirst from "./indexOfFirst";
import indexOfLast from "./indexOfLast";
import joinToString from "./joinToString";
import mapIndexed from "./mapIndexed";
import withIndex from "./withIndex";
import filterIndexed from "./filterIndexed";
import forEachIndexed from "./forEachIndexed";
import distinctBy from "./distinctBy";
import drop from "./drop";
import take from "./take";
import single from "./single";
import singleOrNull from "./singleOrNull";
import filterNot from "./filterNot";
import associate from "./associate";
import groupBy from "./groupBy";
import reduce from "./reduce";
import reduceIndexed from "./reduceIndexed";
import fold from "./fold";
import foldIndexed from "./foldIndexed";
import flatten from "./flatten";
import sorted from "./sorted";
import sortedBy from "./sortedBy";
import sortedDescending from "./sortedDescending";
import sortedByDescending from "./sortedByDescending";
import sortedWith from "./sortedWith";
import filterNotNull from "./filterNotNull";
import mapNotNull from "./mapNotNull";
import plus from "./plus";
import minus from "./minus";
import zip from "./zip";
import unzip from "./unzip";
import partition from "./partition";
import toSet from "./toSet";
import toMap from "./toMap";
import sum from "./sum";
import sumBy from "./sumBy";
import chunk from "./chunk";
import reverse from "./reverse";
import max from "./max";
import maxBy from "./maxBy";
import min from "./min";
import minBy from "./minBy";
import maxWith from "./maxWith";
import minWith from "./minWith";
import dropWhile from "./dropWhile";
import takeWhile from "./takeWhile";
import asIterable from "./asIterable";
import merge from "./merge";
import { AssociateBy } from "./associateBy";
import { Average } from "./average";

export default interface Sequence<T> extends AssociateBy<T>, Average<T> {
}

/**
 * A Sequence accepts an iterator and provides a fluent functional API consisting
 * of various intermediate and terminal operations for processing the iterated data.
 * The operations are evaluated lazily to avoid examining all of the input data
 * when it's not necessary. Sequences can be iterated only once.
 */
export default class Sequence<T> {
    constructor(readonly iterator: SequenceIterator<T>) {
    }

    map = map;
    mapNotNull = mapNotNull;
    mapIndexed = mapIndexed;
    filter = filter;
    filterNot = filterNot;
    filterNotNull = filterNotNull;
    filterIndexed = filterIndexed;
    flatMap = flatMap;
    distinct = distinct;
    distinctBy = distinctBy;
    withIndex = withIndex;
    drop = drop;
    dropWhile = dropWhile;
    take = take;
    takeWhile = takeWhile;
    onEach = onEach;
    flatten = flatten;
    sorted = sorted;
    sortedDescending = sortedDescending;
    sortedBy = sortedBy;
    sortedByDescending = sortedByDescending;
    sortedWith = sortedWith;
    reverse = reverse;
    forEach = forEach;
    forEachIndexed = forEachIndexed;
    toArray = toArray;
    toList = toArray;
    toSet = toSet;
    toMap = toMap;
    first = first;
    firstOrNull = firstOrNull;
    last = last;
    lastOrNull = lastOrNull;
    find = firstOrNull;
    findLast = lastOrNull;
    all = all;
    any = any;
    none = none;
    count = count;
    contains = contains;
    indexOf = indexOf;
    indexOfFirst = indexOfFirst;
    indexOfLast = indexOfLast;
    elementAt = elementAt;
    elementAtOrNull = elementAtOrNull;
    elementAtOrElse = elementAtOrElse;
    joinTo = joinToString;
    joinToString = joinToString;
    single = single;
    singleOrNull = singleOrNull;
    associate = associate;
    groupBy = groupBy;
    reduce = reduce;
    reduceIndexed = reduceIndexed;
    fold = fold;
    foldIndexed = foldIndexed;
    partition = partition;
    chunk = chunk;
    plus = plus;
    minus = minus;
    zip = zip;
    unzip = unzip;
    sum = sum;
    sumBy = sumBy;
    max = max;
    maxBy = maxBy;
    maxWith = maxWith;
    min = min;
    minBy = minBy;
    minWith = minWith;
    asIterable = asIterable;
    merge = merge;
}
applyMixins(Sequence, [AssociateBy, Average]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

export function sequenceOf<T>(...args: Array<T>): Sequence<T> {
    return asSequence(args);
}

export function emptySequence<T>(): Sequence<T> {
    return asSequence([]);
}

export function asSequence<T>(iterable: Iterable<T>): Sequence<T> {
    if (iterable === null) {
        throw new Error("Cannot create sequence for input: null");
    }
    if (iterable === undefined) {
        throw new Error("Cannot create sequence for input: undefined");
    }
    if (iterable[Symbol.iterator] == null) {
        throw new Error("Cannot create sequence for non-iterable input: " + iterable);
    }
    return new Sequence<T>(new IterableIterator(iterable));
}

export function generateSequence<T>(nextFunction: () => T | null | undefined): Sequence<T>;
export function generateSequence<T>(seedFunction: () => T | null | undefined, nextFunction: (item: T) => T | null | undefined): Sequence<T>;
export function generateSequence<T>(seed: T | null | undefined, nextFunction: (item: T) => T | null | undefined): Sequence<T>;
export function generateSequence<T>(a: any, b?: any): Sequence<T> {
    if (typeof a === "function" && b == null) {
        return new Sequence<T>(new GeneratorIterator(a));
    }
    const seed = typeof a === "function" ? a() : a;
    return seed != null
        ? new Sequence<T>(new GeneratorSeedIterator(seed, b))
        : emptySequence<T>();
}
