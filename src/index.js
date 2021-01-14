import {renderLoginWindow} from './DOM/singup';
import {todo, project} from './todo';

renderLoginWindow();
let userData = localStorage.getItem("userData");
export const allTasks = new project("Default", "blue");
export let allProject = [allTasks];

export function getProjectByTodo(todo) {
    const project = allProject.filter(proj=>{
        if(proj.title !== "Default" && proj.todos.includes(todo)){
            console.log(proj);
            return proj;
        }
    })[0];
    return project;
}

function getTasksContent(project, content) {
    content.todos.forEach(t=> {
        let newTodo = new todo(t.title);
        newTodo.putContent(t);
        project.addTodo(newTodo);
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
    userData = JSON.parse(userData);
    userData.forEach(p=> {
        if(p.title == "Default"){
            getTasksContent(allTasks, p);
        }else {
            allProject.push(getProjects(p));
        }
    });
}

export function storeLocalData(){
    const localData = JSON.stringify(allProject);
    localStorage.setItem("userData", localData);
}