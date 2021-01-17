import {dom} from './dom';
import {renderMainContent} from './main-content';
import {auth, allTasks, allProject} from '../index';

const sign = function () {

    function getUserData() {
        const database = firebase.database();
    }

    const domFunctions = {
        renderLoginWindow(){
            const body = document.querySelector("body");
            const imgSrc = "https://www.flaticon.com/svg/static/icons/svg/747/747376.svg";
            const img = dom.createImg("user-img", imgSrc);
            const labelsContent = [{id: "user", text: "Email"}, {id: "password", text: "Password"}];
            const inputsContent = [{classList: ["login-input"], placeHolder: "Enter Email"},
                                   {classList: ["login-input"], placeHolder: "Enter Password"}];
            const form = domFunctions.createForm(labelsContent, inputsContent);
            const div = dom.createDivById("login");
            const btnsContent = [{classList: ["btn"], type: "button", text: "SignIn", event: events.signIn}, 
                           {classList: ["btn"], type: "button", text: "SignUp", event: events.signUp}];
            const buttons = btnsContent.reduce((btns, btnContent)=> {
                let btn = dom.createBtn(btnContent)
                if(btnContent.event){
                    btn.addEventListener("click", btnContent.event);
                }
                btns.push(btn);
                return btns;
            }, []);
            const demoBtn = dom.createBtn({classList: ["btn", "demo"], type:"button", text: "Demo Account"});
            demoBtn.addEventListener("click", events.demoEvent);
            dom.appendNode(div, ...buttons);
            dom.appendNode(form, div, demoBtn);
            dom.appendNode(body, img, form);
        },

        createForm(labelsContent, inputsContent) {
            const form = document.createElement("form");
            form.onsubmit = ()=> {return false};
            form.classList.add("form-login");
            const labels = [];
            for(let i = 0; i < labelsContent.length; i++){
                let input = dom.createTextInput(inputsContent[i]);
                if(labelsContent[i].id == "password"){
                    input.type = "password";
                }
                else {
                    input.type = "email";
                }
                let label = dom.createLabel(labelsContent[i]);
                dom.appendNode(label, input);
                labels.push(label);
            }
            dom.appendNode(form, ...labels);
            return form;
        },

        putAlert(alert, label) {
            const children = Array.from(label.children);
            children.forEach(child=> {
                const hasAlert = child.classList.contains("alert");
                if(hasAlert){
                    label.removeChild(child);
                }
            });
            const div = dom.createDivByClass(["alert"]);
            const position = domFunctions.getAlertPosition(label);
            for(let key in position){
                div.style[key] = position[key] + "px";
            }
            const para = document.createElement("p");
            para.textContent = alert;
            dom.appendNode(div, para);
            dom.appendNode(label, div);
        },

        getAlertPosition(label) {
            const input = label.firstElementChild;
            const left = input.offsetLeft + input.offsetWidth + 3;
            const top = input.offsetTop + (input.offsetHeight / 2) - 45;
            const position = {left, top};
            return position;
        }
        
    }

    const events = {
        startDemo() {
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
        },

        signIn(){
            const emailInput = document.querySelector("#user");
            const email = emailInput.firstElementChild.value;
            const passwordInput = document.querySelector("#password");
            const password = passwordInput.firstElementChild.value;
            const isValidEmail = utilities.validEmail(email);
            const isValidPassword = utilities.validPassword(password)
            if(isValidEmail && isValidPassword){
                const promisse = auth.signInWithEmailAndPassword(email, password);
                promisse.catch(e=> {
                    domFunctions.putAlert(e.message, emailInput);
                });
                promisse.then(()=>{
                    const user = auth.currentUser;
                    localStorage.setItem("logged", true);
                    getUserData();
                    dom.removeBodyContent();
                    renderMainContent(user);
                });
            }
        },

        confirmBtnEvent() {
            const inputs = Array.from(document.querySelectorAll("input"));
            const user = {length: 0};
            inputs.forEach(input=> {
                if(input.placeholder.includes("Email")){
                    const isValidEmail = utilities.validEmail(input.value);
                    if(isValidEmail){
                        user.userName = input.value;
                        user.length++;
                    }
                }
                else if(input.placeholder.includes("Password")){
                    const isValidPassword = utilities.validPassword(input.value);
                    if(isValidPassword){
                        user.password = input.value;
                        user.length++;
                    }
                }
                else {
                    const isValidName = utilities.validName(input.value);
                    if(isValidName){
                        user.name = input.value;
                        user.length++;
                    }
                }
            });
            if(user.length == 3){
                const label = document.querySelector("#user");
                const auth = firebase.auth();
                const promisse = auth.createUserWithEmailAndPassword(user.userName, user.password);
                promisse.catch(e=> {
                    domFunctions.putAlert(e.message, label);
                });
                promisse.then(()=>{
                    const currentUser = auth.currentUser;
                    currentUser.updateProfile({displayName: user.name}).then(()=>{
                        console.log(currentUser);
                    });
                    localStorage.setItem("logged", true);
                    dom.removeBodyContent();
                    renderMainContent(currentUser);
                });
            }
        },

        signUp(){
            const form = document.querySelector(".form-login");
            const children = Array.from(form.children);
            children.forEach(child=> {
                form.removeChild(child);
            });
            const labelsContent = [{id: "user", text: "Email"}, {id: "password", text: "Password"},
                                   {id: "name", text: "Name"}
                                  ];
            const inputsContent = [{classList: ["login-input"], placeHolder: "Enter Email"},
                                   {classList: ["login-input"], placeHolder: "Enter Password"},
                                   {classList: ["login-input"], placeHolder: "Enter Your Name"}
                                ];
            const content = domFunctions.createForm(labelsContent, inputsContent);
            const contentTags = Array.from(content.children);
            contentTags.forEach(tag=> {
                form.appendChild(tag);
            });
            const btnContent = {type: "button", classList: ["btn", "demo"], text: "Confirm"};
            const btn = dom.createBtn(btnContent);
            btn.addEventListener("click", events.confirmBtnEvent);
            form.appendChild(btn);
        },

        startApp() {
            const input = document.querySelector(".login-input");
            const name = input.value;
            const isValidName = utilities.ValidName(name);
            if(isValidName){
                dom.removeBodyContent();
                renderMainContent();
            }
            else {
                const label = document.querySelector("#user");
                putAlert("Has at least one letter at beginning", label);
            }
        },

        demoEvent(){
            const hasName = localStorage.getItem("name");
            if(hasName){
                dom.removeBodyContent();
                renderMainContent();
            }
            else{
                startDemo();
            }
        }
    }

    const utilities = {
        validEmail(email){
            const regex = /.+@.+com/;
            if(!email.match(regex)){
                const label = document.querySelector("#user");
                domFunctions.putAlert("Is not a valid Email.", label);
                return false;
            }
            return true;
        },
        
        validPassword(password){
            if(password.length < 8){
                const label = document.querySelector("#password");
                domFunctions.putAlert("Your password is at last 7 character long.", label);
                return false;
            }
            return true;
        },
        
        validName(name) {
            if(name.length < 1){
                const label = document.querySelector("#name");
                domFunctions.putAlert("Your name has to be at last 1 character long.", label);
                return false;
            }
            return true;
        }
    }

    return {domFunctions};
}

const Sign = sign();

export {Sign};