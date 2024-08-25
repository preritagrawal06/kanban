import { getIndicators } from "./getIndicators"

export const clearHighlight = (els: any, column: string) => {
    const indicators = els || getIndicators(column)
    indicators.forEach((i: HTMLDivElement)=>{
        i.style.opacity = "0"
    })
}