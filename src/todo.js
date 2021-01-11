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
        this.dueDate = content.dueDate;
        this.notes = content.notes;
        this.priority = content.priority;
        this.description = content.description;
        this.colorLabel = content.color;
    }
}

class project {
    constructor(title, color) {
        this.projectTitle = title;
        this.projectColor = color;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(todoObject){
        const todoIndex = todos.indexOf(todoObject);
        return this.todos.splice(todoIndex, 1);
    }

    getTodo(index) {
        return todos[index];
    }

    get getProject(){
        return this.todos;
    }
    get getProjectTitle(){
        return this.projectTitle;
    } 

    get getProjectColor(){
        this.projectColor;
    } 
}

export {todo, project};