let toDoList = []

class toDo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }

    submit() {
        toDoList.push(this)
    }

    appendToGrid() {
        const form = document.querySelector('.form')
        const formParent = document.querySelector('.form').parentNode
        const toDoDiv = document.createElement('div')
        const title = document.createElement('p')
        const description = document.createElement('p')
        const dueDate = document.createElement('p')

        toDoDiv.appendChild(title)
        toDoDiv.appendChild(description)
        toDoDiv.appendChild(dueDate)

        toDoDiv.classList.add('to-do-div')

        title.textContent = this.title
        description.textContent = this.description
        dueDate.textContent = this.dueDate

        formParent.replaceChild(toDoDiv, form)
    }
}

const init = function() {
    const mainContent = document.querySelector('.main-content')
    const toDoGrid = document.createElement('ul')
    const addTask = document. createElement('li')
    const text = document.createElement('p')

    toDoGrid.classList.add('to-do-grid')
    addTask.classList.add('add-task', 'item')

    mainContent.appendChild(toDoGrid)
    toDoGrid.appendChild(addTask)
    addTask.appendChild(text)
    
    text.textContent = '+ Add a Task'

    text.addEventListener('click', () => {
        displayForm()
    })
}

const displayForm = function () {
    const toDoGrid = document.querySelector('.to-do-grid')
    const listElement = document.createElement('li')
    const form = document.createElement('form')
    const titleInput = document.createElement('input')
    const descriptionInput = document.createElement('input')
    const dueDateInput = document.createElement('input')
    const prioritySelect = document.createElement('select')
    const selectInfo = document.createElement('option')
    const selectUrgent = document.createElement('option')
    const selectNormal = document.createElement('option')
    const submitButton = document.createElement('button')
    
    listElement.classList.add('item')
    form.classList.add('form')
    titleInput.classList.add('input')
    descriptionInput.classList.add('input')
    dueDateInput.classList.add('input')
    submitButton.classList.add('button')
    prioritySelect.classList.add('select')

    toDoGrid.appendChild(listElement)
    listElement.appendChild(form)
    form.appendChild(titleInput)
    form.appendChild(descriptionInput)
    form.appendChild(dueDateInput)
    form.appendChild(prioritySelect)
    prioritySelect.appendChild(selectInfo)
    prioritySelect.appendChild(selectUrgent)
    prioritySelect.appendChild(selectNormal)
    form.appendChild(submitButton)

    selectInfo.textContent = '-Priority-'
    selectUrgent.textContent = 'Urgent'
    selectNormal.textContent = 'Normal'
    submitButton.textContent = 'Done'

    dueDateInput.setAttribute('type', 'date')
    dueDateInput.setAttribute('name', 'dueDate')
    titleInput.setAttribute('name', 'title')
    titleInput.setAttribute('placeholder', 'Title')
    descriptionInput.setAttribute('name', 'description')
    descriptionInput.setAttribute('placeholder', 'Description')
    prioritySelect.setAttribute('name', 'priority')
    submitButton.setAttribute('type', 'button')
    submitButton.setAttribute('id', 'form-button')

    submitButton.addEventListener('click', () => {
        const title = titleInput.value
        const description = descriptionInput.value
        const dueDate = dueDateInput.value
        const priority = prioritySelect.value

        const task = new toDo(title, description, dueDate, priority)

        task.submit()
        console.log(toDoList)
        task.appendToGrid()
    })
}

export { init, displayForm, toDoList }