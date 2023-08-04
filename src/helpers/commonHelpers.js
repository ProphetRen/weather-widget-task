export const foundElement = (filterArray, compareElement) => {
    return filterArray.filter((item) => {
        return item.id === compareElement ? item.id : ''
    })
}

export const changeOrder = (arrayToSort, dropCard, currentCard) => {
    return arrayToSort.map((item) => {
        if (item.id === dropCard.id) {
            return {...item, order: currentCard.order}
        }
        if (item.id === currentCard.id) {
            return {...item, order: dropCard.order}
        }
        return item
    })
}

export const sortCards = (a, b) => {
    if (a.order > b.order) {
        return 1
    } else {
        return -1
    }
}