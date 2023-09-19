export function addToLocalStorage(id, value) {
    const grocery = {id, value}
    let itens = getLocalStorage()

    itens.push(grocery)
    localStorage.setItem("list", JSON.stringify(itens))
}

export function removeFromLocalStorage(id) {
    let itens = getLocalStorage()

    itens = itens.filter(item => {
        if (item.id !== id) return item
    })

    localStorage.setItem("list", JSON.stringify(itens))
}

export function editLocalStorage(id, value) {
    let itens = getLocalStorage()

    itens = itens.map(item => {
        if (item.id === id) item.value = value
    
        return item      
    })

    localStorage.setItem("list", JSON.stringify(itens))
}

export function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem('list')) : []
}