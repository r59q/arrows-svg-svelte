import arrowCreate, { type IArrow } from "arrows-svg";

const fromTargets: Map<string, HTMLElement> = new Map();
const toTargets: Map<string, HTMLElement[]> = new Map();
type FromToPair = {
    from: HTMLElement;
    to: HTMLElement;
}
const renderedNodes: Map<FromToPair, IArrow> = new Map();

const arrowSrc = (element: HTMLElement, id: string | number) => {
    id = id.toString();

    fromTargets.set(id, element);
    let x = id
    return {
        update: (val: string) => {
            // redrawArrows(element, undefined)
        },
        destroy: () => {
            // undrawArrow(element, undefined);
        }
    }
}

const arrowDest = (element: HTMLElement, id: string | number) => {
    id = id.toString();

    const setNew = (key: string) => {
        if (toTargets.has(key)) {
            toTargets.set(key, [...toTargets.get(key)!, element])
        } else {
            toTargets.set(key, [element])
        }
    }

    setNew(id);
    let prevId = id;
    return {
        update: (val: string) => {
            redrawArrows(undefined, element)
            /*
            console.log("dest was changed")
            const old = [...toTargets.get(prevId)!]
            toTargets.delete(prevId)
            toTargets.set(prevId, old.filter(elem => elem !== element))
            setNew(val);
            redrawArrows(undefined, element)
            prevId = val;
            drawArrows();
*/
        },
        destroy: () => {
            undrawArrow(undefined, element);
        }
    }
}


const redrawArrows = (from: HTMLElement | undefined, to: HTMLElement | undefined) => {
    const pairsToRedraw: FromToPair[] = []
    new Map(renderedNodes).forEach((arrow, pair) => {
        if (from === pair.from) {
            pairsToRedraw.push(pair)
        }
        if (to === pair.to) {
            pairsToRedraw.push(pair)
        }
    })

    pairsToRedraw.forEach(pair => drawArrow(pair.from, pair.to))
}

const undrawArrow = (from: HTMLElement | undefined, to: HTMLElement | undefined) => {
    if (!from && !to) {
        throw new Error("This should not happen, both source and target element is undefined/null")
    }

    new Map(renderedNodes).forEach((arrow, pair) => {
        if (!from && pair.to === to) {
            arrow.clear();
            renderedNodes.delete(pair)
        }
        if (!to && pair.from === from) {
            arrow.clear();
            renderedNodes.delete(pair)
        }
        if (pair.from === from && pair.to === to) {
            try {
                arrow.clear();
            } catch (e) {
            } finally {
                renderedNodes.delete(pair)
            }
        }
    })
}

const drawArrow = (from: HTMLElement, to: HTMLElement) => {
    undrawArrow(from, to);
    const key = { from, to };
    if (!from || !to) {
        console.log("both source and destination was null/undefined")
        return;
    }
    try {
        console.log("Attempting to draw")
        const arrow = arrowCreate({
            from,
            to
        })
        console.log("Arrow created")
        console.log({
            from: from.innerHTML, to: to.innerHTML
        })
        renderedNodes.set(key, arrow)
        document.body.append(arrow.node)
    } catch (error) {
        console.error(error);
    }
}

const drawArrows = () => {
    toTargets.forEach((targets, id) => {
        if (!fromTargets.has(id)) {
            throw new Error("Cannot draw arrow, arrowDest has no arrowSrc with corresponding ID")
        }
        const source = fromTargets.get(id)!;
        targets.forEach(target => {
            drawArrow(source, target);
        });

    });
}
export { arrowSrc, arrowDest, drawArrows }