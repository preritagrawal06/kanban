export const getNearestIndicator = (e: any, indicators: Element[]) => {
    const DISTANCE_OFFSET = 50
    const el = indicators.reduce(
        (closest: any, child: Element)=>{
            const box = child.getBoundingClientRect()
            const offset = e.clientY - (box.top + DISTANCE_OFFSET)

            if(offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }else{
                return closest
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1]
        }
    )
    return el
}