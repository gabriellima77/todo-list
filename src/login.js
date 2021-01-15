import {createForm, putAlert} from './DOM/singup';
import {dom} from './DOM/dom';
import {renderMainContent} from './DOM/main-content';

(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyAWA950UMSKFseXouL0BkkUev4AhzyTwsg",
        authDomain: "todo-list-2854d.firebaseapp.com",
        projectId: "todo-list-2854d",
        storageBucket: "todo-list-2854d.appspot.com",
        messagingSenderId: "951297494110",
        appId: "1:951297494110:web:dd4551a86ed965827738cf"
      };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
})()

export const dataBase = firebase.database();
export const auth = firebase.auth();

function getData(){
    
}

export function signIn(){
    const emailInput = document.querySelector("#user");
    const email = emailInput.firstElementChild.value;
    const passwordInput = document.querySelector("#password");
    const password = passwordInput.firstElementChild.value;
    if(validEmail(email) && validPassword(password)){
        const promisse = auth.signInWithEmailAndPassword(email, password);
        promisse.catch(e=> {
            putAlert(e.message, emailInput);
        });
        promisse.then(()=>{
            const user = auth.currentUser;
            localStorage.setItem("logged", true);
            dom.removeBodyContent();
            renderMainContent(user);
        });
    }

}

function validEmail(email){
    const regex = /.+@.+com/;
    if(!email.match(regex)){
        const label = document.querySelector("#user");
        putAlert("Is not a valid Email.", label);
        return false;
    }
    return true;
}

function validPassword(password){
    if(password.length < 8){
        const label = document.querySelector("#password");
        putAlert("Your password is at last 7 character long.", label);
        return false;
    }
    return true;
}

function validName(name) {
    if(name.length < 1){
        const label = document.querySelector("#name");
        putAlert("Your name has to be at last 1 character long.", label);
        return false;
    }
    return true;
}

function confirmBtnEvent() {
    const inputs = Array.from(document.querySelectorAll("input"));
    const user = {length: 0}
    inputs.forEach(input=> {
        if(input.placeholder.includes("Email")){
            const isValidEmail = validEmail(input.value);
            if(isValidEmail){
                user.userName = input.value;
                user.length++;
            }
        }
        else if(input.placeholder.includes("Password")){
            const isValidPassword = validPassword(input.value);
            if(isValidPassword){
                user.password = input.value;
                user.length++;
            }
        }
        else {
            const isValidName = validName(input.value);
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
            putAlert(e.message, label);
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
}

export function signUp(){
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
    const content = createForm(labelsContent, inputsContent);
    const contentTags = Array.from(content.children);
    contentTags.forEach(tag=> {
        form.appendChild(tag);
    });
    const btnContent = {type: "button", classList: ["btn", "demo"], text: "Confirm"};
    const btn = dom.createBtn(btnContent);
    btn.addEventListener("click", confirmBtnEvent)
    form.appendChild(btn);
}