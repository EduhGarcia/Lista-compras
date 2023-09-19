import { addToLocalStorage, editLocalStorage,
removeFromLocalStorage, getLocalStorage } from "./localStorage.js"

const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.btn-submit')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.btn-clear')

let editElement = ""
let editFlag = false
let editId = ""

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click", clearItems)
window.addEventListener("DOMContentLoaded", setupItems)

function addItem(e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()

    if (value && !editFlag) {
        createCardItem(id, value)

        displayAlert("Item adicionado com sucesso", "sucess")
        container.classList.add('show-container')

        addToLocalStorage(id, value)
        setBackToDefault()

    } else if (value && editFlag) {
        editElement.innerHTML = value
        displayAlert("Item alterado", "sucess")
        editLocalStorage(editId, value)
        setBackToDefault()
    } else {
        displayAlert("Favor iserir um valor", "error")
    }
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }

    displayAlert("item excluido", "error")
    removeFromLocalStorage(id)
    setBackToDefault()
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling
    grocery.value = editElement.textContent
    editFlag = true
    editId = element.dataset.id
    submitBtn.textContent = 'Editar'
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item')

    if (items.length > 0) {
        container.classList.remove('show-container')
        items.forEach(item => {
            list.removeChild(item)
        })
    }

    displayAlert('lista vazia', 'error')
    localStorage.removeItem("list")
    setBackToDefault()
}

function displayAlert(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    setTimeout(() => {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

function setBackToDefault() {
    grocery.value = ""
    editFlag = false
    editId = ""
    submitBtn.textContent = 'Enviar'
}

function setupItems() {
    let items = getLocalStorage()

    if (items.length > 0) {
        items.forEach(item => {
            createCardItem(item.id, item.value)
        })

        container.classList.add("show-container")
    }
}

function createCardItem(id, value) {
    const element = document.createElement("article")
    const attr = document.createAttribute("data-id")
    attr.value = id
    element.setAttributeNode(attr)
    element.classList.add("grocery-item")

    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>`

    const editBtn = element.querySelector(".edit-btn")
    editBtn.addEventListener("click", editItem)
    const deleteBtn = element.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", deleteItem)

    list.appendChild(element)
}