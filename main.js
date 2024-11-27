"use strict";
let elForm = document.querySelector(".todo-form");
let elInput = document.querySelector(".todo-input");
let elList = document.querySelector(".todo-list");
const setState = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
const getState = (key) => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        return JSON.parse(isValid);
    }
};
let todos = getState("todos") || [];
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        value: elInput.value
    };
    todos.push(data);
    renderTodos(todos, elList);
    elInput.value = "";
    setState("todos", todos);
});
renderTodos(todos, elList);
function renderTodos(arr, list) {
    list.innerHTML = '';
    arr.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = "flex items-center justify-between bg-slate-300 p-2 rounded-md";
        elItem.innerHTML = `<div class="flex items-center justify-between gap-[8px]">
            <span>${index + 1}.</span>
            <strong>${item.value}</strong>
        </div>
        <div class="flex items-center gap-2">
            <button onclick="handleUpdateTodo(${index})" class="bg-blue-500 text-white font-semibold p-2 inline-block rounded-md">Update</button>
            <button onclick="handleDeleteTodo(${index})" class="bg-red-500 text-white font-semibold p-2 inline-block rounded-md">Delete</button>
        </div>`;
        list === null || list === void 0 ? void 0 : list.appendChild(elItem);
    });
}
// Delete part 
function handleDeleteTodo(id) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}
// Delete part 
// update part 
function handleUpdateTodo(id) {
    const findObj = todos[id];
    if (!findObj)
        return;
    const elNewValue = prompt("Update your todo:", findObj.value);
    if (elNewValue) {
        findObj.value = elNewValue;
        setState("todos", todos);
        renderTodos(todos, elList);
    }
}
// update part 
// delete part 
function handleDeleteAllClickBtn() {
    if (confirm("Are you sure delete all todos?")) {
        todos = [];
        setState("todos", todos);
        renderTodos(todos, elList);
    }
}
// delete part 
