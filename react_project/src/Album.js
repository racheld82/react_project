export class Album{
    static lastId = findId()
    constructor(userId,title){
        this.id=++Album.lastId
        this.userId=userId
        this.title=title
        

    }
}

async function findId() {
    let albums=[];
    fetch(`http://localhost:3000/albums`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then(response => response.json())
    .then(data=>albums=data)
    .catch(()=>{console.log("error")})
    return Math.max(...albums.map(album => album.id))
    ; 
    
}