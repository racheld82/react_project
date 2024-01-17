export class Post{
    static nextId=findId()
    constructor(userId,title,body){
        this.userId=userId
        this.id=nextId++
        this.title=title
        this.body=body
    }

    
}
function findId() {
    let posts=[];
    fetch(`http://localhost:3000/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then(response => response.json())
    .catch(()=>{console.log("error")})
    .then(data=>posts=data)
    return posts.reduce((maxTodo, currentTodo) => {
        return currentTodo.id > maxTodo.id ? currentTodo : maxTodo;
    }, posts[0])
    ; 
    
}