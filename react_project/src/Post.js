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
    let posts=[];
    fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then(response => response.json())
    .catch(()=>{console.log("error")})
    .then(data=>posts=data)
    return posts.reduce((maxPost, currentPost) => {
        return currentPost.id > maxPost.id ? currentPost : maxPost;
    }, posts[0])
    ; 
    
}