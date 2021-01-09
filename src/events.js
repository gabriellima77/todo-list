import {dom} from './dom';
import {todo} from './todo';

export function demoEvent(){
    dom.removeBodyContent()
}

export function menuFunction() {
    const menu = document.querySelector("#side-menu");
    const arrow = document.querySelector(".arrow");
    const hasClosed = menu.classList.contains("closed");
    if(hasClosed) {
        menu.classList.remove("closed");
    }else {
        menu.classList.add("closed");
        arrow.classList.remove("active");
    }
}

export function showProjects() {
    const arrow = this.firstElementChild.firstElementChild;
    const content = document.querySelector("#content");
    const isActive = arrow.classList.contains("active");
    if(isActive) {
        arrow.classList.remove("active");
        content.classList.remove("content-active");
    }
    else {
        arrow.classList.add("active");
        content.classList.add("content-active");
    }

}

function addTask() {
    const taskContent = getTaskContent();
    const newTodo = new todo(taskContent.title);
    newTodo.putContent(taskContent);
}