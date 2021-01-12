import {renderLoginWindow} from './DOM/singup';
import {todo, project} from './todo';

renderLoginWindow();
let userData = localStorage.getItem("userData");
export const allTasks = new project("Default", "blue");
export let allProject = [allTasks];

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

