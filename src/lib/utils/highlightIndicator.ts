import { clearHighlight } from "./clearHighlight"
import { getIndicators } from "./getIndicators"
import { getNearestIndicator } from "./getNearestIndicator"

export const highlightIndicator = (e: any, column: string)=>{
    const indicators = getIndicators(column)
    clearHighlight(indicators, column)
    const el = getNearestIndicator(e, indicators)
    el.element.style.opacity = "1"
}