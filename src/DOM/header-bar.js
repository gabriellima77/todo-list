import {dom} from './dom'
import {menuFunction, selectProject} from '../events';
import {renderLoginWindow} from './singup';
import {allTasks} from '../index';

function createSOutBtn() {
    const btnContent = {type: "button", classList: ["sing-out"], text: "Sing Out"};
    const btn = dom.createBtn(btnContent);
    btn.addEventListener("click", ()=> {
        dom.removeBodyContent();
        renderLoginWindow();
    })
    return btn;
}

function createGreetingsDiv(para, btn) {
    const div = dom.createDivByClass(["greeting-box"]);
    dom.appendNode(div, para, btn);
    return div;
}

export function createHeader() {
    const header = document.createElement("header");
    const h1 = dom.createH1("title", "TODO LIST");
    const menu = dom.createDivById("menu");
    const menuBtn = dom.createDivById("menu-btn");
    const singOutBtn = createSOutBtn();
    const name = localStorage.getItem("name");
    menuBtn.addEventListener("click", menuFunction);
    for(let i = 0; i < 3; i++){
        let span = dom.createSpan(["line"]);
        dom.appendNode(menuBtn, span);
    }
    const home = dom.createDivById("home");
    const allTasksIndex = 0;
    home.addEventListener("click", selectProject.bind(null, allTasksIndex));
    dom.appendNode(menu, menuBtn, home);
    dom.appendNode(header, menu, h1);
    if(name){
        const greetings = document.createElement("p");
        greetings.classList.add("greetings");
        greetings.textContent = `Hello, ${name}.`;
        const div = createGreetingsDiv(greetings, singOutBtn);
        header.appendChild(div);
    }
    return header;
}