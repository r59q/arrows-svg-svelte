import arrowCreate, { type IArrow } from "arrows-svg";

const fromTargets: Map<string, HTMLElement> = new Map();
const toTargets: Map<string, HTMLElement[]> = new Map();
const arrowsDrawn: Map<string, IArrow[]> = new Map();
const arrowSrc = (element: HTMLElement, id: string | number) => {
    id = id.toString();
    if (fromTargets.has(id)) {
        throw new Error(`Arrow ${id} already has a source! (this behaviour should change in the future)`)
    }
    fromTargets.set(id, element)
    return {
        update: (newId: string) => {
            console.log("Source was changed")
        },
        destroy: () => {
            console.log("Source was destroyed")
        }
    }
}

const arrowDest = (element: HTMLElement, id: string | number) => {
    id = id.toString();

    if (toTargets.has(id)) {
        if (toTargets.get(id)!.includes(element)) {
            toTargets.set(id, [...toTargets.get(id)!, element])
        }
    } else {
        toTargets.set(id, [element])
    }


    return {
        update: (newId: string) => {
            console.log("Destination was changed")
        },
        destroy: () => {
            console.log("Destination was destroyed")
        }
    }
}
const drawArrow = (from: HTMLElement, to: HTMLElement): IArrow => {
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
        document.body.append(arrow.node)
        return arrow
    } catch (error) {
        throw error;
    }
}

const drawArrows = () => {
    fromTargets.forEach((src, srcId) => {
        const target = toTargets.get(srcId);
        if (target) {
            target.forEach(dest => {
                const arrow = drawArrow(src, dest)
            })
        }
    })
}

export { arrowSrc, arrowDest, drawArrows }