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
    addTask.addEventListener("click", renderAddTaskCard);
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

function renderAddTaskCard() {
    const container = document.getElementById("container");
    const cardAdd = dom.createDivById("card-add");
    dom.appendNode(container, cardAdd);
}