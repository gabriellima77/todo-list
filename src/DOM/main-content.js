import {dom} from './dom';
import {renderSideMenu} from './side-bar';
import {createHeader} from './header-bar';

function createContainer() {
    const content = dom.createDivById("container");
    const projectInfo = dom.createDivById("project-info");
    const h2 = document.createElement("h2");
    h2.id = "project-name";
    h2.textContent = "Default";
    const para = document.createElement("p");
    para.classList.add("date");
    para.textContent = "Fri, Jan, 8";
    dom.appendNode(projectInfo, h2, para)
    const addTask = dom.createDivById("add-task");
    addTask.addEventListener("click", AddProject, true);
    const todo = document.createElement("div");
    todo.classList.add("todo");
    dom.appendNode(content, projectInfo, addTask, todo);
    return content;
}

export function createMain(){
    const main = document.createElement("main");
    const div = createContainer();
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

function renderAddCard() {
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

function removeCard() {
    const card = this.parentElement.parentElement;
    const content = document.querySelector("#container");
    content.removeChild(card);
}

export function AddProject() {
    const card = renderAddCard();
    const h3 = document.createElement("h3");
    h3.textContent = "Add Project";
    const label = dom.createLabel({id: "title-label", text: "Title"});
    const input = dom.createTextInput({classList: ["add-input"], placeHolder: "Enter the Title"});
    const colorLabel = dom.createLabel({id: "color-label", text: "Board Color"});
    const divColor = dom.createDivById("color-input");
    const colorInput = document.createElement("input");
    const divOption = dom.createDivByClass(["option-box"]);
    const confirmBtn = dom.createDivByClass(["confirm-btn"]);
    confirmBtn.textContent = "Confirm";
    const cancelBtn = dom.createDivByClass(["cancel-btn"]);
    cancelBtn.addEventListener("click", removeCard);
    cancelBtn.textContent = "Cancel";
    colorInput.type = "color";
    colorInput.addEventListener("input", pickColor);
    label.appendChild(input);
    divColor.appendChild(colorInput);
    colorLabel.appendChild(divColor);
    dom.appendNode(divOption, confirmBtn, cancelBtn);
    dom.appendNode(card, h3, label, colorLabel, divOption);
}