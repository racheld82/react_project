export class Comment{
    static nextId=findId()
    constructor(postId,name,email,body){
        this.postId=postId
        this.id=nextId++
        this.name=name
        this.email=email
        this.body=body
    }

    
}
function findId() {
    let comments=[];
    fetch(`http://localhost:3000/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then(response => response.json())
    .catch(()=>{console.log("error")})
    .then(data=>comments=data)
    return comments.reduce((maxTodo, currentTodo) => {
        return currentTodo.id > maxTodo.id ? currentTodo : maxTodo;
    }, comments[0])
    ; 
    
}