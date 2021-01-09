import {dom} from './dom'
import {menuFunction} from '../events';

export function createHeader() {
    const header = document.createElement("header");
    const h1 = dom.createH1("title", "TODO LIST");
    const menu = dom.createDiv("menu");
    const menuBtn = dom.createDiv("menu-btn");
    menuBtn.addEventListener("click", menuFunction);
    for(let i = 0; i < 3; i++){
        let span = dom.createSpan(["line"]);
        dom.appendNode(menuBtn, span);
    }
    const home = dom.createDiv("home");
    dom.appendNode(menu, menuBtn, home);
    dom.appendNode(header, menu, h1);
    return header;
}