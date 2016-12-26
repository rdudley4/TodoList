// Global Variables
// ----------------

var addTaskInputField   = document.getElementById('new-task'),
    addTaskBtn          = addTaskInputField.nextElementSibling,
    incompleteTasksList = document.getElementById('incomplete-tasks'),
    completedTaskList   = document.getElementById('completed-tasks'),
    taskTemplate        = incompleteTasksList.children[0];


// Functions
// ---------

function addTask() {
    var newTask      = taskTemplate.cloneNode(true),
        newTaskLabel = newTask.children[1],
        newTaskName  = addTaskInputField.value,
        checkBox     = newTask.children[0];
    
    if(newTaskName.length > 0) {
        newTaskLabel.innerHTML = newTaskName;
        checkBox.checked = false;
        incompleteTasksList.appendChild(newTask);
        updateButtonEvents();
    } else {
        alert("Please enter a name for the task.");
    }  
}

function deleteTask() {
    var parent = this.parentNode;
    parent.remove();
}

function editTask() {
    var parent = this.parentNode,
        label  = parent.children[1],
        input  = parent.children[2]; 
    
    if(parent.className === "editMode") {
        parent.className = "";
        this.innerHTML = "Edit";
        // Set our label text to the value of the input field upon exiting edit mode.
        label.innerHTML = input.value;
    } else {
        parent.className += "editMode";
        this.innerHTML = "Done";
        // Set the input field value to the contents of our label upon entering edit mode.
        input.value = label.innerHTML;
    }
}

function completeTask() {
    var parent = this.parentNode,
        clone  = parent.cloneNode(true);
    
    if(this.checked === true) {
        completedTaskList.appendChild(clone);
        console.log('Item marked as completed.');
    } else {
        incompleteTasksList.appendChild(clone);
        console.log('Item marked as incomplete.');
    }

    parent.remove();
    updateButtonEvents();
}

function updateButtonEvents() {
    var deleteBtns = document.querySelectorAll('.delete'),
        editBtns   = document.querySelectorAll('.edit'),
        checkBoxes = document.querySelectorAll('.completion');

    for(i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', deleteTask);
        editBtns[i].addEventListener('click', editTask);
        checkBoxes[i].addEventListener('click', completeTask);
    }
}


// Do Stuff
// --------

addTaskBtn.onclick = function() {
    addTask();
}

window.onload = function() {
    var checkBoxes = document.querySelectorAll('.completion');
    for(i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;
    }
    updateButtonEvents();
}