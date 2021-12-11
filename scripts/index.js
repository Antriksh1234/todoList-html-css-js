var dateText = document.getElementById("date_text");
dateText.innerHTML = dateString;

const localStorageKey = "todolist_todos";

//Three major cards available
var todoListCard = document.getElementById("todolist_full_card");
var addItemCard = document.getElementById("add_item_full_card");
var confirmDeleteDialog = document.getElementById("confirmation_center_dialog");

//Initiates the addItemCard widget
var addItemButton = document.getElementById("add_item");

//Buttons that are in addItemCard which add item or cancel task
var cancelAddButton = document.getElementById("cancel_add_btn");
var addItemToListButton = document.getElementById("add_item_to_list_btn");

//Text where the name of new todo item is written
var addItemTextInput = document.getElementById("item_name_text");

//List in todoListCard where todo appear
var unorderedList = document.getElementById("list");

addItemButton.onclick = () => {
    addItemCard.style.pointerEvents = "auto";
    todoListCard.style.opacity = 0;
    addItemCard.style.opacity = 1;
    todoListCard.style.pointerEvents = "none";
    //confirmDeleteDialog.style.pointerEvents = "none";
}

cancelAddButton.onclick = goToListCard;

var todo1 = new TodoItem("Buy Milk", false, 1);
var todo2 = new TodoItem("Buy Eggs", false, 2);
var todo3 = new TodoItem("Read Book", true, 3);

function getTodos() {
    return [];
}

var todoItems = getTodos();
loadTodoList();

function maxID(todoItems) {
    let max = 0;
    for (let i = 0; i < todoItems.length; i++) {
        var todo = todoItems[i];
        if (todo.id > max) {
            max = todo.id;
        }
    }

    return max;
}

function goToListCard() {
    todoListCard.style.opacity = 1;
    addItemCard.style.opacity = 0;
    todoListCard.style.pointerEvents = "auto";
    addItemCard.style.pointerEvents = "none";
}

addItemToListButton.onclick = () => {
    //alert(addItemTextInput.value);
    addElementToList(addItemTextInput.value);
}

function loadTodoList() {
    for (let i = 0; i < todoItems.length; i++) {
        let currTodo = todoItems[i];
        createIndividualTodo(currTodo);
    }

    if (todoItems.length == 0) {
        createNoTodosItem();
    }
}

function createNoTodosItem () {
    var listItem = document.createElement("li");
    listItem.setAttribute("id", "noTodos");
    var textItem = document.createElement("h3");
    textItem.innerHTML = "Woohoo! No Todo Left";

    textItem.setAttribute("id", "noTodos_text");
    listItem.appendChild(textItem);
    unorderedList.appendChild(listItem);
}

function createIndividualTodo(currTodo) {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "list_item");
    listItem.setAttribute("id", "list_item_"+ currTodo.id);

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.setAttribute("class", "check_list_item");
    checkBox.setAttribute("id", "ch" + currTodo.id);
    checkBox.onclick = () => {
        checkTodoItem(checkBox);
    }

    var taskText = document.createElement("p");
    taskText.setAttribute("class", "task_text");
    taskText.setAttribute("id", "todo_text_" + currTodo.id);
    taskText.innerHTML = currTodo.name;

    if (currTodo.checked) {
        checkBox.checked = true;
        taskText.style.textDecoration = "line-through";
    }

    var deleteButton = document.createElement("i");
    deleteButton.setAttribute("class", "far fa-trash-alt");
    deleteButton.setAttribute("id", currTodo.id);
    deleteButton.onclick = () => {
        confirmDeletion(deleteButton);
    }

    var taskWrapper = document.createElement("div");
    taskWrapper.setAttribute("class", "task_wrapper");
    
    taskWrapper.appendChild(checkBox);
    taskWrapper.appendChild(taskText);
    taskWrapper.appendChild(deleteButton);
    
    listItem.appendChild(taskWrapper);

    goToListCard();

    unorderedList.appendChild(listItem);
}

function addElementToList(taskName) {
    taskName = taskName.trim();
    if (taskName.localeCompare("") == 0) {
        alert("Enter a todo first");
        return;
    }

    let max = maxID(todoItems);
    let newTodoItem = new TodoItem(taskName, false, max+1);
    todoItems.push(newTodoItem);
    localStorage.setItem(localStorageKey, JSON.stringify(todoItems));
    if (todoItems.length == 1) {
        //First element added, remove no todos list item
        document.getElementById("noTodos").remove();
    }
    createIndividualTodo(newTodoItem);
    console.log(todoItems);
}

var deleteButtons = document.getElementsByClassName("far");
for (let i = 0; i < deleteButtons.length; i++) {
    let btn = deleteButtons[i];
    btn.onclick = () => {
        confirmDeletion(btn);
    }
}

function confirmDeletion(btn) {
    goToConfirmDeletionCardFromTodoListCard();

    let cancelDeletionBtn = document.getElementById("cancel_delete");
    let confirmDeleteButton = document.getElementById("delete_item");

    confirmDeleteButton.onclick = () => {
        goToTodoListCardFromConfirmDeletionCard();
        deleteTodo(btn);
    }

    cancelDeletionBtn.onclick = () => {
        goToTodoListCardFromConfirmDeletionCard();
    }
}

function goToTodoListCardFromConfirmDeletionCard() {
    todoListCard.style.pointerEvents = "auto";
    todoListCard.style.opacity = 1;
    confirmDeleteDialog.style.pointerEvents = "none";
    confirmDeleteDialog.style.opacity = 0;
}

function goToConfirmDeletionCardFromTodoListCard() {
    todoListCard.style.pointerEvents = "none";
    todoListCard.style.opacity = 0;
    confirmDeleteDialog.style.opacity = 1;
    confirmDeleteDialog.style.pointerEvents = "auto";    
}

function deleteTodo (btn) {
    var id = btn.id;
    var deletedListItemID = "list_item_" + id;
    document.getElementById(deletedListItemID).remove();
    todoItems = todoItems.filter(todo => {
        return todo.id != id;
    });

    if (todoItems.length == 0) {
        createNoTodosItem();
    }

    console.log(todoItems);
}

var checkBoxes = document.getElementsByClassName("check_list_item");
for (let i = 0; i < checkBoxes.length; i++) {
    let checkBox = checkBoxes[i];
    checkBox.onclick = () => {
        checkTodoItem(checkBox);
    }
}

function checkTodoItem(checkBox) {
    var x = checkBox.id;
    var todoTextID = "todo_text_" + x.charAt(2);
    let todoText = document.getElementById(todoTextID);
    const style = getComputedStyle(todoText);
    const textDecorationStyle = style.textDecoration;
    if (textDecorationStyle.includes("line-through")) {
        todoText.style.textDecoration = "none";
    } else {
        //console.log(textDecorationStyle);
        todoText.style.textDecoration = "line-through";
    }
}