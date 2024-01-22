export class Photo{
    static lastId=findId()
    constructor(albumId,title,url,thumbnailUrl){
        this.albumId=albumId
        this.id=
        this.title=title
        this.url=url
        this.thumbnailUrl=thumbnailUrl
    }
}

function findId() {
    let posts=[];
    fetch(`http://localhost:3000/photos`, {
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