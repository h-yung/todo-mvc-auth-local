const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const submitEdit = document.querySelectorAll('.confirm')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})
Array.from(submitEdit).forEach((el)=>{
    el.addEventListener('click', updateTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})
async function updateTodo(){
    const todoId = this.parentNode.dataset.id
    const title = document.querySelector('.title').value
    const content = document.querySelector('.content').value
    console.log(title);
    console.log(content);
    console.log(todoId);
    try{
        const response = await fetch(`/edit/updateTodo`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'title': title,
                'todo': content,
                'todoIdFromJSFile': todoId
              })
        })
        const data = await response.json()
        console.log(data);
        console.log('you successfully edit')
        // location.reload()
    }catch(err){
        console.log(err)
    }}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    if (window.location.href.includes('edit') ){

    try{
        const response = await fetch(`/todos/deleteTodo`, {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }}
    else{
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }}
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}