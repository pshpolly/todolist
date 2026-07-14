class Task {
    constructor(title) {
        this.title = title; 
        this.status = "todo"; 
        this.startDate = this.formatDate(new Date()); 
        this.endDate = null; 
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    complete() {
        this.status = "done"; 
        this.endDate = this.formatDate(new Date()); 
    }
}

class ToDoApp {
    constructor() {
        this.taskList = []; 
        this.inputElement = document.getElementById('taskInput');
        this.addButton = document.getElementById('addButton');
        this.listContainer = document.getElementById('taskListContainer');

        this.initEvents();
    }

    initEvents() {
        this.addButton.addEventListener('click', () => this.handleAddTask());

        this.inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddTask();
            }
        });
    }

    handleAddTask() {
        const text = this.inputElement.value.trim();
        
        if (text === "") {
            alert("Будь ласка, введіть текст завдання!");
            return;
        }

        const newTask = new Task(text);
        
        this.taskList.push(newTask);
        
        this.inputElement.value = "";

        this.render();
    }

    toggleTaskStatus(index) {
        const task = this.taskList[index];
        if (task.status === "todo") {
            task.complete(); 
            this.render(); 
        }
    }

    render() {
        this.listContainer.innerHTML = "";

        this.taskList.forEach((task, index) => {
            const button = document.createElement('button');
            

            button.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";
            
            let taskContent = `<span>${task.title}</span>`;
            let dateBadge = `<span class="badge bg-secondary text-wrap" style="font-size: 0.75rem;">Створено: ${task.startDate}</span>`;

            if (task.status === "done") {
                button.classList.add("text-decoration-line-through", "text-muted"); 
                dateBadge = `<span class="badge bg-success text-wrap" style="font-size: 0.75rem;">Виконано: ${task.endDate}</span>`;
            }

            button.innerHTML = `${taskContent} ${dateBadge}`;

            button.addEventListener('click', () => this.toggleTaskStatus(index));

            this.listContainer.appendChild(button);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ToDoApp();
});