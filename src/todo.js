export class todo {
    constructor(title){
        this.title = title;
        this.dueDate = "date";
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