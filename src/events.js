import {allProject, allTasks, getProjectByTodo, storeLocalData} from './index';
import {dataBase, auth} from './login';
import {dom} from './DOM/dom';
import {todo, project} from './todo';
import {renderMainContent, removeCard, getTaskContent,
        createTaskTag, cleanContainer, createContainer,
        removeTaskTag, addContent, editTaskEvent} from './DOM/main-content';
import {removeProjects, putProjects, createDivProject,
        removeTag} from './DOM/side-bar';
import {startDemo, putAlert} from './DOM/singup';


export function selectProject(index) {
    const target = event.target;
    const isRemove = (target.nodeName == "rect" || target.nodeName == "svg")? true: false;
    if(!isRemove){
        const main = document.querySelector("main");
        const project = allProject[index];
        cleanContainer();
        const container = createContainer(project);
        main.appendChild(container);
    }
}

function goToDefault(){
    const main = document.querySelector("main");
    const project = allProject[0];
    cleanContainer();
    const container = createContainer(project);
    main.appendChild(container);
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
    project.todos.forEach(todo=>{
        let index = allTasks.todos.indexOf(todo);
        allTasks.todos.splice(index, 1);
    });
    const isLogged = JSON.parse(localStorage.getItem("logged"));
    if(isLogged){
        const user = auth.currentUser;
        console.log(user.uid);
        dataBase.ref(user.uid).set(allProject);
    }
    else {
        storeLocalData();
    }
    goToDefault();
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
        const label = document.querySelector("#user");
        putAlert("Has at least one letter at beginning", label);
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
        const isLogged = JSON.parse(localStorage.getItem("logged"));
        if(isLogged){
            const user = auth.currentUser;
            console.log(user.uid);
            dataBase.ref(user.uid).set(allProject);
        }
        else {
            storeLocalData();
        }
        putProjectTag(newProject);
        removeCard();
    }
}

function updateProjectLength(index, length){
    const hasIndex = (index !== null)? true: false;
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

export function removeTask(todo){
    event.stopPropagation();
    const project = getProjectByTodo(todo);
    if(project){
        project.removeTodo(todo);
        const index = allProject.indexOf(project);
        const length = project.todos.length;
        updateProjectLength(index, length);
    }
    allTasks.removeTodo(todo);
    storeLocalData();
    removeTaskTag(this);
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
    else{
        newTodo.isDefault = true;
    }
    newTodo.putContent(content);
    project.addTodo(newTodo);
    const index = allTasks.todos.indexOf(newTodo);
    const div = createTaskTag(newTodo);
    div.dataset.index = index;
    updateProjectLength(projectIndex, project.todos.length);
    container.appendChild(div);
    const isLogged = JSON.parse(localStorage.getItem("logged"));
    if(isLogged){
        const user = auth.currentUser;
        console.log(user.uid);
        dataBase.ref(user.uid).set(allProject);
    }
    else {
        storeLocalData();
    }
    removeCard();
}

function removeContent(container){
    const children = Array.from(container.children);
    children.forEach(child=> container.removeChild(child));
}

export function showTaskContent(todo) {
    const isTaskOpen = this.classList.contains("open");
    if(!isTaskOpen){
        this.classList.add("open");
        addContent(this, todo);
    }
    else {
        this.classList.remove("open");
        removeContent(this);
    }
}

export function changeChecked(todo) {
    const container = this.parentElement.parentElement;
    const children = Array.from(container.children);
    const todoTitle = children.filter(child=> {
        if(child.classList.contains("task-title")){
            return child;
        }
    })[0];
    todo.checked = this.checked;
    if(todo.checked){
        todoTitle.classList.add("checked");
    }
    else {
        todoTitle.classList.remove("checked");
    }
    const isLogged = JSON.parse(localStorage.getItem("logged"));
    if(isLogged){
        const user = auth.currentUser;
        console.log(user.uid);
        dataBase.ref(user.uid).set(allProject);
    }
    else {
        storeLocalData();
    }
}

export function editEvent(todo) {
    event.stopPropagation();
    editTaskEvent(todo, this);
}