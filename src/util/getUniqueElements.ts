
export const getUniqueElements = <T>(elements: T[]): T[] => {
    const elementsStringified = elements.map(element => JSON.stringify(element))
    const elementsSet = new Set(elementsStringified)
    return Array
        .from(elementsSet)
        .map(element => JSON.parse(element))
}