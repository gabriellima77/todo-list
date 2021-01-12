import {allProject, allTasks} from './index';
import {dom} from './DOM/dom';
import {todo, project} from './todo';
import {renderMainContent, removeCard, getTaskContent,
        createTaskTag, cleanContainer, createContainer,
        } from './DOM/main-content';
import {removeProjects, putProjects, createDivProject,
        removeTag} from './DOM/side-bar';
import {startDemo, putAlert} from './DOM/singup';


export function selectProject(index) {
    const target = event.target;
    console.log(target.nodeName);
    const isRemove = (target.nodeName == "rect" || target.nodeName == "svg")? true: false;
    if(!isRemove){
        const main = document.querySelector("main");
        const project = allProject[index];
        cleanContainer();
        const container = createContainer(project);
        main.appendChild(container);
    }
}

export function demoEvent(){
    const hasName = localStorage.getItem("name");
    if(hasName){
        dom.removeBodyContent();
        renderMainContent();
    }
    else{
        startDemo();
    }
}

function removeFromAllTasks(project){
    console.log(project);
    project.todos.forEach(todo=>{
        let index = allTasks.todos.indexOf(todo);
        allTasks.todos.splice(index, 1);
    });
    
}

export function removeProject(){
    const index = this.dataset.index;
    const project = allProject.splice(index, 1)[0];
    removeFromAllTasks(project);
    removeTag(this);
}

function isValidName() {
    const regex = /^[a-zA-Z].*/
    const input = document.querySelector(".login-input");
    const name = input.value;
    if(regex.test(name)){
        localStorage.setItem("name", name);
        return true;
    }
    else {
        return false;
    }
}

export function startApp() {
    if(isValidName()){
        dom.removeBodyContent();
        renderMainContent();
    }
    else {
        putAlert("Has at least one letter at beginning");
    }
}

export function menuFunction() {
    const menu = document.querySelector("#side-menu");
    const arrow = document.querySelector(".arrow");
    const content = document.querySelector("#content");
    const hasClosed = menu.classList.contains("closed");
    if(hasClosed) {
        menu.classList.remove("closed");
    }else {
        menu.classList.add("closed");
        arrow.classList.remove("active");
        content.classList.remove("content-active");
        removeProjects();
    }
}

export function showProjects(e) {
    const classValue = e.target.classList.value;
    const hasPlus = classValue.includes("plus");
    if(hasPlus){
        return;
    }
    const arrow = this.firstElementChild.firstElementChild;
    const content = document.querySelector("#content");
    const isActive = arrow.classList.contains("active");
    const isMenuClosed = document.querySelector("#side-menu").classList.contains("closed");
    if(isActive || isMenuClosed) {
        arrow.classList.remove("active");
        content.classList.remove("content-active");
        removeProjects();
    }
    else {
        arrow.classList.add("active");
        content.classList.add("content-active");
        putProjects(allProject);
    }
}

function ValidTitle(){
    const regex = /^[a-zA-Z].+/;
    const input = document.querySelector(".add-input");
    const title = input.value;
    if(regex.test(title)){
        return title;
    }
    else {
        return false;
    }

}

function isContentOpen(){
    const content = document.querySelector("#content");
    const hasClass = content.classList.value;
    if(hasClass){
        return true;
    }
    return false;
}

export function putProjectTag(project){
    const content = document.querySelector("#content");
    if(isContentOpen()){
        const projectIndex = allProject.indexOf(project);
        const projectDiv = createDivProject(project);
        projectDiv.addEventListener("click", selectProject.bind(null, projectIndex));
        projectDiv.dataset.index = projectIndex;
        content.appendChild(projectDiv);
    }
    return;
}

export function addProject() {
    const card = document.querySelector("#card-add");
    const children = Array.from(card.children);
    const labels = children.filter(child=> {
        if(child.nodeName == "LABEL"){
            return child;
        }
    });
    let color;
    labels.forEach(node=> {
        const input = node.firstElementChild;
        if(input.nodeName == "DIV"){
            color = input.firstElementChild.value;
        }
    });
    const title = ValidTitle();
    if(title) {
        const newProject = new project(title, color);
        allProject.push(newProject);
        const localData = JSON.stringify(allProject);
        localStorage.setItem("userData", localData);
        putProjectTag(newProject);
        removeCard();
    }
}

function updateProjectLength(index, length){
    const hasIndex = (index !== null)? true: false;
    console.log(isContentOpen(), hasIndex);
    if(isContentOpen() && hasIndex){
        const projects = Array.from(document.querySelectorAll(".project-tag"));
        const project = projects.filter(tag=>{
            if(tag.dataset.index == index){
                return tag;
            }
        })[0];
        const numberOfTasks = Array.from(project.children).filter(child=>{
            if(child.classList.contains("number")){
                return child;
            }
        })[0];
        numberOfTasks.textContent = length;
    }
    return;
}

export function confirmTaskEvent(project) {
    const container = document.querySelector("#container");
    const content = getTaskContent();
    const newTodo = new todo(content.title);
    let projectIndex = null;
    if(project != allTasks){
        allTasks.addTodo(newTodo);
        projectIndex = allProject.indexOf(project);
    }
    newTodo.putContent(content);
    project.addTodo(newTodo);
    const index = allTasks.todos.indexOf(newTodo);
    const div = createTaskTag(newTodo);
    div.dataset.index = index;
    updateProjectLength(projectIndex, project.todos.length);
    container.appendChild(div);
    const localData = JSON.stringify(allProject);
    localStorage.setItem("userData", localData);
    removeCard();
}
