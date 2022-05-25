export default async function getRandomItem(id){
        let n = Math.round(Math.random() * 100)
        let url = `http://jsonplaceholder.typicode.com/posts/${n}`
        let r = await fetch(url)
        r = await r.json()
        let item = {id: 'todo-' + id, label: r[`title`], done: false}
        return item
      }
