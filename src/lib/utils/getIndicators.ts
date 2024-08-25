export const getIndicators = (column: string)=>{
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
}