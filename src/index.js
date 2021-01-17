import {Sign} from './DOM/singup';
import {todo, project} from './todo';

Sign.domFunctions.renderLoginWindow();
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
let userData = localStorage.getItem("userData");
export let allTasks = new project("Default", "blue");
export let allProject = [allTasks];

export function getProjectByTodo(todo) {
    const project = allProject.filter(proj=>{
        if(proj.title !== "Default" && proj.todos.includes(todo)){
            return proj;
        }
    })[0];
    return project;
}

function getTasksContent(project, content) {
    content.todos.forEach(t=> {
        let newTodo = new todo(t.title);
        newTodo.putContent(t);
        allTasks.addTodo(newTodo);
        project.addTodo(newTodo);
    });
}

function getDefaultContent(project){
    project.todos.forEach(t=>{
        if(t.isDefault){
            let newTodo = new todo(t.title);
            newTodo.isDefault = true;
            newTodo.putContent(t);
            allTasks.addTodo(newTodo)
        }
    });
}

function getProjects(content) {
    const title = content.title;
    const color = content.color;
    const newProject = new project(title, color);
    getTasksContent(newProject, content);
    return newProject;
}

if(userData){
    let def;
    userData = JSON.parse(userData);
    userData.forEach(p=> {
        if(p.title == "Default"){
            def = p;
            getDefaultContent(def);
        }
        else{
            allProject.push(getProjects(p));
        }
    });
}

export function storeLocalData(){
    const localData = JSON.stringify(allProject);
    localStorage.setItem("userData", localData);
}