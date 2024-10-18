// Menangkap elemen HTML
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Fungsi untuk mengambil data dari localStorage
function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todo => addTodoToList(todo.text));
}

// Fungsi untuk menyimpan data ke localStorage
function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(listItem => {
        const taskSpan = listItem.querySelector("span").textContent;
        todos.push({ text: taskSpan });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Fungsi untuk menambahkan item ke dalam to-do list
function addTodo() {
    const taskText = todoInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    addTodoToList(taskText);
    saveTodos(); // Simpan setelah menambahkan
    todoInput.value = ""; // Kosongkan input setelah menambah task
}

// Fungsi untuk menambahkan item ke DOM dan mendukung pengeditan serta penghapusan
function addTodoToList(taskText) {
    const listItem = document.createElement("li");

    // Membuat elemen span untuk teks task
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Membuat tombol edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    // Membuat tombol delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.classList.add("hapus-btn");

    // Event listener untuk tombol edit
    editBtn.addEventListener("click", () => {
        const newTask = prompt("Edit task:", taskSpan.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            taskSpan.textContent = newTask;
            saveTodos(); // Simpan setelah mengedit
        }
    });

    // Event listener untuk tombol delete
    deleteBtn.addEventListener("click", () => {
        todoList.removeChild(listItem);
        saveTodos(); // Simpan setelah menghapus
    });

    // Menambahkan task, tombol edit, dan delete ke list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    // Menambahkan list item ke to-do list
    todoList.appendChild(listItem);
}

// Event listener untuk tombol Add
addBtn.addEventListener("click", addTodo);

// Event listener untuk menambahkan task dengan menekan Enter
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Muat tugas-tugas dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadTodos);
