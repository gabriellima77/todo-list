import {allTasks} from '../index';
import {dom} from './dom';
import {svg} from './svg';
import {renderSideMenu} from './side-bar';
import {createHeader} from './header-bar';
import {addProject, confirmTaskEvent} from '../events';

let currentProject;

export function createTaskTag(todo) {
    const div = dom.createDivByClass(["todo"]);
    div.style.borderLeftColor = todo.colorLabel;
    div.style.boxShadow = `0px 1px 4px 0px ${todo.colorLabel}`;
    return div;
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
    h2.textContent = project.projectTitle;
    const para = document.createElement("p");
    para.classList.add("date");
    para.textContent = "Fri, Jan, 8";
    dom.appendNode(projectInfo, h2, para)
    const addTask = createAddTaskBtn();
    dom.appendNode(content, projectInfo, addTask);
    putTasks(content);
    return content;
}

export function createMain(){
    const main = document.createElement("main");
    const div = createContainer(allTasks);
    const nav = renderSideMenu();
    dom.appendNode(main, nav, div);
    return main;
}

export function renderMainContent(){
    const body = document.querySelector("body");
    const header = createHeader();
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

function createTitleInput() {
    const label = dom.createLabel({id: "title-label", text: "Title"});
    const input = dom.createTextInput({classList: ["add-input"], placeHolder: "Enter the Title"});
    label.appendChild(input);
    return label;
}

function createOptions(event) {
    const divOption = dom.createDivByClass(["option-box"]);
    const confirmBtn = dom.createDivByClass(["confirm-btn"]);
    confirmBtn.textContent = "Confirm";
    confirmBtn.addEventListener("click", event.bind(null, currentProject));
    const cancelBtn = dom.createDivByClass(["cancel-btn"]);
    cancelBtn.addEventListener("click", removeCard);
    cancelBtn.textContent = "Cancel";
    dom.appendNode(divOption, confirmBtn, cancelBtn);
    return divOption;
}

function getColor() {
    const children = Array.from(this.children);
    children.forEach(child=> {
        if(child.value == this.value){
            this.style.background = child.style.background;
        }
    })
}

function createPriorityList(options) {
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
    label.appendChild(select);
    return label;
}

function createDueDate() {
    const label = dom.createLabel({id: "", text: "Due Date:"});
    const input = document.createElement("input");
    input.id = "date";
    input.type = "date";
    label.appendChild(input);
    return label
}

function createDescriptionInput () {
    const description = document.createElement("textarea");
    description.placeholder = "Description";
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
    const taskContent = {color};
    const keys = ["title", "priority", "dueDate", "notes", "description"];
    for(let i = 0; i < keys.length; i++){
        taskContent[keys[i]] = inputs[i].value; 
    }
    return taskContent;
}

export function AddProject() {
    const card = renderAddCard();
    const h3 = document.createElement("h3");
    const colorLabel = createColorPicker();
    const titleInput = createTitleInput();
    const divOption = createOptions(addProject);
    h3.textContent = "Add Project";
    dom.appendNode(card, h3, titleInput, colorLabel, divOption);
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
    h3.textContent = "Add Project";
    dom.appendNode(card, h3, titleInput, priority, notesInput, dueDateInput, description, divOption);
}

