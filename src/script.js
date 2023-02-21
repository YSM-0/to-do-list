const toDoList = []

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
        const toDoGrid = document.querySelector('.to-do-grid')
        const task = document.createElement('li')

        toDoGrid.appendChild(task)
    }
}

const init = function() {
    const mainContent = document.querySelector('.main-content')
    const toDoGrid = document.createElement('ul')
    const addTask = document. createElement('a')
    const text = document.createElement('p')

    toDoGrid.classList.add('to-do-grid')
    addTask.classList.add('add-task', 'item')

    mainContent.appendChild(toDoGrid)
    toDoGrid.appendChild(addTask)
    addTask.appendChild(text)
    
    text.textContent = '+ Add a Task'
}

export { init }