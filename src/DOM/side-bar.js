import {dom} from './dom';
import {svg} from './svg';
import {showProjects} from '../events';

function renderSideMenu() {
    const nav = dom.createNav("side-menu");
    const div = dom.createDiv("projects");
    div.addEventListener("click", showProjects.bind(div));
    const box = dom.createDiv("");
    box.classList.add("box");
    const content = dom.createDiv("content");
    const arrow = svg.createSVGArrow(["arrow"], "0 0 20 20");
    const para = document.createElement("p");
    const plusSVG = svg.createSVGPlus(["plus-sign", "end"], "0 0 40 40");
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

function putProjects() {
    removeProjects();
    const content = document.querySelector("#content");
    const div = dom.createDiv("add-project");
    const plus = svg.createSVGPlus(["plus-sign", "end"], "0 0 40 40");
    const para = document.createElement("p");
    para.textContent = "Add Project";
    dom.appendNode(div, plus, para);
    dom.appendNode(content, div);
}

export {renderSideMenu, removeProjects, putProjects};