let elForm: HTMLFormElement | null = document.querySelector(".todo-form")
let elInput: HTMLInputElement | null = document.querySelector(".todo-input")
let elList: HTMLUListElement | null = document.querySelector(".todo-list")


const setState = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data))
}

const getState = (key: string): any => {
    let isValid = localStorage.getItem(key)
    if (isValid) {
        return JSON.parse(isValid)
    }
}


interface TodoType {
    value: string
}
let todos: Array<TodoType> = getState("todos") || []


elForm?.addEventListener("submit", function (e: Event) {
    e.preventDefault()
    const data: TodoType = {
        value: (elInput as HTMLInputElement).value
    }
    todos.push(data)
    renderTodos(todos, elList);
    (elInput as HTMLInputElement).value = ""
    setState("todos", todos)
})
renderTodos(todos, elList)

function renderTodos(arr: TodoType[], list: HTMLUListElement | null): void {
    (list as HTMLUListElement).innerHTML = ''
    arr.forEach((item: TodoType, index: number) => {
        let elItem: HTMLLIElement | null = document.createElement("li")
        elItem.className = "flex items-center justify-between bg-slate-300 p-2 rounded-md"
        elItem.innerHTML = `<div class="flex items-center justify-between gap-[8px]">
            <span>${index + 1}.</span>
            <strong>${item.value}</strong>
        </div>
        <div class="flex items-center gap-2">
            <button onclick="handleUpdateTodo(${index})" class="bg-blue-500 text-white font-semibold p-2 inline-block rounded-md">Update</button>
            <button onclick="handleDeleteTodo(${index})" class="bg-red-500 text-white font-semibold p-2 inline-block rounded-md">Delete</button>
        </div>`
        list?.appendChild(elItem)
    })
}


// Delete part 
function handleDeleteTodo(id: number) {
    todos.splice(id, 1)
    renderTodos(todos, elList)
    setState("todos", todos)
}
// Delete part 


// update part 
function handleUpdateTodo(id: number) {
    const findObj = todos[id];
    if (!findObj) return;

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
    if (confirm("Are you sure delete all todos?")){
        todos = []
        setState("todos", todos)
        renderTodos(todos, elList)
    }
}
// delete part 