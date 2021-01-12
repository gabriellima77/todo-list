import {dom} from './dom';
import {svg} from './svg';
import {showProjects, putProjectTag, removeProject} from '../events';
import {AddProject} from './main-content';

function renderSideMenu() {
    const nav = dom.createNav("side-menu");
    const div = dom.createDivById("projects");
    div.addEventListener("click", showProjects.bind(div));
    const box = dom.createDivById("");
    box.classList.add("box");
    const content = dom.createDivById("content");
    const arrow = svg.createSVGArrow(["arrow"], "0 0 20 20");
    const para = document.createElement("p");
    const plusSVG = svg.createSVGPlus(["plus-sign", "end"], "0 0 40 40");
    plusSVG.addEventListener("click", AddProject, true);
    para.textContent = "Projects";
    dom.appendNode(box, arrow, para)
    dom.appendNode(div, box, plusSVG);
    dom.appendNode(nav, div, content);
    return nav;
}

function removeProjects() {
    const content = document.querySelector("#content");
    Array.from(content.children).forEach(child=> content.removeChild(child));
}

function createDivProject(project) {
    const div = dom.createDivByClass(["project-tag"]);
    const projectName = document.createElement("p");
    const numberTodos = document.createElement("p");
    numberTodos.classList.add("number");
    const remove = svg.createSVGPlus(["remove"], "0 0 40 40");
    remove.addEventListener("click", removeProject.bind(div));
    projectName.textContent = project.title;
    div.style.background = project.color;
    numberTodos.textContent = project.todos.length;
    dom.appendNode(div, projectName, numberTodos, remove);
    return div;
}

export function removeTag(tag) {
    const parent = tag.parentElement;
    parent.removeChild(tag);
}

function putProjects(allProjects) {
    removeProjects();
    const content = document.querySelector("#content");
    const div = dom.createDivById("add-project");
    div.addEventListener("click", AddProject, true);
    const plus = svg.createSVGPlus(["plus-sign", "end"], "0 0 40 40");
    const para = document.createElement("p");
    para.textContent = "Add Project";
    dom.appendNode(div, plus, para);
    dom.appendNode(content, div);
    allProjects.forEach(project=> {
        if(project.title != "Default"){
            putProjectTag(project);
        }
    });
}

export {renderSideMenu, removeProjects, putProjects, putProjectTag, createDivProject};