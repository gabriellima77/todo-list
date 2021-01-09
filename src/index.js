import {dom} from './dom';
import {demoEvent, menuFunction, showProjects} from './events';

// dom.renderLoginWindow();
// const btn = document.querySelector(".demo");
// btn.addEventListener("click", demoEvent);
dom.renderMainContent();
const addBtn = document.querySelector("#add-task");
const menuBtn = document.querySelector("#menu-btn");
const projects = document.querySelector("#projects");
menuBtn.addEventListener("click", menuFunction);
addBtn.addEventListener("click", dom.renderAddTaskCard);
projects.addEventListener("click", showProjects.bind(projects));