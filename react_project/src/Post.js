export class Post{
    static nextId=findId()
    constructor(userId,title,body){
        this.userId=userId
        this.id=Post.nextId++;
        this.title=title
        this.body=body
    }

}
function findId() {
    fetch(`http://localhost:3000/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then(response => response.json())
    .catch(()=>{console.log("error")})
    .then(data=>console.log(data))
    .then(data=>{return data.reduce((maxPost, currentPost) => {
        return currentPost.id > maxPost.id ? currentPost : maxPost;
    }, data[0])})
 
}