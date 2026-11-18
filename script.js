const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const tasksContainer = document.getElementById("tasks");

let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function renderTasks() {
    tasksContainer.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task-item";

        const info = document.createElement("div");
        info.className = "task-info" + (task.completed ? " completed" : "");

        const heading = document.createElement("h3");
        heading.textContent = task.name;

        const details = document.createElement("p");
        details.textContent = `Due: ${task.date} | Priority: ${task.priority}`;

        info.appendChild(heading);
        info.appendChild(details);

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Undo" : "Done";

        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        div.appendChild(info);
        div.appendChild(completeBtn);
        div.appendChild(deleteBtn);

        tasksContainer.appendChild(div);
    });

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.completed).length;

    document.getElementById("pendingTasks").textContent =
        tasks.filter(task => !task.completed).length;

    if (tasks.length === 0) {
        tasksContainer.textContent = "No tasks yet. Add your first task!";
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = {
        id: Date.now(),
        name: taskInput.value.trim(),
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false
    };

    if (!task.name) return;

    tasks.push(task);
    saveTasks();
    renderTasks();

    form.reset();
});

renderTasks();