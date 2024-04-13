import arrowCreate, { type IArrow } from "arrows-svg";
import { writable, type Readable, type Writable, derived } from "svelte/store";

type ArrowID = string | number;

type ArrowAction = (element: HTMLElement, id: ArrowID) => {
    update: (newId: ArrowID) => void,
    destroy: () => void
}

type ArrowSourceAction = ArrowAction;

type ArrowDestinationAction = ArrowAction;

type SourceDestinationElementPair = {
    from: HTMLElement,
    to: HTMLElement
}

type Arrow = {
    elementPair: SourceDestinationElementPair,
    arrow: IArrow,
}

type ArrowElement = {
    id: ArrowID,
    element: HTMLElement
}

const sources: Writable<ArrowElement[]> = writable([])
const destinations: Writable<ArrowElement[]> = writable([])

const sourceDestinationPairs: Readable<SourceDestinationElementPair[]> = derived([sources, destinations], stores => {
    const srcs = stores[0]
    const dests = stores[1]
    return srcs.flatMap(src => {
        const dest = dests.filter(el => el.id === src.id);
        return dest.map(el => {
            return { from: src.element, to: el.element } as SourceDestinationElementPair
        })
    })
})

const arrows: Writable<Arrow[]> = writable([])

sourceDestinationPairs.subscribe(pairs => {
    arrows.update(update => {
        update.forEach(arr => arr.arrow.clear())
        update = []
        pairs.forEach(pair => {
            const arrow = arrowCreate({ ...pair })
            document.body.append(arrow.node)
            update.push({
                elementPair: pair,
                arrow
            })
        })
        return update;
    })
})

const arrowSrc: ArrowSourceAction = (element, id) => {
    let arrowId = id;
    sources.update((update) => {
        update.push({ element, id: arrowId })
        return update;
    })
    return {
        update(newId) {
            sources.update(update => {
                update = [...update].filter(el => el.element != element)
                update.push({ element, id: newId })
                return update;
            })
            arrowId = newId;
        },
        destroy() {
            sources.update(update => {
                update = [...update].filter(el => el.element != element)
                return update;
            })
        },
    }
}

const arrowDest: ArrowDestinationAction = (element, id) => {
    let arrowId = id;
    destinations.update((update) => {
        update.push({ element, id: arrowId })
        return update;
    })
    return {
        update(newId) {
            destinations.update(update => {
                update = [...update].filter(el => el.element != element)
                update.push({ element, id: newId })
                return update;
            })
            arrowId = newId;
        },
        destroy() {
            destinations.update(update => {
                update = [...update].filter(el => el.element != element)
                return update;
            })
        },
    }
}

export { arrowSrc, arrowDest };
export type { ArrowID };
