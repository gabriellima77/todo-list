import {allProject, allTasks, getProjectByTodo, storeLocalData,
        dataBase, auth } from './index';
import {todo} from './todo';
import {removeCard, getTaskContent,
        createTaskTag, cleanContainer, createContainer,
        removeTaskTag, addContent, editTaskEvent, isContentOpen} from './DOM/main-content';

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