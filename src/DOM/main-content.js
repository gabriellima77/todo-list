import {allTasks, getProjectByTodo, storeLocalData} from '../index';
import {format} from 'date-fns';
import {dom} from './dom';
import {svg} from './svg';
import {SideBar} from './side-bar';
import {Header} from './header-bar';
import {confirmTaskEvent, removeTask,
        showTaskContent, changeChecked, editEvent} from '../events';

let currentProject;
const main = function () {
    

}

const events = function() {

}

function putTodoContent(todo, div) {
    const svgArrow = svg.createSVGArrow(["arrow", "arrow-todo"], "0 0 40 40");
    const inputContainer = document.createElement("label");
    inputContainer.classList.add("input-container");
    const span = dom.createSpan(["checkmark"]);
    const checkBox = document.createElement("input");
    checkBox.addEventListener("change", changeChecked.bind(checkBox, todo));
    checkBox.type = "checkbox";
    dom.appendNode(inputContainer, checkBox, span);
    const para = document.createElement("p");
    para.classList.add("task-title");
    if(todo.checked){
        checkBox.checked = todo.checked;
        para.classList.add("checked");
    }
    para.textContent = todo.title;
    const dueDate = document.createElement("p");
    dueDate.classList.add("dueDate");
    dueDate.textContent = todo.dueDate;
    const edit = dom.createDivByClass(["edit"]);
    edit.addEventListener("click", editEvent.bind(div, todo));
    const remove = svg.createSVGPlus(["remove", "end"], "0 0 40 40");
    remove.addEventListener("click", removeTask.bind(div, todo));
    const option = dom.createDivByClass(["edit-box"]);
    dom.appendNode(option, dueDate, edit, remove);
    dom.appendNode(div, svgArrow, inputContainer, para, option);
}

export function createTaskTag(todo) {
    const container = dom.createDivByClass(["todo-container"]);
    const div = dom.createDivByClass(["todo"]);
    const content = dom.createDivByClass(["todo-content"]);
    dom.appendNode(container, div, content);
    div.style.borderLeftColor = todo.color;
    div.style.boxShadow = `0px 1px 4px 0px ${todo.color}`;
    div.addEventListener("click", showTaskContent.bind(content, todo));
    putTodoContent(todo, div);
    return container;
}

export function removeTaskTag(div){
    const container = document.querySelector("#container");
    const todoContainer = div.parentElement;
    container.removeChild(todoContainer);
}

function createAddTaskBtn() {
    const addTask = dom.createDivById("add-task");
    addTask.addEventListener("click", AddTaskEvent);
    const plusSvg = svg.createSVGPlus(["plus-sign"], "0 0 40 40");
    const para = document.createElement("p");
    para.textContent = "Add Task";
    dom.appendNode(addTask, plusSvg, para);
    return addTask;
}

export function cleanContainer() {
    const main = document.querySelector("main");
    const container = document.querySelector("#container");
    main.removeChild(container);
}

function putTasks(container) {
    const todos = currentProject.todos;
    todos.forEach(todo=> {
        let div = createTaskTag(todo);
        container.appendChild(div);
    });
}

export function createContainer(project) {
    currentProject = project;
    const content = dom.createDivById("container");
    const projectInfo = dom.createDivById("project-info");
    const h2 = document.createElement("h2");
    h2.id = "project-name";
    h2.textContent = project.title;
    const para = document.createElement("p");
    para.classList.add("date");
    para.textContent = format(new Date(), "ccc, MMM, dd");
    dom.appendNode(projectInfo, h2, para)
    const addTask = createAddTaskBtn();
    dom.appendNode(content, projectInfo, addTask);
    putTasks(content);
    return content;
}

export function createMain(){
    const main = document.createElement("main");
    const div = createContainer(allTasks);
    const nav = SideBar.renderSideMenu();
    dom.appendNode(main, nav, div);
    return main;
}

export function renderMainContent(user){
    const body = document.querySelector("body");
    const header = Header.createHeader(user);
    const main = createMain();
    dom.appendNode(body, header, main);
}

export function renderAddCard() {
    const container = document.getElementById("container");
    const children = Array.from(container.children);
    children.forEach(child=> {
        if(child.id == "card-add"){
            container.removeChild(child);
        }
    });
    const cardAdd = dom.createDivById("card-add");
    dom.appendNode(container, cardAdd);
    return cardAdd;
}

function pickColor() {
    const div = this.parentElement;
    const color = this.value;
    div.style.background = color;
}

export function removeCard() {
    const card = document.querySelector("#card-add");
    const content = document.querySelector("#container");
    content.removeChild(card);
}

function createColorPicker() {
    const colorLabel = dom.createLabel({id: "color-label", text: "Board Color"});
    const divColor = dom.createDivById("color-input");
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = "#00ffd5";
    colorInput.addEventListener("input", pickColor);
    divColor.appendChild(colorInput);
    colorLabel.appendChild(divColor);
    return colorLabel;
}

function createTitleInput(todo) {
    const label = dom.createLabel({id: "title-label", text: "Title"});
    const input = dom.createTextInput({classList: ["add-input"], placeHolder: "Enter the Title"});
    if(todo){
        input.value = todo.title;
    }
    label.appendChild(input);
    return label;
}

function createOptions(event, todo = null) {
    const divOption = dom.createDivByClass(["option-box"]);
    const confirmBtn = dom.createDivByClass(["confirm-btn"]);
    confirmBtn.textContent = "Confirm";
    confirmBtn.addEventListener("click", event.bind(todo, currentProject));
    const cancelBtn = dom.createDivByClass(["cancel-btn"]);
    cancelBtn.addEventListener("click", removeCard);
    cancelBtn.textContent = "Cancel";
    dom.appendNode(divOption, confirmBtn, cancelBtn);
    return divOption;
}

export function AddProject() {
    const card = renderAddCard();
    const h3 = document.createElement("h3");
    const colorLabel = createColorPicker();
    const titleInput = createTitleInput();
    const divOption = createOptions(SideBar.addProject);
    h3.textContent = "Add Project";
    dom.appendNode(card, h3, titleInput, colorLabel, divOption);
}

function getColor() {
    const children = Array.from(this.children);
    children.forEach(child=> {
        if(child.value == this.value){
            this.style.background = child.style.background;
        }
    })
}

function createPriorityList(options, todo) {
    const label = dom.createLabel({id: "", text: "Choose the priority:"});
    label.setAttribute("for", "priority");
    const select = document.createElement("select");
    select.id = "priority";
    select.name = "priority";
    options.forEach(optionContent => {
        let option = document.createElement("option");
        option.value = optionContent.text;
        option.textContent = optionContent.text;
        option.style.background = optionContent.color;
        select.appendChild(option);
    });
    select.addEventListener("change", getColor);
    if(todo){
        select.value = todo.priority;
        select.style.background = todo.color;
    }
    label.appendChild(select);
    return label;
}

function createDueDate(todo) {
    const label = dom.createLabel({id: "", text: "Due Date:"});
    const input = document.createElement("input");
    input.id = "date";
    input.type = "date";
    label.appendChild(input);
    if(todo){
        const dueDate = format(new Date(todo.dueDate), "yyyy-MM-dd");
        input.value = dueDate;
    }
    return label;
}

function createDescriptionInput(todo) {
    const description = document.createElement("textarea");
    description.placeholder = "Description";
    if(todo){
        description.value = todo.description;
    }
    return description
}

export function getTaskContent () {
    const card = document.querySelector("#card-add");
    const children = Array.from(card.children);
    let color = "#42ecff";
    const labels = children.filter(child=> {
        if(child.nodeName == "LABEL"){
            return child;
        }
    });
    const inputs = []
    labels.forEach(label=> {
        if(label.firstElementChild.nodeName == "SELECT"){
            const select = label.firstElementChild;
            const hasBackgroundColor = select.style.background;
            if(hasBackgroundColor){
                color = select.style.background;
            }
        }
        inputs.push(label.firstElementChild);
    });
    children.forEach(child=> {
        if(child.nodeName == "INPUT"|| child.nodeName == "TEXTAREA"){
            inputs.push(child);
        }
    });
    const taskContent = {color, checked: false};
    const keys = ["title", "priority", "dueDate", "notes", "description"];
    for(let i = 0; i < keys.length; i++){
        if(keys[i] == "dueDate"){
            const str = inputs[i].value.replaceAll("-", ", ");
            const dueDate = (str.length == 0)? format(new Date(), "MM/dd/yyyy")
                                             : format(new Date(str), "MM/dd/yyyy");
            taskContent[keys[i]] = dueDate;
        }
        else {
            taskContent[keys[i]] = inputs[i].value;
        }
    }
    return taskContent;
}

 export function AddTaskEvent() {
    const card = renderAddCard();
    const h3 = document.createElement("h3");
    const priorityText = [{text: "Low", color: "#42ecff"}, {text: "Medium", color: "#89ff45"},
                         {text: "High", color: "#ffcd42"}, {text: "Extreme", color: "#ff4542"}];
    const priority = createPriorityList(priorityText);
    const titleInput = createTitleInput();
    const notesInput = dom.createTextInput({classList: ["notes"], placeHolder: "Enter your notes"});
    const dueDateInput = createDueDate();
    const description = createDescriptionInput();
    const divOption = createOptions(confirmTaskEvent);
    divOption.classList.add("task");
    h3.textContent = "Add Task";
    dom.appendNode(card, h3, titleInput, priority, notesInput, dueDateInput, description, divOption);
}

function clearTag(todoTag){
    const children = Array.from(todoTag.children);
    children.forEach(child=> todoTag.removeChild(child));
}

function confirmEditTask(todoTag){
    let project;
    let todoIndex;
    if(currentProject.title == "Default"){
        project = getProjectByTodo(this);
        if(project){
            todoIndex = project.todos.indexOf(this);
        }
        
    }
    if(!project){
        todoIndex = allTasks.todos.indexOf(this);
    }
    const todoContainer = todoTag.parentElement;
    const children = Array.from(todoContainer.children);
    const contentBox = children.filter(child=>{
        if(child.classList.contains("todo-content")) {
            return child;
        }
    })[0];
    const content = getTaskContent();
    for(let key in content){
        this[key] = content[key];
        if(project){
            project.todos[todoIndex][key] = content[key];
        }
        else {
            allTasks.todos[todoIndex][key] = content[key];
        }
    }
    clearTag(todoTag);
    todoTag.style.borderLeftColor = this.color;
    todoTag.style.boxShadow = `0px 1px 4px 0px ${this.color}`;
    putTodoContent(this, todoTag);
    if(contentBox.classList.contains("open")){
        contentBox.classList.remove("open");
        clearTag(contentBox);
    }
    removeCard();
    storeLocalData();
}

export function editTaskEvent(todo, todoTag) {
    const card = renderAddCard();
    const h3 = document.createElement("h3");
    const priorityText = [{text: "Low", color: "#42ecff"}, {text: "Medium", color: "#89ff45"},
    {text: "High", color: "#ffcd42"}, {text: "Extreme", color: "#ff4542"}];
    const priority = createPriorityList(priorityText, todo);
    const titleInput = createTitleInput(todo);
    const notesInput = dom.createTextInput({classList: ["notes"], placeHolder: "Enter your notes"});
    notesInput.value = todo.notes;
    const dueDateInput = createDueDate(todo);
    const description = createDescriptionInput(todo);
    const divOption = createOptions(confirmEditTask.bind(todo, todoTag));
    divOption.classList.add("task");
    h3.textContent = "Edit Task";
    dom.appendNode(card, h3, titleInput, priority, notesInput, dueDateInput, description, divOption);
}

export function addContent(container, todo) {
    const hasChildren = Array.from(container.children).length;
    if(!hasChildren){
        const description = dom.createDivByClass(["description"]);
        const descriptionHeader = document.createElement("h3");
        descriptionHeader.textContent = "Description: ";
        const descriptionPara = document.createElement("p");
        descriptionPara.textContent = todo.description;
        dom.appendNode(description, descriptionHeader, descriptionPara);
        const notes = dom.createDivByClass(["todo-notes"]);
        const notesHeader = document.createElement("h3");
        notesHeader.textContent = "Notes: ";
        const notesPara = document.createElement("p");
        notesPara.textContent = todo.notes;
        dom.appendNode(notes, notesHeader, notesPara);
        dom.appendNode(container, description, notes);
    }
}

export function isContentOpen(){
    const content = document.querySelector("#content");
    const hasClass = content.classList.value;
    if(hasClass){
        return true;
    }
    return false;
}