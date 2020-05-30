import { flow } from 'fp-ts/es6/function';
import * as O from 'fp-ts/es6/Option';
import { pipe } from 'fp-ts/es6/pipeable';

declare global {
    var __POSITIONED_RELATIVE_TO__: () => { result: Node | null };
    var $0: Node | null;
}

const CONTEXT_POSITIONS = ['relative', 'sticky', 'absolute', 'fixed'];

const checkNodeInstanceOfElement = O.getRefinement(
    (node: Node): O.Option<Element> =>
        node instanceof Element ? O.some(node) : O.none,
);

const checkNodeInstanceOfDocument = O.getRefinement(
    (node: Node): O.Option<Document> =>
        node instanceof Document ? O.some(node) : O.none,
);

// TODO: include transform, and others?
// https://jsbin.com/hibujeyumu/1/edit?html,css,output
// https://www.w3.org/TR/css-position-3/#:~:text=Note%3A%20Properties%20that%20can%20cause%20a%20box%20to%20establish%20an%20absolute%20positioning%20containing%20block%20include%20position%2C%20transform%2C%20will-change%2C%20contain%E2%80%A6
const checkElementIsContainingBlock = flow(
    window.getComputedStyle,
    (computedStyle) => computedStyle.position,
    (position) => CONTEXT_POSITIONS.includes(position),
);

const checkNodeIsContainingBlock = flow(
    O.fromPredicate(checkNodeInstanceOfElement),
    O.exists(checkElementIsContainingBlock),
);

// TODO: OR `element === document`?
const checkNodeIsRoot = checkNodeInstanceOfDocument;

const find = (node: Node | null): Node | null =>
    node === null || checkNodeIsRoot(node) || checkNodeIsContainingBlock(node)
        ? node
        : find(node.parentNode);

const findForSelectedNode = flow((node: Node) => node.parentNode, find);

const getSelectedNodeOption = () => pipe($0, O.fromNullable);

/** Without this, dev tools will show the object's prototype. */
const copyObjectWithoutPrototype = <T extends object>(b: T): T => {
    const a = Object.create(null);
    Object.assign(a, b);
    return a;
};

const main = flow(
    // TODO: assert, at least when the event is called?
    getSelectedNodeOption,
    O.map(findForSelectedNode),
    O.getOrElseW(() => null),
    (result) => ({ result }),
    copyObjectWithoutPrototype,
);

window.__POSITIONED_RELATIVE_TO__ = main;
