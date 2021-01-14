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
        this.color = color;
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
        this.color = content.color;
        this.checked = content.checked;
    }
}

class project {
    constructor(title, color) {
        this.title = title;
        this.color = color;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(todoObject){
        const todoIndex = this.todos.indexOf(todoObject);
        return this.todos.splice(todoIndex, 1);
    }

    getTodo(index) {
        return this.todos[index];
    }

    get getProject(){
        return this.todos;
    }
    get getProjectTitle(){
        return this.title;
    } 

    get getProjectColor(){
        this.color;
    } 
}

export {todo, project};