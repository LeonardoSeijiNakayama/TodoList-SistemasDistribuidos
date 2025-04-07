document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.querySelector(".task-list");

    // Carrega as tarefas do servidor
    async function loadTasks() {
        const res = await fetch("/api/tasks");
        const tasks = await res.json();
        taskList.innerHTML = ""; // limpa antes de carregar
        tasks.forEach(task => createTaskElement(task));
    }

    // Cria o HTML de uma tarefa
    function createTaskElement(task) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const taskContent = document.createElement("p");
        taskContent.textContent = task.text;
        taskItem.appendChild(taskContent);

        // Botão editar
        const editButton = document.createElement("button");
        editButton.innerHTML = "<img src='img/lapis.png'/>";
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => editTask(task, taskItem, taskContent));
        taskItem.appendChild(editButton);

        // Botão excluir
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<img src='img/x.png'/>";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    }

    // Adiciona nova tarefa
    async function addTask() {
        const text = taskInput.value.trim();
        if (text === "") return;

        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const newTask = await res.json();
        createTaskElement(newTask);
        taskInput.value = "";
    }

    // Edita uma tarefa
    function editTask(task, taskItem, taskContent) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = task.text;

        const saveButton = document.createElement("button");
        saveButton.innerHTML = "<img src='img/mais.png'/>";
        saveButton.classList.add("save-btn");

        taskItem.innerHTML = "";
        taskItem.appendChild(editInput);
        taskItem.appendChild(saveButton);

        saveButton.addEventListener("click", async () => {
            const newText = editInput.value.trim();
            if (newText === "") return;

            await fetch(`/api/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newText })
            });

            loadTasks(); // recarrega a lista
        });
    }

    // Exclui uma tarefa
    async function deleteTask(id) {
        await fetch(`/api/tasks/${id}`, {
            method: "DELETE"
        });
        loadTasks();
    }

    addTaskButton.addEventListener("click", addTask);
    loadTasks();
});
