import {dom} from './dom';
import {startApp} from '../events';

function renderLoginWindow(){
    const body = document.querySelector("body");
    const imgSrc = "https://www.flaticon.com/svg/static/icons/svg/747/747376.svg";
    const img = dom.createImg("user-img", imgSrc);
    const labelsContent = [{id: "user", text: "Username"}, {id: "password", text: "Password"}];
    const inputsContent = [{classList: ["login-input"], placeHolder: "Enter Username"},
                           {classList: ["login-input"], placeHolder: "Enter Password"}];
    const form = createForm(labelsContent, inputsContent);
    const div = dom.createDiv("login");
    const btnsContent = [{classList: ["btn"], type: "button", text: "Singin"}, 
                   {classList: ["btn"], type: "button", text: "Singup"}];
    const buttons = btnsContent.reduce((btns, btnContent)=> {
        btns.push(dom.createBtn(btnContent));
        return btns;
    }, []);
    const demoBtn = dom.createBtn({classList: ["btn", "demo"], type:"button", text: "Demo Account"});
    dom.appendNode(div, ...buttons);
    dom.appendNode(form, div, demoBtn);
    dom.appendNode(body, img, form);
}

function createForm(labelsContent, inputsContent) {
    const form = document.createElement("form");
    form.onsubmit = ()=> {return false};
    form.classList.add("form-login");
    const labels = [];
    for(let i = 0; i < labelsContent.length; i++){
        let input = dom.createTextInput(inputsContent[i]);
        let label = dom.createLabel(labelsContent[i]);
        dom.appendNode(label, input);
        labels.push(label);
    }
    dom.appendNode(form, ...labels);
    return form;
}

function startDemo() {
    const form = document.querySelector(".form-login");
    const children = Array.from(form.children);
    children.forEach(child=> form.removeChild(child));
    const inputsContent = {classList: ["login-input"], placeHolder: "Enter Your Name"};
    const input = dom.createTextInput(inputsContent);
    const label = dom.createLabel({id: "user", text: "Name:"});
    const btn = dom.createBtn({classList: ["btn", "demo", "confirm"], type:"button", text: "Confirm"});
    btn.addEventListener("click", startApp);
    dom.appendNode(label, input, btn);
    dom.appendNode(form, label);
}

export {renderLoginWindow, startDemo};