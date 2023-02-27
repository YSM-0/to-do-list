import { format } from 'date-fns'

let toDoList = []

let projects = ['none', 'project 2']

function getISOWeekNumber(date) {
    const dayOfWeek = date.getDay();
    const thursdayIndex = 4;
    const weekStart = new Date(date.getFullYear(), 0, 1);
    weekStart.setDate(weekStart.getDate() + (thursdayIndex - weekStart.getDay() + 7) % 7);
    const diff = date - weekStart;
    const dayDiff = diff / (1000 * 60 * 60 * 24);
    const weekNumber = 1 + Math.floor(dayDiff / 7);
  
    return weekNumber;
  }
class toDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project = project
        this.status = false
    }

    submit() {
        toDoList.push(this)
    }

    appendToGrid() {
        const toDoDiv = document.createElement('div')
        const title = document.createElement('p')
        const description = document.createElement('p')
        const dueDate = document.createElement('p')
        const checkBox = document.createElement('input')
        const removeButton = document.createElement('img')
        const task = document.createElement('li')
        const toDoGrid = document.querySelector('.to-do-grid')

        toDoGrid.appendChild(task)
        task.appendChild(toDoDiv)
        toDoDiv.appendChild(title)
        toDoDiv.appendChild(description)
        toDoDiv.appendChild(dueDate)
        toDoDiv.appendChild(checkBox)
        toDoDiv.appendChild(removeButton)

        task.classList.add('item')
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

        if (this.status === true) {
            toDoDiv.parentElement.style.backgroundColor = 'rgba(123, 247, 58, 0.33)'
        } else {
            this.status = false
            if (this.priority === 'Urgent') {
                toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 0, 17, 0.33)'
            } else if (this.priority === 'Normal') {
                toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 198, 35, 0.33)'
            } else if (this.priority === '-Priority-') {
                toDoDiv.parentElement.style.backgroundColor = '#f3fbfc'
            }
        }

        if (this.priority === 'Urgent') {
            toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 0, 17, 0.33)'
        } else if (this.priority === 'Normal') {
            toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 198, 35, 0.33)'
        }

        checkBox.addEventListener('click', () => {
            if (this.status === false) {
                this.status = true
                toDoDiv.parentElement.style.backgroundColor = 'rgba(123, 247, 58, 0.33)'
            } else {
                this.status = false
                if (this.priority === 'Urgent') {
                    toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 0, 17, 0.33)'
                } else if (this.priority === 'Normal') {
                    toDoDiv.parentElement.style.backgroundColor = 'rgba(207, 198, 35, 0.33)'
                } else if (this.priority === '-Priority-') {
                    toDoDiv.parentElement.style.backgroundColor = '#f3fbfc'
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
    const general = document.querySelector('.general')
    const today = document.querySelector('.today')
    const week = document.querySelector('.week')
    const month = document.querySelector('.month')
    const projects = document.querySelector('.projects')
    const toDoGrid = document.createElement('ul')
    const addTask = document. createElement('li')
    const text = document.createElement('p')
    const addProject = document. createElement('p')

    toDoGrid.classList.add('to-do-grid')
    addTask.classList.add('add-task', 'item')
    addProject.classList.add('add-project')


    mainContent.appendChild(toDoGrid)
    toDoGrid.appendChild(addTask)
    addTask.appendChild(text)
    addTask.appendChild(addProject)
    
    text.textContent = '+ Add a Task'
    addProject.textContent = '+ Add a Project'

    displayGeneral()

    text.addEventListener('click', () => {
        displayForm()
    })

    addProject.addEventListener('click', () => {
        displayFormProject()
    })

    projects.addEventListener('click', () => {
        displayProjects()
    })

    general.addEventListener('click', () => {
        displayGeneral()
    })

    today.addEventListener('click', () => {
        displayToday()
    })

    week.addEventListener('click', () => {
        displayWeek()
    })

    month.addEventListener('click', () => {
        displayMonth()
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
    const selectProject = document.createElement('select')

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
    if (projects !== '') {
        selectProject.classList.add('select')
        form.appendChild(selectProject)
        selectProject.setAttribute('name', 'project')
        
        for (let value of projects) {
            const project = document.createElement('option')

            project.textContent = value
            selectProject.appendChild(project)
        }
    }
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
        const formParent = document.querySelector('.form').parentNode
        const title = titleInput.value
        const description = descriptionInput.value
        const dueDate = dueDateInput.value
        const priority = prioritySelect.value
        const project = selectProject.value

        const task = new toDo(title, description, dueDate, priority, project)

        formParent.remove()

        task.submit()
        task.appendToGrid()
    })
}

const displayProjects = function () {
    document.querySelector('.projects').classList.toggle('focus')

    const parentElement = document.querySelector('.to-do-grid');

    while (parentElement.childNodes.length > 1) {
        parentElement.removeChild(parentElement.lastChild);
    }

    for (const project_ of projects) {
        const toDoDiv = document.createElement('div')
        const title = document.createElement('p')
        const checkBox = document.createElement('input')
        const removeButton = document.createElement('img')
        const project = document.createElement('li')
        const toDoGrid = document.querySelector('.to-do-grid')

        toDoGrid.appendChild(project)
        project.appendChild(toDoDiv)
        toDoDiv.appendChild(title)
        toDoDiv.appendChild(removeButton)

        project.classList.add('item')
        title.classList.add('task-title')
        toDoDiv.classList.add('to-do-div')
        removeButton.classList.add('remove-button')

        checkBox.setAttribute('type', 'checkbox')
        removeButton.setAttribute('src', '/dist/iamges/delete_icon.png')

        title.textContent = project_

        removeButton.addEventListener('click', () => {
            const index = toDoList.indexOf(this)

            toDoDiv.parentElement.remove()
            toDoList.splice(index, 1)
        })

        project.addEventListener('click', () => {
            while (parentElement.childNodes.length > 1) {
                parentElement.removeChild(parentElement.lastChild);
            }

            for (const task of toDoList) {
                if (task.project === project_) {
                    task.appendToGrid()
                }
            }
        })
    } 
}

const displayToday = function () {
    document.querySelector('.today').classList.toggle('focus')

    const parentElement = document.querySelector('.to-do-grid');

    while (parentElement.childNodes.length > 1) {
        parentElement.removeChild(parentElement.lastChild);
    }

    for (const task of toDoList) {
        if (task.dueDate === format(new Date(), 'yyyy-MM-dd')) {
            task.appendToGrid()
        }
    }
}

const displayWeek = function () {
    document.querySelector('.week').classList.toggle('focus')

    const parentElement = document.querySelector('.to-do-grid');

    while (parentElement.childNodes.length > 1) {
        parentElement.removeChild(parentElement.lastChild);
    }

    const currentDate = new Date()
    const currentDateWeek = getISOWeekNumber(currentDate) 

    for (const task of toDoList) {
        const taskDate = new Date(task.dueDate)

        if (getISOWeekNumber(taskDate) === currentDateWeek) {
            task.appendToGrid()
        }
    }
}

const displayMonth = function () {
    document.querySelector('.month').classList.toggle('focus')

    const parentElement = document.querySelector('.to-do-grid');

    while (parentElement.childNodes.length > 1) {
        parentElement.removeChild(parentElement.lastChild);
    }

    for (const task of toDoList) {
        if (task.dueDate.slice(0, 7) === format(new Date(), 'yyyy-MM-dd').slice(0, 7)) {
            task.appendToGrid()
        }
    }
}

const displayGeneral = function () {
    document.querySelector('.general').classList.toggle('focus')

    const parentElement = document.querySelector('.to-do-grid');

    while (parentElement.childNodes.length > 1) {
        parentElement.removeChild(parentElement.lastChild);
    }

    for (const task of toDoList) {
        task.appendToGrid()
    }
}

const displayFormProject = function () {
    const toDoGrid = document.querySelector('.to-do-grid')
    const listElement = document.createElement('li')
    const form = document.createElement('form')
    const titleInput = document.createElement('input')
    const submitButton = document.createElement('button')

    listElement.classList.add('item')
    form.classList.add('form')
    titleInput.classList.add('input')
    submitButton.classList.add('button')

    toDoGrid.appendChild(listElement)
    listElement.appendChild(form)
    form.appendChild(titleInput)
    form.appendChild(submitButton)

    submitButton.textContent = 'Done'

    titleInput.setAttribute('name', 'title')
    titleInput.setAttribute('placeholder', 'Title')
    submitButton.setAttribute('type', 'button')
    submitButton.setAttribute('id', 'form-button')

    submitButton.addEventListener('click', () => {
        const title = titleInput.value

        projects.push(title)
        form.parentElement.remove()
    })
}

export { init, displayForm, toDoList }