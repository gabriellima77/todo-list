class todo {
    constructor(title){
        this.title = title;
        this.checked = false;
        this.notes = "";
    }

    set setDescription(description) {
        this.description = description;
    }

    set setPriority({priority, color}){
        this.priority = priority;
        this.colorLabel = color;
    }

    set setNotes(notes){
        this.notes = notes;
    }

    set setChecked(checked) {
        this.checked = checked;
    }

    set setDueData(date){
        this.dueDate = date;
    }

    get getDescription() {
        return this.description;
    }

    get getDueDate(){
        return this.dueDate;
    }

    get getNotes(){
        return this.notes;
    }

    putContent(content) {
        this.dueDate = content.date;
        this.setNotes = content.notes;
        this.setPriority = content.priority;
        this.setDescription = content.description;
    }
}

function project(title) {
    const projectTitle = title;
    const todos = [];

    const addTodo = (todoContent)=> {
        const title = todoContent.title;
        const newTodo = new todo(title);
        newTodo.putContent(todoContent);
        todos.push(todoObject);
    }

    const removeTodo = (todoObject)=> {
        const todoIndex = todos.indexOf(todoObject);
        return todos.splice(todoIndex, 1);
    }

    const getTodo = (index)=> {
        return todos[index];
    }

    const getProject = ()=> todos;

    const getProjectTitle = ()=> projectTitle;

    return {addTodo, getProject, getTodo, removeTodo, getProjectTitle};
}

const allProjects = ()=> {
    const title = "default";
    const all = [];

    function addProject(project) {
        all.push(project);
    }

    function removeProject(project) {
        const projectIndex = all.indexOf(project);
        return all.splice(projectIndex, 1);
    }

    function getAllProjects() {
        return all;
    }

    return {addProject, removeProject, getAllProjects};
}

export {todo, project, allProjects};