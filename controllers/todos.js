const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})

            const userWeWant = await User.findById(req.user.id); 
            const actualDate = userWeWant['lastActiveDate']
            
            res.render('todos.ejs', 
                {
                    todos: todoItems, 
                    left: itemsLeft, 
                    user: req.user,
                    lastActiveDate: actualDate
                })
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            let newTodo = await Todo.create({
                todo: req.body.todoItem,
                title: req.body.title,
                completed: false, userId: req.user.id});
            console.log(`A new todo has been added on ${newTodo}`)
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            let docBeforeUpdate = await Todo.findById(req.body.todoIdFromJSFile)

            let docRecordUpdated = await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false,
                timestamps: false //don't want updatedAt changed when marking incomplete
            })
            console.log(docBeforeUpdate.updatedAt)
            console.log(docRecordUpdated.updatedAt) 
            //however, strict equal returns 'false' even though shallow copy?

            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
            // res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    getEdit: async (req,res)=>{
        
        const id = req.params.id
        try{
            const todoItems = await Todo.find({userId:req.user.id})  
            res.render('edit.ejs', 
                {
                    todos: todoItems, 
                    idOfTodo : id,
                    newToDo: req.newTodo,
                })
        }catch(err){
            console.log(err)
        }
    },
    updateTodo: async (req,res)=>{
        const id = req.params.id
        try{
            await Todo.findOneAndUpdate(
                {
                    // _id:req.body.todoIdFromJSFile,
                title: req.body.title,
                todo: req.body.todo},
                err => {if (err) return res.status(500).send(err)}
            )
            console.log('updated Todo')
            res.json('updated It')
            // res.redirect('/edit')
        }catch(err){
            console.log(err)
        }
    }
}    