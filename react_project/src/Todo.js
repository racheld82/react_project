export class Todo{
    
    static nextid=findId()
    constructor(userId, title,completed=false){
        this.id=Todo.nextid++
        this.userId=userId
        this.title=title
        this.completed=completed
    }

}

async function findId() {
    let todos=[];
    fetch(`http://localhost:3000/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then(response => response.json())
    .catch(()=>{console.log("error")})
    .then(data=>todos=data)
    return todos.reduce((maxTodo, currentTodo) => {
        return currentTodo.id > maxTodo.id ? currentTodo : maxTodo;
    }, todos[0])
    ; 
    
}