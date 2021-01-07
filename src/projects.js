import {todo} from '.todo';

function projects() {
    const todos = [];

    const addTodo = (todoObject)=> {
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

    return {addTodo, getProject, getTodo, removeTodo};
}
