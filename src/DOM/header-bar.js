import {dom} from './dom'
import {menuFunction} from '../events';
import {renderLoginWindow} from './singup';

function createSOutBtn() {
    const btnContent = {type: "button", classList: ["sing-out"], text: "Sing Out"};
    const btn = dom.createBtn(btnContent);
    btn.addEventListener("click", ()=> {
        dom.removeBodyContent();
        renderLoginWindow();
    })
    return btn;
}

export function createHeader() {
    const header = document.createElement("header");
    const h1 = dom.createH1("title", "TODO LIST");
    const menu = dom.createDivById("menu");
    const menuBtn = dom.createDivById("menu-btn");
    const singOutBtn = createSOutBtn();
    menuBtn.addEventListener("click", menuFunction);
    for(let i = 0; i < 3; i++){
        let span = dom.createSpan(["line"]);
        dom.appendNode(menuBtn, span);
    }
    const home = dom.createDivById("home");
    dom.appendNode(menu, menuBtn, home);
    dom.appendNode(header, menu, h1,singOutBtn);
    return header;
}