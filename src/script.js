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
        const checkBox = document.createElement('input')
        const removeButton = document.createElement('img')

        toDoDiv.appendChild(title)
        toDoDiv.appendChild(description)
        toDoDiv.appendChild(dueDate)
        toDoDiv.appendChild(checkBox)
        toDoDiv.appendChild(removeButton)

        title.classList.add('task-title')
        description.classList.add('task-description')
        dueDate.classList.add('task-due-date')
        toDoDiv.classList.add('to-do-div')
        checkBox.classList.add('checkbox')
        removeButton.classList.add('remove-button')

        checkBox.setAttribute('type', 'checkbox')
        removeButton.setAttribute('src', '/dist/iamges/delete_icon.png')

        title.textContent = this.title
        description.textContent = this.description
        dueDate.textContent = this.dueDate

        formParent.replaceChild(toDoDiv, form)

        this.status = checkBox.checked

        if (this.priority === 'Urgent') {
            toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 0, 17, 0.33)'
        } else if (this.priority === 'Normal') {
            toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 198, 35, 0.33)'
        }

        checkBox.addEventListener('click', () => {
            this.status = checkBox.checked
            
            if (this.status === true) {
                toDoDiv.parentElement.style.backgroundColor = 'rgba(123, 247, 58, 0.33)'
            } else {
                if (this.priority === 'Urgent') {
                    toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 0, 17, 0.33)'
                } else if (this.priority === 'Normal') {
                    toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 198, 35, 0.33)'
                }
            }
        })

        removeButton.addEventListener('click', () => {
            const index = toDoList.indexOf(this)

            toDoDiv.parentElement.remove()
            toDoList.splice(index, 1)
        })
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

    addTask.addEventListener('click', () => {
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
        task.appendToGrid()
    })
}

export { init, displayForm, toDoList }