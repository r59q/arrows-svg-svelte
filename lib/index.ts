import arrowCreate from "arrows-svg";

const fromTargets: Map<string, HTMLElement> = new Map();
const toTargets: Map<string, HTMLElement[]> = new Map();

const arrowSrc = (element: HTMLElement, id: string) => {
    fromTargets.set(id, element);
    let x = id
    return {
        update: (val: string) => {
            console.log(val)
            x = val;
        },
        destroy: () => {
            console.log(x)
        }
    }
}

const arrowDest = (element: HTMLElement, id: string) => {
    if (toTargets.has(id)) {
        toTargets.set(id, [...toTargets.get(id)!, element])
    } else {
        toTargets.set(id, [element])
    }
    return {
        update: (val: string) => {
            console.log("was changed")
        },
        destroy: () => {
            console.log("element is gone")
        }
    }
}

const drawArrows = () => {
    toTargets.forEach((targets, id) => {
        if (!fromTargets.has(id)) {
            throw new Error("Cannot draw arrow, arrowTo has no arrowFrom with corresponding ID")
        }
        const source = fromTargets.get(id)!;
        targets.forEach(target => {
            const arrow = arrowCreate({
                from: source,
                to: target,
            })
            document.body.append(arrow.node)
        });

    });
}
export { arrowSrc, arrowDest, drawArrows }