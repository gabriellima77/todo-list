import {dom} from './DOM/dom';
import {todo, project} from './todo';
import {renderMainContent, removeCard, getTaskContent} from './DOM/main-content'
import {removeProjects, putProjects} from './DOM/side-bar';
import {startDemo, putAlert} from './DOM/singup';


const allProject = [];
const allTasks = new project("Default", "blue");

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
        putProjects();
    }
}

function getAndValidTitle(){
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

export function addProject() {
    const card = this.parentElement.parentElement;
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
    const title = getAndValidTitle();
    if(title) {
        const newProject = new project(title, color);
        allProject.push(newProject)
        console.log(allProject);
        removeCard();
    }
}

export function confirmTaskEvent() {
    const content = getTaskContent();
    console.log(content);
    allTasks.addTodo(content);
    console.log(allTasks);
}
