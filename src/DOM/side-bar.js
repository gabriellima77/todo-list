import {dom} from './dom';
import {svg} from './svg';
import {project} from '../todo';
import {selectProject} from '../events';
import {allProject, storeLocalData} from '../index';
import {AddProject, removeCard, cleanContainer,
        createContainer, isContentOpen} from './main-content';

const sideBar = function() {

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

    function removeProjects() {
        const content = document.querySelector("#content");
        Array.from(content.children).forEach(child=> content.removeChild(child));
    }

    function removeTag(tag) {
        const parent = tag.parentElement;
        parent.removeChild(tag);
    }

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

        // ========= events ========= //

    function showProjects(e) {
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
    
    function putProjectTag(project){
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

    function removeFromAllTasks(project){
        project.todos.forEach(todo=>{
            let index = allTasks.todos.indexOf(todo);
            allTasks.todos.splice(index, 1);
        });
        const isLogged = JSON.parse(localStorage.getItem("logged"));
        if(isLogged){
            const user = auth.currentUser;
            dataBase.ref(user.uid).set(allProject);
        }
        else {
            storeLocalData();
        }
        goToDefault();
    }
    
    function removeProject(){
        const index = this.dataset.index;
        const project = allProject.splice(index, 1)[0];
        removeFromAllTasks(project);
        removeTag(this);
    }

    function goToDefault(){
        const main = document.querySelector("main");
        const project = allProject[0];
        cleanContainer();
        const container = createContainer(project);
        main.appendChild(container);
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
    
    function addProject() {
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

    return {removeProjects, renderSideMenu, addProject}

}

const SideBar = sideBar();

export {SideBar};