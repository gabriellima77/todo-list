import {dom} from './dom';
import {selectProject} from '../events';
import {Sign} from './singup';
import {SideBar} from './side-bar';

const header = function(){

    function putSpans(parent, number) {
        for(let i = 0; i < number; i++){
            let span = dom.createSpan(["line"]);
            dom.appendNode(parent, span);
        }
    }

    function createSOutBtn() {
        const auth = firebase.auth();
        const btnContent = {type: "button", classList: ["sign-out"], text: "Sign Out"};
        const btn = dom.createBtn(btnContent);
        btn.addEventListener("click", ()=> {
            localStorage.setItem("logged", false);
            auth.signOut();
            dom.removeBodyContent();
            Sign.domFunctions.renderLoginWindow();
        });
        return btn;
    }

    function createGreetingsDiv(para, btn) {
        const div = dom.createDivByClass(["greeting-box"]);
        dom.appendNode(div, para, btn);
        return div;
    }

    function createHeader(user) {
        const header = document.createElement("header");
        const h1 = dom.createH1("title", "TODO LIST");
        const menu = dom.createDivById("menu");
        const menuBtn = dom.createDivById("menu-btn");
        const signOutBtn = createSOutBtn();
        let name = localStorage.getItem("name");
        if(user) {
            name = user.displayName;
        }
        menuBtn.addEventListener("click", menuFunction);
        putSpans(menuBtn, 3);
        const home = dom.createDivById("home");
        const allTasksIndex = 0;
        home.addEventListener("click", selectProject.bind(null, allTasksIndex));
        dom.appendNode(menu, menuBtn, home);
        dom.appendNode(header, menu, h1);
        if(name){
            const greetings = document.createElement("p");
            greetings.classList.add("greetings");
            greetings.textContent = `Hello, ${name}.`;
            const div = createGreetingsDiv(greetings, signOutBtn);
            header.appendChild(div);
        }
        return header;
    }

    function menuFunction() {
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
            SideBar.removeProjects();
        }
    }

    return {createHeader};
}

const Header = header();

export {Header};